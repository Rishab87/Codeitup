import { redisClient, redisQueueClient } from "../config/redis";
import Docker from 'dockerode';

interface Result {
    time: number | null;
    memory: number;
    output: string;
}

export async function worker(){
    try{

        //add check to kill the exec if time limit exceeds get minTime variable of question here
        while(1){
            const submission = await redisQueueClient.brPop("submissions" , 0);
            console.log(submission);

            const userSubmission = JSON.parse(submission!.element);
            // Process the submission , run the code get results
            //test cases will contain many objects with input and output key
            //{input: , output:}
            //in user's code add function calling it with test case input

            let result:Result = {time: 0 , memory: 0 , output: ""};
            let status = "ACCEPTED";
            let time = 0;
            let memory = 0;
            
            console.log("running test cases");
            try{
            for (let testCase of userSubmission.testCases) {
                const { input, output: expectedOutput } = testCase;

                result = await runCode(userSubmission.code, userSubmission.language, input);
                time += result.time!;
                memory += result.memory;
                if(result.time === null){
                    
                    status = "RUNTIME ERROR";
                    break;
                }

                if (result.output.trim() !== expectedOutput.trim()) {
                    status = "WRONG ANSWER";
                    break;
                }
            }
            } catch(error){
                status = "RUNTIME ERROR";
                result = { time: null, memory: 0, output: (error as Error).message };
                break;
            }
            const resultObj = {
                status,
                userId: userSubmission.userId,
                questionId: userSubmission.questionId,
                result: result.output,
                time,
                memory,
            }
            console.log(resultObj);
            
            console.log("SENDING RESULT");
            //send the result to the user
            await redisClient.publish("submissions" , JSON.stringify(resultObj));
        }


    } catch(error){
        console.log(error);
    }
}

const runCode = async(code: string , language:string , input:string):Promise<Result>=>{

    const config = getConfig(language, code , input);
    if (!config) {
        throw new Error('Unsupported language');
    }

    const { image, fileName, compileCmd, runCmd } = config;
    
    const docker = new Docker();
    
    const container = await docker.createContainer({
        Image: image,
        Tty: false,
        AttachStdout: true,
        AttachStdin: true,
        WorkingDir: '/usr/src/app',
        Cmd: ['/bin/sh', '-c', language === "cpp" 
            ? `echo "${input}" | ${compileCmd} && echo "${input}" | ${runCmd}` 
            : `echo "${input}" | ${runCmd}`],
        AttachStderr: true,
        HostConfig: {
            Binds: [`${process.cwd()}/temp:/usr/src/app`],
            Memory: 256 * 1024 * 1024, // 256 MB
            CpuShares: 256, // Relative CPU weight
            // AutoRemove: true // Automatically remove the container when it exits
        }
    });
    console.log(container.id);
    console.log("EXECUTING CODE");
  
    await container.start();
    console.log("Container started:", container.id);
    
  
 
    console.log("STARTING EXEC");

    const stream = await container.attach({
        stderr: true,
        stdout: true,
        stream: true,
      });   

    console.log("STREAM STARTED");


    return await  new Promise((resolve, reject) => {
        let output = '';
        let errorOutput = '';
        stream.on('data', (chunk:any) => {
    
            output += chunk.toString();
        });
        stream.on('end', async() => {

            const stats = await docker.getContainer(container.id).stats({ stream: false });
            const memoryUsage = stats.memory_stats ? stats.memory_stats.usage / (1024 * 1024) : 0;
            let timeOutput = parseTimeOutput(errorOutput);
            console.log(memoryUsage  , timeOutput , output);
            if(timeOutput === null){
                timeOutput = 0;
            }    
            const response = output && output.slice(8).toString()
            resolve({ output: response, time: timeOutput, memory: memoryUsage });
            console.log("CODE EXECUTED");
            await container.remove();
            // resolve(output);
        });
        stream.on('stderr', async(chunk: any) => {
            errorOutput += chunk.toString();
            console.log(errorOutput);
            
            resolve({ time: null, memory: 0, output: errorOutput });
            console.log("CODE  STD ERR EXECUTED");
        });
        stream.on('error', async(err:Error) => {
            console.log("CODE EXECUTED ERROR");
            reject(err);
        });
    })
    //remove container if it failed otherwise use the same container if possible and if its a good practice

}


const parseTimeOutput = (output:string) => {
    const realTimeRegex = /real\s+(\d+\.\d+)/;
    const realTimeMatch = output.match(realTimeRegex);
    const realTime = realTimeMatch ? parseFloat(realTimeMatch[1]) : null;
    return realTime ? Math.round(realTime) : null;
};


const getConfig = (language:string, code:string , input:string) => {
    switch (language) {
        case 'python':
            return {
                image: 'python:3.9',
                fileName: 'script.py',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > script.py`,
                runCmd: `echo "${input.replace(/"/g, '\\"')}" | python script.py`
            };
        case 'javascript':
            return {
                image: 'node:14',
                fileName: 'script.js',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > script.js`,
                runCmd: `echo "${input.replace(/"/g, '\\"')}" | node script.js`
            };
        case 'cpp':
            return {
                image: 'gcc:latest',
                fileName: 'main.cpp',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > main.cpp && g++ main.cpp -o main`,
                runCmd: `echo "${input.replace(/"/g, '\\"')}" | ./main`
            };
        default:
            return null;
    }
};

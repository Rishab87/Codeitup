import { redisClient, redisQueueClient } from "../config/redis";
import Docker from 'dockerode';

interface Result {
    time: number | null;
    memory: number;
    output: string;
}

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

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

// const createContainer = async(image:string , compileCmd:string , runCmd:string , input:string):Promise<any>=>{
//     try{

//         const container = await docker.createContainer({
//             Image: image,
//             Tty: false,
//             AttachStdout: true,
//             AttachStdin: true,
//             WorkingDir: '/usr/src/app',
//             Cmd: ['/bin/sh', '-c', `echo "${input}" | ${compileCmd} && echo "${input}" | ${runCmd}`] ,
//             AttachStderr: true,
//             HostConfig: {
//                 Binds: [`${process.cwd()}/temp:/usr/src/app`],
//                 Memory: 256 * 1024 * 1024, // 256 MB
//                 CpuShares: 256, // Relative CPU weight
//                 // AutoRemove: true // Automatically remove the container when it exits
//             }
//         });

//         return container;

//     } catch(error){
//         console.log(error);
        
//     }
// }

//cpp container
//jscona
//python


const runCode = async(code: string , language:string , input:string):Promise<Result>=>{

    const config = getConfig(language, code , input);
    if (!config) {
        throw new Error('Unsupported language');
    }

    const { image, fileName, compileCmd, runCmd } = config;

    console.log("Starting container");
    
        
    const container = await docker.createContainer({
        Image: image,
        Tty: false,
        AttachStdout: true,
        AttachStdin: true,
        WorkingDir: '/usr/src/app',
        Cmd: ['/bin/sh', '-c', `echo "${input}" | ${compileCmd} && echo "${input}" | ${runCmd}`] ,
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

            // const exitCode = await container.inspect().then(data => data.State.ExitCode);

            // Check if the container exited with a non-zero exit code
            const response = output && output.slice(8).toString()

//             if (exitCode !== 0) {
//                 // Container exited with an error
//                 console.log('Container exited with error:', exitCode);
                
//                 // Check the output content for error messages
//                 if (output.includes('error')) {
//                     // Compile-time error detected
//                     console.log('Compile-time error:', output);
//                     resolve({ output: response, time: null, memory: 0 });
                
//                 } else if(errorOutput.includes('error')) {
//                     // Runtime error detected
//                     console.log('Runtime error:', output);
//                     resolve({ output: response, time: null, memory: 0 });
// //add runtime error in status and make an errorOutput inside result if it exists add that to status in backend
//                 }
//             }
        

            const stats = await docker.getContainer(container.id).stats({ stream: false });
            const memoryUsage = stats.memory_stats ? ((stats.memory_stats.usage) / (1024 * 1024)) : 0;
            let timeOutput = parseTimeOutput(errorOutput);
            console.log(memoryUsage  , timeOutput , output);
            if(timeOutput === null){
                timeOutput = 0;
            }    
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
            await container.remove();
        });
        stream.on('error', async(err:Error) => {
            console.log("CODE EXECUTED ERROR");
            reject(err);
            await container.remove();
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

//in DB divide config three parts for every language headers , function execution  , show just function part add headers function and excecution and send 

const getConfig = (language:string, code:string , input:string) => {
    switch (language) {
        case 'python':
            return {
                image: 'python:3.9',
                fileName: 'script.py',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > /usr/src/app/script.py`,
                runCmd: `echo "${input.replace(/"/g, '\\"')}" | python /usr/src/app/script.py`

            };
        case 'javascript':
            return {
                image: 'node:14',
                fileName: 'script.js',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > /usr/src/app/script.js`,
                runCmd: `echo "${input.replace(/"/g, '\\"')}" | node /usr/src/app/script.js`
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

import { redisClient } from "../config/redis";
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
            const submission = await redisClient.brPop("submissions" , 0);
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
            
            
            for (let testCase of userSubmission.testCases) {
                const { input, output: expectedOutput } = testCase;

                result = await runCode(userSubmission.code, userSubmission.language, input);
                time += result.time!;
                memory += result.memory;

                if (result.output.trim() !== expectedOutput.trim()) {
                    status = "WRONG ANSWER";
                    break;
                }
            }

            const resultObj = {
                status,
                userId: userSubmission.userId,
                questionId: userSubmission.questionId,
                result: result.output,
                time,
                memory,
            }

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
        AttachStderr: true,
        HostConfig: {
            Binds: [`${process.cwd()}/temp:/usr/src/app`],
            Memory: 256 * 1024 * 1024, // 256 MB
            CpuShares: 256, // Relative CPU weight
            AutoRemove: true // Automatically remove the container when it exits
        }
    });

    const runExec = await container.exec({
        AttachStdout: true,
        AttachStderr: true,
        Cmd: language === "cpp"?['/bin/sh', '-c', `time -v ${compileCmd} && time -v ${runCmd}`]:['/bin/sh', '-c', `time -v ${runCmd}`] ,
        WorkingDir: '/usr/src/app'
    });
    const stream = await runExec.start({});

    return new Promise((resolve, reject) => {
        let output = '';
        let errorOutput = '';
        stream.on('data', (chunk:any) => {
            output += chunk.toString();
        });
        stream.on('end', async() => {

            const stats = await docker.getContainer(container.id).stats({ stream: false });
            const memoryUsage = stats.memory_stats.usage / (1024 * 1024); // Convert to MB
            const timeOutput = parseTimeOutput(errorOutput);
            resolve({ output, time: timeOutput, memory: memoryUsage });
            // resolve(output);
        });
        stream.on('stderr', (chunk: any) => {
            errorOutput += chunk.toString();
        });
        stream.on('error', (err:Error) => {
            reject(err);
        });
    });
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

import { redisClient } from "../config/redis";
import Docker from 'dockerode';

export async function worker(){
    try{

        while(1){
            const submission = await redisClient.brPop("submissions" , 0);
            console.log(submission);

            const userSubmission = JSON.parse(submission!.element);
            // Process the submission , run the code get results
            //test cases will contain many objects with input and output key
            //{input: , output:}
            //in user's code add function calling it with test case input

            let result;
            let status = "ACCEPTED";
            for(const testCase of userSubmission.testCases){
                result = await runCode(userSubmission.code , userSubmission.language , testCase.input);
                if(result !== testCase.output){
                    status = "WRONG_ANSWER";
                    break;
                } else if(typeof result !== "string"){
                    status = "RUNTIME_ERROR";
                    break;
                }
            }

            const resultObj = {
                status,
                userId: userSubmission.userId,
                questionId: userSubmission.questionId,
                result,
            }

            //send the result to the user
            await redisClient.publish("submissions" , JSON.stringify(resultObj));
        }


    } catch(error){
        console.log(error);
    }
}

const runCode = async(code: string , language:string , testCase: string)=>{

    const config = getConfig(language, code);
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
        Cmd: language === "C++"?['/bin/sh', '-c', `${compileCmd} && ${runCmd}`]:['/bin/sh', '-c', runCmd] ,
        WorkingDir: '/usr/src/app'
    });
    const stream = await runExec.start({});

    return new Promise((resolve, reject) => {
        let output = '';
        stream.on('data', (chunk:any) => {
            output += chunk.toString();
        });
        stream.on('end', () => {
            resolve(output);
        });
        stream.on('error', (err:Error) => {
            reject(err);
        });
    });
}

const getConfig = (language:string, code:string) => {
    switch (language) {
        case 'python':
            return {
                image: 'python:3.9',
                fileName: 'script.py',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > script.py`,
                runCmd: 'python script.py'
            };
        case 'javascript':
            return {
                image: 'node:14',
                fileName: 'script.js',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > script.js`,
                runCmd: 'node script.js'
            };
        case 'cpp':
            return {
                image: 'gcc:latest',
                fileName: 'main.cpp',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > main.cpp && g++ main.cpp -o main`,
                runCmd: './main'
            };
        default:
            return null;
    }
};

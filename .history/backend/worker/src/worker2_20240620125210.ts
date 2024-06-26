import { redisClient, redisQueueClient } from "../config/redis";
import { exec, execSync } from 'child_process';
import { spawn } from "child_process";
Promise
import fs from 'fs';
import path from 'path';

interface Result {
    time: number | null;
    memory: number;
    output: string;
}

export async function worker2() {
    try {
        while (true) {
            const submission = await redisQueueClient.brPop("submissions", 0);
            console.log(submission);

            const userSubmission = JSON.parse(submission!.element);

            let result: Result = { time: 0, memory: 0, output: "" };
            let status = "ACCEPTED";
            let time = 0;
            let memory = 0;
            let lastExInput;

            console.log("running test cases");
            try {
                for (let testCase of userSubmission.testCases) {
                    const { input, output: expectedOutput } = testCase;

                    result = await runCode(userSubmission.code, userSubmission.language, input);
                    time = Math.max(time, result.time!);
                    memory = Math.max(memory, result.memory);
                    if (result.output.includes('error') || result.output.includes('Error')) {
                        if (isCompileError(result.output, userSubmission.language) && userSubmission.language === 'cpp') {
                            lastExInput = input;
                            status = 'COMPILE TIME ERROR';
                            break;
                        } else {
                            lastExInput = input;
                            status = 'RUNTIME ERROR';
                            break;
                        }
                    } else if (result.output.trim() !== expectedOutput.trim()) {
                        status = "WRONG ANSWER";
                        lastExInput = input;
                        break;
                    }
                }
            } catch (error) {
                status = "RUNTIME ERROR";
                result = { time: null, memory: 0, output: (error as Error).message };
                break;
            }

            const resultObj = {
                status,
                userId: userSubmission.userId,
                questionId: userSubmission.questionId,
                result: { output: result.output, input: lastExInput },
                time,
                memory,
                difficulty: userSubmission.difficulty,
                userCode: userSubmission.userCode
            };
            console.log(resultObj);

            console.log("SENDING RESULT");
            // Send the result to the user
            await redisClient.publish("submissions", JSON.stringify(resultObj));
        }
    } catch (error) {
        console.log(error);
    }
}

const isCompileError = (errorOutput: string, language: string) => {
    const patterns: { [key: string]: RegExp } = {
        cpp: /error:|undefined reference to/
    };
    return patterns[language].test(errorOutput);
};

const runCode= async (code:string, language:string, input:string):Prosmise<Result>  => {
    const config = getConfig(language, code);
    if (!config) {
        throw new Error('Unsupported language');
    }

    const { fileName, compileCmd, runCmd, interpreter } = config;
    const start = Date.now();

    // Write the user code to a temporary file
    const codeFilePath = path.join(__dirname, fileName);
    fs.writeFileSync(codeFilePath, code);

    return new Promise((resolve, reject) => {
        const child = spawn(interpreter, [runCmd], { stdio: ['pipe', 'pipe', 'pipe'] });

        let stdout = '';
        let stderr = '';

        child.stdout.on('data', (data:any) => {
            stdout += data.toString();
        });

        child.stderr.on('data', (data:any) => {
            stderr += data.toString();
        });

        child.on('close', (code:any) => {
            const executionTime = Date.now() - start;
            if (code !== 0) {
                resolve({ time: executionTime / 1000, memory: 0, output: stderr });
            } else {
                resolve({ time: executionTime / 1000, memory: 0, output: stdout });
            }
        });

        // Send input to the child process
        child.stdin.write(input);
        child.stdin.end();
    });
};

const getConfig = (language:string, code:string) => {
    switch (language) {
        case 'python':
            return {
                fileName: 'script.py',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > script.py`,
                runCmd: 'script.py',
                interpreter: 'python'
            };
        case 'javascript':
            return {
                fileName: 'script.js',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > script.js`,
                runCmd: 'script.js',
                interpreter: 'node'
            };
        case 'cpp':
            return {
                fileName: 'main.cpp',
                compileCmd: `echo "${code.replace(/"/g, '\\"')}" > main.cpp && g++ main.cpp -o main`,
                runCmd: './main',
                interpreter: './main'
            };
        default:
            return null;
    }
};
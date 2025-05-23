import { redisClient, redisQueueClient } from "../config/redis";
import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface Result {
    time: number | null;
    memory: number;
    output: string;
}

export async function worker() {
    try {
        while (true) {
            const submission = await redisQueueClient.brPop("submissions", 0);

            const userSubmission = JSON.parse(submission!.element);

            let result: Result = { time: 0, memory: 0, output: "" };
            let status = "ACCEPTED";
            let time = 0;
            let memory = 0;
            let lastExInput;

            try {
                for (let testCase of userSubmission.testCases) {
                    const { input, output: expectedOutput } = testCase;

                    result = await runCode(userSubmission.code, userSubmission.language, input).catch((error) => {
                        return error;
                    });
                    // console.log(result);
                    time = Math.max(time, result.time!);
                    memory = Math.max(memory, result.memory);
                    if (result.output.includes('error') || result.output.includes('Error')) {
                        if (userSubmission.language === 'cpp' && isCompileError(result.output, userSubmission.language)) {
                            lastExInput = input;
                            status = 'COMPILE TIME ERROR';
                            break;
                        } else {
                            lastExInput = input;
                            status = 'RUNTIME ERROR';
                            console.log("RUNTIME ERROR");
                            
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
                result = { time: 0, memory: 0, output: (error as Error).message };
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

const runCode = async (code: string, language: string, input: string): Promise<Result> => {
    const config = getConfig(language, code, input);
    if (!config) {
        throw new Error('Unsupported language');
    }

    const { fileName, compileCmd, runCmd } = config;

    const execDir = path.join(__dirname, 'exec');
    if (!fs.existsSync(execDir)) {
        fs.mkdirSync(execDir, { recursive: true });
    }
    
    const command = `${compileCmd} && ${runCmd}`;

    const start = Date.now();
    const memory = process.memoryUsage();
    return await new Promise((resolve, reject) => {
        exec(command, { cwd: execDir}, (error, stdout, stderr) => {
            const executionTime = Date.now() - start;
            const memoryUsed = process.memoryUsage().heapUsed - memory.heapUsed;
            if (error) {
                reject({ time: executionTime / 1000, memory: memoryUsed/(1024*1024), output: stderr });
            } else {                
                resolve({ time: executionTime / 1000, memory: memoryUsed/(1024*1024), output: stdout });
            }
        });
        }
    );
};

const getConfig = (language: string, code: string, input: string) => {

    const codeEscaped = code.replace(/"/g, '\\"');
    const inputEscaped = input.replace(/"/g, '\\"');

 switch (language) {
        case 'python':
            return {
                fileName: 'script.py',
                compileCmd: `echo "${codeEscaped}" > script.py`,
                runCmd: `echo "${inputEscaped}" | python3 script.py`
            };
        case 'javascript':
            return {
                fileName: 'script.js',
                compileCmd: `echo "${codeEscaped}" > script.js`,
                runCmd: `echo "${inputEscaped}" | node script.js`
            };
        case 'cpp':
            return {
                fileName: 'main.cpp',
                compileCmd: `echo "${codeEscaped}" > main.cpp && g++ main.cpp -o main`,
                runCmd: `echo "${inputEscaped}" | ./main`
            };
        default:
            return null;
    }
};
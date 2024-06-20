"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.worker = void 0;
var redis_1 = require("../config/redis");
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
function worker() {
    return __awaiter(this, void 0, void 0, function () {
        var submission, userSubmission, result, status_1, time, memory, lastExInput, _i, _a, testCase, input, expectedOutput, error_1, resultObj, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 11];
                    return [4 /*yield*/, redis_1.redisQueueClient.brPop("submissions", 0)];
                case 2:
                    submission = _b.sent();
                    console.log(submission);
                    userSubmission = JSON.parse(submission.element);
                    result = { time: 0, memory: 0, output: "" };
                    status_1 = "ACCEPTED";
                    time = 0;
                    memory = 0;
                    lastExInput = void 0;
                    console.log("running test cases");
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 8, , 9]);
                    _i = 0, _a = userSubmission.testCases;
                    _b.label = 4;
                case 4:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    testCase = _a[_i];
                    input = testCase.input, expectedOutput = testCase.output;
                    return [4 /*yield*/, runCode(userSubmission.code, userSubmission.language, input).catch(function (error) {
                            return error;
                        })];
                case 5:
                    result = _b.sent();
                    // console.log(result);
                    time = Math.max(time, result.time);
                    memory = Math.max(memory, result.memory);
                    if (result.output.includes('error') || result.output.includes('Error')) {
                        if (userSubmission.language === 'cpp' && isCompileError(result.output, userSubmission.language)) {
                            lastExInput = input;
                            status_1 = 'COMPILE TIME ERROR';
                            return [3 /*break*/, 7];
                        }
                        else {
                            lastExInput = input;
                            status_1 = 'RUNTIME ERROR';
                            console.log("RUNTIME ERROR");
                            return [3 /*break*/, 7];
                        }
                    }
                    else if (result.output.trim() !== expectedOutput.trim()) {
                        status_1 = "WRONG ANSWER";
                        lastExInput = input;
                        return [3 /*break*/, 7];
                    }
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    status_1 = "RUNTIME ERROR";
                    result = { time: 0, memory: 0, output: error_1.message };
                    return [3 /*break*/, 11];
                case 9:
                    resultObj = {
                        status: status_1,
                        userId: userSubmission.userId,
                        questionId: userSubmission.questionId,
                        result: { output: result.output, input: lastExInput },
                        time: time,
                        memory: memory,
                        difficulty: userSubmission.difficulty,
                        userCode: userSubmission.userCode
                    };
                    console.log(resultObj);
                    console.log("SENDING RESULT");
                    // Send the result to the user
                    return [4 /*yield*/, redis_1.redisClient.publish("submissions", JSON.stringify(resultObj))];
                case 10:
                    // Send the result to the user
                    _b.sent();
                    return [3 /*break*/, 1];
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_2 = _b.sent();
                    console.log(error_2);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.worker = worker;
var isCompileError = function (errorOutput, language) {
    var patterns = {
        cpp: /error:|undefined reference to/
    };
    return patterns[language].test(errorOutput);
};
var runCode = function (code, language, input) { return __awaiter(void 0, void 0, void 0, function () {
    var config, fileName, compileCmd, runCmd, execDir, command, start, memory;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                config = getConfig(language, code, input);
                if (!config) {
                    throw new Error('Unsupported language');
                }
                fileName = config.fileName, compileCmd = config.compileCmd, runCmd = config.runCmd;
                execDir = path_1.default.join(__dirname, 'exec');
                if (!fs_1.default.existsSync(execDir)) {
                    fs_1.default.mkdirSync(execDir, { recursive: true });
                }
                command = "".concat(compileCmd, " && ").concat(runCmd);
                start = Date.now();
                memory = process.memoryUsage();
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        (0, child_process_1.exec)(command, { cwd: execDir }, function (error, stdout, stderr) {
                            var executionTime = Date.now() - start;
                            var memoryUsed = process.memoryUsage().heapUsed - memory.heapUsed;
                            if (error) {
                                reject({ time: executionTime / 1000, memory: memoryUsed / (1024 * 1024), output: stderr });
                            }
                            else {
                                resolve({ time: executionTime / 1000, memory: memoryUsed / (1024 * 1024), output: stdout });
                            }
                        });
                    })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getConfig = function (language, code, input) {
    var codeEscaped = code.replace(/"/g, '\\"');
    var inputEscaped = input.replace(/"/g, '\\"');
    switch (language) {
        case 'python':
            return {
                fileName: 'script.py',
                compileCmd: `echo codeEscaped > script.py"`,
                runCmd: "echo \"".concat(inputEscaped, "\" | python script.py")
            };
        case 'javascript':
            return {
                fileName: 'script.js',
                compileCmd: "echo \"".concat(codeEscaped, "\" > script.js"),
                runCmd: "echo \"".concat(inputEscaped, "\" | node script.js")
            };
        case 'cpp':
            return {
                fileName: 'main.cpp',
                compileCmd: "echo \"".concat(codeEscaped, "\" > main.cpp && g++ main.cpp -o main"),
                runCmd: "echo \"".concat(inputEscaped, "\" | ./main")
            };
        default:
            return null;
    }
};

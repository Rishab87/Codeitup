const url = "http://localhost:4000/api/v1"

export const questionEndpoints = {
    getQuestionsByPage: `${url}/questions/questionsByPage`,
    getQuestionsById: `${url}/questions/`,
}

export const submissionEndpoints = {
    submitCode: `${url}/problem-submission/submit-problem`
}
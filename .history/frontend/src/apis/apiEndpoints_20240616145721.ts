const url = "http://localhost:4000/api/v1"

export const questionEndpoints = {
    getQuestionsByPage: `${url}/questions/questionsByPage`,
    getQuestionsById: `${url}/questions/`,
}

export const submissionEndpoints = {
    submitCode: `${url}/problem-submission/submit-problem`
<<<<<<< HEAD
}

export const authEndpoints = {
    login: `${url}/auth/login`,
    signup: `${url}/auth/signup`,
    forgotPassword: `${url}/auth/forgot-password`,
    forgotPasswordToken: `${url}/auth/forgot-password-token`,
    changePassword: `${url}/auth/change-password`,
    sendOtp: `${url}/auth/send-otp`,
    cookieLogin: `${url}/auth/cookie-login`,
    expireCookie: `${url}/auth/expire-cookie`
}

export const profileEndpoints = {
    checkUsername: `${url}/profile/checkForUsername`,
=======
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac
}
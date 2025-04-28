const url = process.env.NEXT_PUBLIC_BACKEND_URL

export const questionEndpoints = {
    getQuestionsByPage: `${url}/questions/questionsByPage`,
    getQuestionsById: `${url}/questions/`,
    getQuestionsByFilter: `${url}/questions/filterQuestions`
}

export const submissionEndpoints = {
    submitCode: `${url}/problem-submission/submit-problem`,
    getUserSubmissionsByQuestion: `${url}/problem-submission/get-user-submissions-by-question`,
}

export const authEndpoints = {
    login: `${url}/auth/login`,
    signup: `${url}/auth/signup`,
    forgotPassword: `${url}/auth/forgot-password`,
    forgotPasswordToken: `${url}/auth/forgot-password-token`,
    changePassword: `${url}/auth/change-password`,
    sendOtp: `${url}/auth/send-otp`,
    cookieLogin: `${url}/auth/cookie-login`,
    expireCookie: `${url}/auth/expire-cookie`,
    nextAuth: `${url}/auth/next-auth`
}

export const profileEndpoints = {
    checkUsername: `${url}/profile/checkForUsername`,
    getUserByUsername: `${url}/profile/getUserByUsername`,
    uploadImage: `${url}/profile/updaetProfileImage`,
    updateProfile : `${url}/profile/updateProfile`,
    updateUsername: `${url}/profile/updateUsername`,
    updateSocials: `${url}/profile/updateSocials`,
    deleteProfile: `${url}/profile/deleteProfile`
}
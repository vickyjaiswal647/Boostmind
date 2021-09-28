const Joi = require('@hapi/joi');

const checkUploadVideo = Joi.object({
    branch: Joi.string().required(),
    semester: Joi.string().required(),
    subject: Joi.string().required(),
    displayName: Joi.string().required(),
})


const checkCreateTest = Joi.object({
    testName: Joi.string().required(),
    testCode: Joi.number().required(),
    totalQuestions: Joi.number().required(),
    attemptableQuestion:Joi.number().required(),
    testTime:Joi.number().required(),
    semester: Joi.string().required(),
    branch: Joi.string().required(),
})

const checkAddQuestion = Joi.object({
    testCode: Joi.string().required(),
    qStatement: Joi.string().required(),
    option1:  Joi.string().required(),
    option2:  Joi.string().required(),
    option3:  Joi.string().required(),
    option4:  Joi.string().required(),
    correctAnswer: Joi.string().required(),
})

const checkTest = Joi.object({
    testCode: Joi.string().required(),
})


const checkCreateSubject = Joi.object({
    subjectName:Joi.string().required(),
    subjectCode:Joi.string().required(),
    semester: Joi.string().required(),
    branch: Joi.string().required(),
})

const checkEmail = Joi.object({
    email: Joi.string().email().lowercase().required(),
})

module.exports = {
    checkUploadVideo,
    checkCreateTest,
    checkAddQuestion,
    checkTest,
    checkCreateSubject,
    checkEmail
}
const Viedo = require('../models/viedos')
const newTest = require('../models/newTest')
const Question = require('../models/question')
const AttemptTest = require('../models/attemptTest')
const commonResponses = require('../components/response/commonResponse');
const Subject = require('../models/subject')
const {checkUploadVideo, checkCreateTest, checkAddQuestion,checkTest,checkCreateSubject, checkEmail} = require('./inputValidations/adminValidations')
const Joi = require('@hapi/joi');
const User = require('../models/user');
require('./inputValidations/adminValidations')


module.exports.uploadViedo = async function(req, res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can add viedos")
    try{

        Viedo.uploadedViedo(req, res, async function(err){
            try{
                const { error } = await checkUploadVideo.validateAsync(req.body);   
             }catch(error){
                if(error.isJoi == true){return commonResponses.joiError(error,res)} 
             }
            if(req.file == undefined){
                return commonResponses.fileRequired(res)
            }
            
             var uploadViedo = req.file.filename  
             
             let newViedo = await Viedo.create({
                 user: req.user._id,
                 semester: req.body.semester,
                 subject: req.body.subject,
                 viedo: uploadViedo,
                 displayName: req.body.displayName,
                 branch: req.body.branch
            });
            return commonResponses.viedoUploaded(res)
        })
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}

module.exports.createTest = async function(req, res){

    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can add test")
    try{
        const { error } = await checkCreateTest.validateAsync(req.body); 
        let someTest = await newTest.findOne({testCode: req.body.testCode})
        if(someTest != null) return commonResponses.badRequest(res,'Test with this code already exisits')
        let newTests = await newTest.create({
            testName: req.body.testName,
            testCode: req.body.testCode,
            totalQuestions: req.body.totalQuestions,
            attemptableQuestion: req.body.attemptableQuestion,
            testTime: req.body.testTime,
            semester: req.body.semester,
            isActive:0,
            branch: req.body.branch
            
       });
       return commonResponses.newTestCreated(res)
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}

module.exports.addQuestion = async function(req,res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can add questions")
    try{
        const { error } = await checkAddQuestion.validateAsync(req.body); 
        let toTest = await newTest.findOne({testCode: req.body.testCode})
        if(toTest == null) return commonResponses.notFound(res, 'Test with this test code does exits')
        let newQuestion = await Question.create({
            qStatement: req.body.qStatement,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            correctAnswer: req.body.correctAnswer,
            
        })
        
        let addQuestion = await toTest.allQuestions.push(newQuestion)
        let toSave = await toTest.save()
        
        return commonResponses.successWithString(res,'Question Added')
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
    
}

module.exports.activateTest = async function(req,res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can activate test")
    try{
        const { error } = await checkTest.validateAsync(req.body); 
        let test = await newTest.findOne({testCode: req.body.testCode})
        if(test == null) return commonResponses.notFound(res, 'Test with this test code does exits')
        test.isActive = 1
        let saveTest = await test.save()
        return commonResponses.successWithString(res,'Test is Active Now')
      
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}


module.exports.deactivateTest = async function(req, res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can deactivate test")
    try{
        const { error } = await checkTest.validateAsync(req.body); 
        let test = await newTest.findOne({testCode: req.body.testCode})
        if(test == null) return commonResponses.notFound(res, 'Test with this test code does exits')
        test.isActive = 0
        let saveTest = await test.save()
        return commonResponses.successWithString(res,'Test is No more Active now')
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}

module.exports.getTestResult = async function(req, res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can get test result")
    try{    
        const { error } = await checkTest.validateAsync(req.body);   
        let test = await newTest.findOne({testCode: req.body.testCode})
        if(test == null) return commonResponses.notFound(res, 'Test with this test code does exits')  
        let ofTest = await AttemptTest.find({testCode: req.body.testCode},{_id:0}).select('testScore user').populate('user', 'fullname email')
        var toSend=[]
        for(var i=0; i<ofTest.length;i++){
            let currentData = {
                "fullname": ofTest[i].user.fullname,
                "email": ofTest[i].user.email,
                "testScore": ofTest[i].testScore
            }
            toSend.push(currentData)        }

        return commonResponses.successWithData(res, toSend)
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}

module.exports.createSubject= async function(req, res){
    if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin can create subject")
    try{
        const { error } = await checkCreateSubject.validateAsync(req.body);   
        let newSubject = await Subject.create({
            user: req.user,
            branch: req.body.branch,
            semester: req.body.semester,
            subjectName: req.body.subjectName,
            subjectCode: req.body.subjectCode
        })
        return commonResponses.successWithString(res, "Subject created Successfully")
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}

module.exports.getSubjects = async function(req, res){
    if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin get subjects")
    try{
        let allSubjects = await Subject.find().select('subjectName subjectCode')
        let toSend = []
        for(var i=0;i<allSubjects.length;i++){
           let currentSubject = {
            "value": allSubjects[i].subjectCode,
            "label": allSubjects[i].subjectName
            }
            toSend.push(currentSubject)          
        }
        return commonResponses.successWithData(res, toSend)
    }catch(error){
        return commonResponses.internalError(res)
    }

}

module.exports.makeAdmin = async function(req, res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin make other admin")
    try{
        const { error } = await checkEmail.validateAsync(req.body);  
        let user = await User.findOne({email: req.body.email})
        if(user == null) return commonResponses.notFound(res, "User with this email doesnot exists")
        user.isAdmin=1;
        let saveUser = await user.save()
        return commonResponses.successWithString(res, `${user.email} is now a admin`)
    }catch(error){
        console.log(error)
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}


module.exports.removeAdmin = async function(req, res){
    // if(req.user.isAdmin == 0) return commonResponses.someMessage(res, "Only admin remove other from admin")
    try{
        const { error } = await checkEmail.validateAsync(req.body);  
        let user = await User.findOne({email: req.body.email})
        if(user == null) return commonResponses.notFound(res, "User with this email doesnot exists")
        user.isAdmin=0;
        let saveUser = await user.save()
        return commonResponses.successWithString(res, `${user.email} is not an admin now`)
    }catch(error){
        if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }
}
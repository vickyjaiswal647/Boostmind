const newTest = require('../models/newTest')
const Question = require('../models/question')
const commonResponses = require('../components/response/commonResponse');
const AttemptTest = require('../models/attemptTest')
const Viedo = require('../models/viedos');
const User = require('../models/user');
const Subject = require('../models/subject')
const {checkSubject} = require('./inputValidations/studentValidations')

const Joi = require('@hapi/joi');

module.exports.getRandomQuiz = async function(req, res){
    try{ 
        const activeTest = await newTest.findOne({isActive:1, semester:req.user.semester, branch:req.user.branch})
        if(activeTest == null){
            return commonResponses.someMessage(res,"No Test is available for you")
        }    
        let isAttempted = await AttemptTest.findOne({testCode: activeTest.testCode, user: req.user._id})
        if(isAttempted != null){
            return commonResponses.someMessage(res,'You have already attempted this Test')
        }
        let test = await newTest.findOne({semester:req.user.semester, isActive:1},{_id:0}).select('allQuestions attemptableQuestion totalQuestions').populate('allQuestions', 'qStatement option1 option2 option3 option4 correctAnswer')
        if(test == null) return commonResponses.someMessage(res,"There is no test available for you")
        let questionList =[]
        let isVisited=[]
        for(var i=0;i< test.attemptableQuestion;i++)
        {
            isVisited[i]=false
        }
        var count = Number(0);
        while(count<test.attemptableQuestion){            
            let randomIndex = Math.floor(Math.random() * (test.attemptableQuestion));
            if(isVisited[randomIndex] == false){
                isVisited[randomIndex]=true
                questionList.push(test.allQuestions[randomIndex])
                count = count +1;
            }
        }

        let attemptedTest = AttemptTest.create({
            user: req.user._id,
            testCode: activeTest.testCode,
            testScore: 0,
            branch: req.user.branch,
            semester: req.user.semester
        })
        
        return commonResponses.successWithData(res,questionList)    
    }catch(error){
        return commonResponses.internalError(res)
    }
}

module.exports.submitQuiz = async function(req, res){
    try{
        let answers = req.body.answers;
        let correctAnswers = 0;
        for(var i=0;i<answers.length;i++)
        {
            let qId = answers[i].id
            var getQuestion = await Question.findById(qId);
            if(getQuestion.correctAnswer == answers[i].ans){
                correctAnswers ++;
            }
        }
        //Updating overall score
        let user = await User.findById(req.user._id);
        user.score = user.score + correctAnswers;
        let updatedUser = await user.save()

        // Updating current test Score
        let currentTestDetail = await AttemptTest.findOne({user: req.user._id})
        currentTestDetail.testScore = correctAnswers;
        let updatedData = await currentTestDetail.save()

        return commonResponses.successWithString(res, `Hello! ${user.fullname} your score in the quiz is ${correctAnswers} out of ${req.body.lenght}`)
    }catch(error){
        return commonResponses.internalError(res)
    }
    
}



module.exports.goToCourse = async function(req, res){
    try{
        const { error } = await checkSubject.validateAsync(req.body);  
        let allContents =  await Viedo.find({semester: req.user.semester, subject: req.body.data}).select('viedo displayName');        return commonResponses.successWithData(res, allContents);
    }catch(error){
         if(error.isJoi == true){return commonResponses.joiError(error,res)} 
        return commonResponses.internalError(res)
    }

}

module.exports.getSpecificSubjects = async function(req, res){
    try{
        let allSubjects = await Subject.find({branch: req.user.branch, semester: req.user.semester}).select('subjectName subjectCode')
        let toSend = []
        for(var i=0;i<allSubjects.length;i++){
           var currentSubject = {
            "id": allSubjects[i]._id,
            "label": allSubjects[i].subjectName,
            'value': allSubjects[i].subjectCode
            }
            toSend.push(currentSubject)          
        }
        return commonResponses.successWithData(res, toSend)
    }catch(error){
        return commonResponses.internalError(res)

    }

}
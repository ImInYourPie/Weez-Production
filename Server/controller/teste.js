// let questionSchema = require('../model/schemas/question.schema.js');
// let Tag = require('../model/schemas/tag.schema.js');
// let userSchema = require('../model/schemas/user.schema.js');

// class Teste {
//     static async voteQuestion(req, res) {

//         var counterInc = 0;
//         let voterType = null;

//         // voteType is the variable name in frontend
//         //check if upvote/downvote is reversed 
//         if (req.body.voteType == "") {
//             questionSchema.updateOne({ "_id": req.params.id }, {
//                 $pull: {
//                     "downVotes": req.body.username
//                 }
//             }, (err, result) => {
//                 console.log("Entrou")
//                 console.log("modified " + result.nModified)
//                 if (result.nModified > 0) {
//                     counterInc = 1;
//                     questionSchema.findOneAndUpdate({ "_id": req.params.id }, {
//                         $inc: { "voteCount": counterInc }
//                     }, (err, votes) => {
//                         if (err) {
//                             return res.status(500).send(err);
//                         }
//                         else {
//                             return res.status(200).send("Votou");
//                         }
//                     });
//                     console.log("Tirou down")
//                 }
//                 else {
//                     questionSchema.updateOne({ "_id": req.params.id }, {
//                         $pull: {
//                             "upVotes": req.body.username
//                         }
//                     }, (err, result) => {
//                         if (result.nModified > 0) {
//                             counterInc = -1;
//                             questionSchema.findOneAndUpdate({ "_id": req.params.id }, {
//                                 $inc: { "voteCount": counterInc }
//                             }, (err, votes) => {
//                                 if (err) {
//                                     return res.status(500).send(err);
//                                 }
//                                 else {
//                                     return res.status(200).send("Votou");
//                                 }
//                             });
//                             console.log("Tirou up")
//                         }
//                     });
//                 }
//             });
//         }

//         //If the user is already in the downvotes list, it removes from it and add to the upvotes
//         if (req.body.voteType == "up") {
//             questionSchema.find({ "_id": req.params.id }, (err, result) => {
//                 console.log(result[0].upVotes)
//                 var question = result[0];

//                 for (var i = 0; i < question.upVotes.length; i++) {
//                     console.log(question)
//                     if (req.body.username == question.upVotes[i]) {
//                         questionSchema.updateOne({ "_id": req.params.id }, {
//                             $pull: {
//                                 "upVotes": req.body.username
//                             }
//                         }, (err, result) => {
//                             counterInc = -1;
//                         });
//                     }
//                     else if (i === question.upVotes.length - 1 && req.body.username != question.upVotes[i]) {
//                         voterType = "upVotes";
//                         counterInc = 1;
//                         console.log(counterInc + "huelelele")
//                     }
//                 }

//                 for (var i = 0; i < question.downVotes.length; i++) {
//                     if(req.body.username == question.downVotes[i]){
//                         questionSchema.updateOne({ "_id": req.params.id }, {
//                             $pull: {
//                                 "upVotes": req.body.username
//                             }
//                         }, (err, result) => {
//                             counterInc = 1;
//                         });
//                     }
//                 }
//             })
//         }

//         //If the user is already in the upvotes list, it removes from it and add to the downvotes
//         if (req.body.voteType == "down") {
//             voterType = "downVotes"
//             questionSchema.updateOne({ "_id": req.params.id }, {
//                 $pull: {
//                     "upVotes": req.body.username
//                 }
//             }, (error, result) => {
//                 if (result.nModified > 0) {
//                     counterInc = -2;
//                 }
//                 else {
//                     counterInc = -1;
//                 }
//             });
//         }

//         if (req.body.voteType != "") {
//             console.log("1: " + counterInc)
//             questionSchema.updateOne({ "_id": req.params.id }, {
//                 $addToSet: {
//                     [voterType]: req.body.username
//                 }
//             }, (err, result) => {
//                 if (result.nModified > 0) {
//                     console.log("Entrou no modified")
//                     questionSchema.findOneAndUpdate({ "_id": req.params.id }, {
//                         $inc: { "voteCount": counterInc }
//                     }, (err, votes) => {
//                         if (err) {
//                             return res.status(500).send(err);
//                         }
//                         else {
//                             return res.status(200).send("Votou");
//                         }
//                     });
//                     console.log("Counter inc: " + counterInc)


//                 }
//             });
//         }
//     }
// }

// module.exports = Teste

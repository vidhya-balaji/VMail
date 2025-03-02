const express = require("express")
const app=express();
const cors=require("cors");
const mongoose = require("mongoose")

app.use(cors());

app.use(express.json())

//mongoose.connect("mongodb+srv://vidhyab:vidhya1234@cluster0.qc09t.mongodb.net/VMail?retryWrites=true&w=majority&appName=Cluster0").then(function(){
mongoose.connect("mongodb://127.0.0.1:27017/passkey").then(function(){
   console.log("connected") 
}).catch((error) => {
    console.log(error) 
})

const credential = mongoose.model("credential",{},"bulkmail")

const nodemailer = require("nodemailer");

const emailTemplate = (subject,message, recipient) => ({
    from: "vidhyabalaji.nina@gmail.com",
    to: recipient,
    subject: subject,
    text: message
  });

// const sendMails = (message, emailList) => {
//     return credential.find().then(function(data){
    
//         const transporter = nodemailer.createTransport({
//             service:"gmail",
//              auth: {
//                user: data[0].toJSON().user,
//                pass: data[0].toJSON().pass,
//              },
//            });
//            new Promise(async (resolve, reject) => {
//             try {
//                 for (const recipient of emailList) {
//                     const mailOptions = emailTemplate(message, recipient);
            
//                     await transporter.sendMail(mailOptions);
//                     console.log(`Email sent to ${recipient}`);
//                 }
//                 resolve("Success")
//             } catch (error) {
//                 console.error('Error sending emails:', error.message);
//                 reject(error.message)
//             }
//         })
//     })
// };

app.post("/sendemail",function(req,res){



    credential.find().then(function(data){
    
        const transporter = nodemailer.createTransport({
            service:"gmail",
             auth: {
               user: data[0].toJSON().user,
               pass: data[0].toJSON().pass,
             },
           });
           new Promise(async (resolve, reject) => {
            try {
                for (const recipient of req.body.emailList) {
                    const mailOptions = emailTemplate(req.body.subject, req.body.msg, recipient);
            
                    await transporter.sendMail(mailOptions);
                    console.log(`Email sent to ${recipient}`);
                }
                resolve("Success")
            } catch (error) {
                console.error('Error sending emails:', error.message);
                reject(error.message)
            }
        }).then(function(){
            res.send(true); 
        }).catch((error) => {
            res.send(false);
        })
    })


    // sendMails(req.body.msg, req.body.emailList).then((response) => {
    //     console.log("1")
    //     console.log(response)
    //     res.send(true);
    // })
    // .catch((error) => {
    //     res.send(false);
    // })

})


app.listen(5000,function()
{
    console.log("Server Started..........");
    
})
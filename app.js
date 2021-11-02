const express = require('express');
const app = express();
const port = process.env.PORT||2000;
const wishData = require('./src/model/wishData');
const path = require('path');
const  nodeMailer = require('nodemailer');
const bodyParser = require('body-parser');
var item;



app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.set('views','./src/views');

app.get('/',function(req,res){
    res.render("index");
});

app.post('/',function(req,res){
    const id=req.params.id;
     item = {
        name:req.body.name,
        rname:req.body.rname,
        email:req.body.email
    }
    //console.log(item);
    var data = wishData(item);
    data.save((err,result)=>{
        console.log(result)

        if (err){}else{
            res.render('wish',{item});
        }
    })
    
   
});



app.get('/wish',function(req,res){

    res.render("wish");
});

app.get('/mailer', function(req,res){
    //res.send('email send');
    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'manjoos4@gmail.com',
          pass: 'manjoos432'
        }
      });
      console.log(item);
      var mailOptions = {
        from: item.name,
        to: item.email,
        subject: 'Diwali Wishes',
        text: item.name+' wishes you a happy diwali!!! Click the following link'+ 'https://manjudiwali.herokuapp.com/'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send("Error:"+error);
        } else {
         res.render('wishsent',{item});
        }
      });
    });

app.listen(port,()=>{console.log("Server ready at" + port)});
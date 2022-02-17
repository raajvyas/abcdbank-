var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");

//used to serve static files from public directory
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

//create user account
app.get("/account/create/:name/:email/:password", async function  (req, res) {

  try{
    const response = await  dal.all()
    //console.log(response, "res from reg")

    const emailExists = response.find(data => data.email === req.params.email)

    if(emailExists){
      res.send({err: "email exists"})
      console.log("email exists")
    }
        else{
         const user= await dal.create(req.params.name, req.params.email, req.params.password)
         res.send(user); 
         console.log(user)
      }
    
    


  }
catch(err){
  res.status(500).send(err)
}
 

 

  //else create user
  // dal
  //   .create(req.params.name, req.params.email, req.params.password)
  //   .then((user) => {
  //     console.log(user);
  //     res.send(user);
  //   }).catch(err => res.status(500).send(err));
});

//login to user account
app.post("/account/login", function (req, res) {
  const { email, password } = req.body;
  dal.login(email, password).then((user) => {
    res.send(user);
  }).catch(err => res.status(500).send(err));
});

//deposit to account
app.put("/account/update", function (req, res) {
  const { email, amount } = req.body;
  dal.deposit(email, amount).then((user) => {
    if(user.lastErrorObject.updatedExisting){
      res.json({success: true});
    }else{
      res.json({success: false});
    }
  }).catch(err => res.status(500).send(err));
});

//withdraw from account
app.put("/account/withdraw", function (req, res) {
  const { email, amount } = req.body;
  dal.withdraw(email, amount).then((user) => {
    if(user.ok){
      res.json({msg: 'withdrawal successful'});
    }
  }).catch(err => res.status(500).send(err));
});

//balance of account
app.post("/account/balance", function (req, res) {
  const { email } = req.body;
  dal.balance(email).then((user) => {
    res.send(user);
  }).catch(err => res.status(500).send(err));
});

//returning all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  }).catch(err => res.status(500).send(err));
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);

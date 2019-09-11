const express = require("express")
const app = express.Router()
app.get("send_mail",(req,res) =>{
  const {name, phone, email, message} = req.body;
})
app.post("/test", (req,res) => {
  res.send("Hello, World!")
})
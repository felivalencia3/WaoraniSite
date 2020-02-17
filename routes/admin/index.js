const app = require("express").Router();

app.get("/new", (req, res) => {
  if (eval(req.cookies.admin)) {
      res.render("postform")
  }
  else {
      res.redirect("/")
  }
  
});
app.post("/login", require("body-parser").urlencoded(), (req,res) => {
  const {uname, psw} = req.body;
  if (uname == "gpclass" && psw=="12345") {
      res.cookie("admin", true)
      res.redirect("/admin/new")
  }
  else {
      res.redirect("/")
  }
})
module.exports = app
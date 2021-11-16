function recoger() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("pwd").value;

  if (username == "mikelazqueta" && password == "12345") {
    var ok = "x";
    alert("Login Successfully");
    return ok;

  } else {
    alert("wrong username or password");
    return false;
 
  }


}

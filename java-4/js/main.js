var signinEmail= document.getElementById("signinEmail")
var signinPassword =document.getElementById("signinPassword")
var signupName = document.getElementById("signupName")
var signupEmail = document.getElementById("signupEmail")
var signupPassword = document.getElementById("signupPassword")
var username =localStorage.getItem('sessionUsername')
if (username){
    document.getElementById('username').innerHTML= "Welcom " + username
}

var signupArray= []
if (localStorage.getItem('users') == null) {
    signupArray = []
} else {
    signupArray = JSON.parse(localStorage.getItem('users'))
}
function isvalidEmail(){
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if( regex.test(signupEmail.value) == true){
        signupEmail.classList.add("is-valid");
        signupEmail.classList.remove("is-invalid");
        return true;
    }else{
        signupEmail.classList.add("is-invalid");
        signupEmail.classList.remove("is-valid");
        return false;
    }
}
function signUp(){
    if(isempty() == false){
        document.getElementById("exist").innerHTML  = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    } else if(isvalidEmail() == false){
        document.getElementById("exist").innerHTML  = '<span class="text-danger m-3">email not valid</span>'
    }
    var signUp ={
    name : signupName.value,
    email :signupEmail.value,
    password :signupPassword.value
} 
if (signupArray.length == 0){
    signupArray.push(signUp)
    localStorage.setItem('users',JSON.stringify(signupArray))
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    return true
}
if(isexist() == false ){
    document.getElementById("exist").innerHTML ='<span class="text-danger m-3">email already exists</span>'
}else{
    signupArray.push(signUp)
    localStorage.setItem('users',JSON.stringify(signupArray))
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
}
}

//check inputs is empty
function isempty(){
    if (signupName.value== "" || signupPassword.value==""|| signupEmail.value==""){
        return false    
    }else{
        return true
    }
}
//check email is exist
function isexist(){
    for (var i=0 ; i< signupArray.length ; i++){
        if(signupArray[i].email.toLowerCase()== signupEmail.value.toLowerCase()){
            return false
        }else {
            return true
        }
    }
}

function isloginEmpty(){
    if ( signinPassword.value == "" || signinEmail.value == ""){
        return false    
    }else{
        return true
    }
}
function logIn(){
    if(isloginEmpty()== false){
        document.getElementById("incorrect").innerHTML  = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
        var email = signinEmail.value
        var password = signinPassword.value
        for (var i= 0 ; i< signupArray.length ; i++){
            if (signupArray[i].email.toLowerCase() == email.toLowerCase() && signupArray[i].password.toLowerCase() == password.toLowerCase()){
                localStorage.setItem('sessionUsername', signupArray[i].name)
                window.open( "home.html","_self");
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}


function logout() {
    localStorage.removeItem('sessionUsername')
}
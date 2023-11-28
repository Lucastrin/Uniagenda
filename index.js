function logar(){
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if(login == "16025310" && senha =="123456"){
        location.href = 'home.html';
    }
    else{
        document.getElementById('error').style.display="block";
    }
}
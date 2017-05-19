var URL = "https://packbot.herokuapp.com/maquina/";
//var URL = "http://127.0.0.1:5000/maquina/";

$(document).ready(function() {

    $("#login").click(function() {
        console.log("click");
        var usuario = $("#user").val();
        var password = $("#pass").val();
        if (usuario === "") {
            swal('campo de nombre vacio');
            return false;
        } else if (password === "") {
            swal("Campo password  vacio");
            return false;
        }
        var user = {
            username: usuario,
            password: password
        }


        var login = $.post("https://packbot.herokuapp.com/maquina/" + "login", user)
            .done(function(data) {
                if (data.status.cod === 1) {
                    console.log(data.user.username);
                    localStorage.setItem("nombre", data.user.username);
                    swal(data.status.msg).then(function go() {
                        window.location.href = "/mensaje.html";
                    })
                } else {
                    swal(
                        data.status.msg
                    )
                }
            })
            .fail(function() {
                alert("error");
            });
    });

    $('#registro').click(function() {
        window.location.href = "./registro.html"
    });
});
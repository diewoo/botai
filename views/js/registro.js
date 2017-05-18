$(document).ready(function() {
    $("#registro").click(function() {
        var empresa = $("#empresa").val();
        var usuario = $("#usuario").val();
        var password = $("#password").val();
        var telefono = $("#telefono").val();
        var email = $("#email").val();
        var mensaje = $("#message").val();
        if (empresa === "") {
            swal('campo de empresa vacio');
            return false;
        } else if (usuario === "") {
            swal("Campo usuario  vacio");
            return false;
        } else if (password === "") {
            swal("Campo password  vacio");
            return false;
        } else if (telefono === "") {
            swal("Campo de telefono  vacio");
            return false;
        } else if (email === "") {
            swal("Campo de email  vacio");
            return false;
        }


        var user = {
            empresa: empresa,
            username: usuario,
            password: password,
            telefono: telefono,
            correo: email,
            mensaje: mensaje
        }
        var config = {
            headers: {
                'Content-type': 'application/json; charset=utf-8'

            }
        };
        console.log(JSON.stringify(user));
        axios.post("https://packbot.herokuapp.com/maquina/registro", user, config)

        .then(function(response) {
                console.log(JSON.stringify(response.data.status.cod));
                var cod = JSON.stringify(response.data.status.cod);
                console.log(cod);
                if (cod === JSON.stringify(1)) {
                    swal(JSON.stringify(response.data.status.msg)).then(function go() {
                        window.location.href = "/index.html";
                    })
                } else {
                    swal(JSON.stringify(response.data.status.msg)).then(function go() {
                        window.location.href = "/registro.html";
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            })



    })

});
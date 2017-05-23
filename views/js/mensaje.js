/*var nombre = localStorage.getItem("nombre");
var URL1 = "https://packbot.herokuapp.com/maquina/webhookweb"
var URL2 = "https://32e7c58f.ngrok.io/maquina/webhookweb";
$(document).ready(function() {

    var config = {
        headers: {
            'Content-type': 'application/json; charset=utf-8'

        }
    };
    var user = {
        username: nombre
    }

    axios.post(URL2, user, config)
        .then(function(response) {
            console.log(response);

        })
        .catch(function(error) {
            console.log(error);
        })


});


*/






document.getElementById('todoInputForm').addEventListener('submit', performPostRequest);

function performPostRequest(e) {
    //var respuesta=" ";
    var resultElement = document.getElementById('postResult');
    var todoTitle = document.getElementById('todoTitle').value;
    resultElement.innerHTML = '';
    axios.post('https://packbot.herokuapp.com/maquina/mensaje/' + todoTitle)

    .then(function(response) {
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function(error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        })
    e.preventDefault();
}

function generateSuccessHTMLOutput(response) {

    return JSON.stringify(response.data.result.fulfillment.speech, null, '\t');
}

function generateErrorHTMLOutput(error) {
    return '<h4>Result:</h4>' +
        '<h5>Message:</h5>' +
        '<pre>' + error.message + '</pre>' +
        '<h5>Status:</h5>' +
        '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
        '<h5>Headers:</h5>' +
        '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
        '<h5>Data:</h5>' +
        '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}

function clearOutput() {
    var resultElement = document.getElementById('postResult');
    resultElement.innerHTML = '';
}
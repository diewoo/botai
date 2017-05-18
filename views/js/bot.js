function performGetRequest1() {
    var resultElement = document.getElementById('getResult1');
    resultElement.innerHTML = '';
    var config = {
        headers: {
            'Authorization': 'Bearer 0511eed9bbce47fb877d7edc87710c40'
        }
    };
    axios.get('https://api.api.ai/v1/entities?v=20150910', config)
        .then(function(response) {
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function(error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        });
}
function performGetRequest2(){
  var resultElement = document.getElementById('getResult2');
  var todoId = document.getElementById('todoId').value;
  resultElement.innerHTML = '';

  axios.get('http://jsonplaceholder.typicode.com/todos', {
    params: {
      id: todoId
    }
  })
    .then(function (response) {
      resultElement.innerHTML = generateSuccessHTMLOutput(response);
    })
    .catch(function (error) {
      resultElement.innerHTML = generateErrorHTMLOutput(error);
    });
}
document.getElementById('todoInputForm').addEventListener('submit', performPostRequest);

function performPostRequest(e) {
    var resultElement = document.getElementById('postResult');
    var todoTitle = document.getElementById('todoTitle').value;
    resultElement.innerHTML = '';
    var config = {
        headers: {
            'Authorization': 'Bearer 0511eed9bbce47fb877d7edc87710c40'

        }
    };
    axios.post('https://api.api.ai/v1/query?v=20150910',{
    	query:todoTitle,
    	lang:"es",
    	sessionId:"packbot"	
    },config)

    .then(function(response) {
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function(error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        })
    e.preventDefault();
}

function generateSuccessHTMLOutput(response) {
    return '<h4>Result:</h4>' +
        '<h5>Status:</h5>' +
        '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
        '<h5>Headers:</h5>' +
        '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
        '<h5>Data:</h5>' +
        '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
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
    var resultElement = document.getElementById('getResult1');
    resultElement.innerHTML = '';
    var resultElement = document.getElementById('postResult');
    resultElement.innerHTML = '';
}
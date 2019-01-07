console.log('app.js loaded!');

var getFormData = function(e) {
  e.preventDefault();
  var formData = document.getElementById('text').value;
  console.log(formData);
  sendFile(formData);
}

var display = function(data) {
  var result = document.getElementById('result');
  result.innerHTML = '';
  result.append(data);
}

var failMessage = function() {
  var result = document.getElementById('result');
  result.innerHTML = '';
  result.append('Not a text file. Fail to send.');
}

var sendFile = function(file) {
  console.log('hi');
  $.ajax({
    url: '/convert',
    type: 'POST',
    contentType: 'text/plain',
    data: file
  })
    .done(function(data) {
      console.log('send file successful!');
      display(data);
    })
    .fail(function() {
      console.log('fail to send file!');
      failMessage();
    })
}

var form = document.getElementById('form');
form.addEventListener('submit', getFormData);


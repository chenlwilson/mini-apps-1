console.log('app.js loaded!');

var getFileData = function(e) {
  e.preventDefault();
  var textArea = document.getElementById('text');
  var keyword = document.getElementById('keyword');
  var blacklist = '';
  if (keyword.value) {
    blacklist += keyword.value;
  }
  if (textArea.value) {
    sendFile(textArea.value + '%' + blacklist);
    document.getElementById('form').reset();
  } else {
    var fileInput = document.getElementById('file');
    var file = fileInput.files.item(0);
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      sendFile(reader.result + '%' + blacklist);
    }
  }
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
//form.addEventListener('submit', getFormData);
form.addEventListener('submit', getFileData);


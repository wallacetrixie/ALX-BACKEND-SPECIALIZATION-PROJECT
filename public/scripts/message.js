document.getElementById('sendButton').addEventListener('click', function() {
    var messageContent = document.getElementById('messageInput').value.trim(); 
    if (messageContent !== '') {
        // AJAX request to the server to insert the message into thedatabase
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/send-message', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Message sent successfully');
                    document.getElementById('messageInput').value = "";   
                    fetchPage2Messages();
                    fetchPage1Messages();
                    
                    
                } else {
                    console.error('Error sending message:', xhr.responseText);
                }
            }
        };
        xhr.send(JSON.stringify({ content: messageContent }));
    } else {
        console.error('Cannot send blank message');
    }
});
function fetchPage1Messages() {
    fetch('/page1-messages')
        .then(response => response.json())
        .then(messages => {
            document.querySelector('.message-container .sent').innerHTML = ''; 
            messages.reverse().forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.textContent = message.content;
                const timestampSpan = document.createElement('span');
                timestampSpan.classList.add('timestamp');
                timestampSpan.textContent = formatTimestamp(message.timestamp); 
                messageDiv.appendChild(timestampSpan);
                   const tickIcon = document.createElement('i');
                    tickIcon.classList.add('fas', 'fa-check', 'tick-icon');
                    messageDiv.appendChild(tickIcon);
                messageDiv.classList.add('sent-message');
                document.querySelector('.message-container .sent').appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error fetching messages from Page 1:', error));
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
}

fetchPage1Messages();
function fetchPage2Messages() {
    fetch('/page2-messages')
        .then(response => response.json())
        .then(messages => {
            document.querySelector('.message-container .received').innerHTML = '';
            messages.reverse().forEach(message => {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message');
                messageDiv.textContent = message.content;
                const timestampSpan = document.createElement('span');
                timestampSpan.classList.add('timestamp');
                timestampSpan.textContent = formatTimestamp(message.timestamp);
                messageDiv.appendChild(timestampSpan);
                messageDiv.classList.add('received-message');
                document.querySelector('.message-container .received').appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error fetching messages from Page 2:', error));
}

fetchPage2Messages();

// FILE UPLOADS
 function uploadFile() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      fetch('/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            alert('File uploaded successfully!');
          } else {
            throw new Error('Failed to upload file.');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while uploading the file.Check Your file size and ensure you dont upload blank files');
        });
    }

    document.getElementById('fileInput').addEventListener('change', function () {
      const selectedFile = document.getElementById('selectedFile');
      if (this.files.length > 0) {
        selectedFile.innerHTML = `
          Selected file: ${this.files[0].name}
          <button class="clear-button" onclick="clearFile()"><i class="fas fa-times"></i> Clear</button>
        `;
      } else {
        selectedFile.textContent = ''; 
      }
    });

    // Function to clear selected file
    function clearFile() {
      const fileInput = document.getElementById('fileInput');
      fileInput.value = '';
      document.getElementById('selectedFile').textContent = '';
    }
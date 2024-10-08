document.getElementById('sendButton').addEventListener('click', function() {
    var messageContent = document.getElementById('messageInput').value;
    // Send an AJAX request to the server to insert the message into the database
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/send-message-page2', true);
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
});
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
               
                    const tickIcon = document.createElement('i');
                    tickIcon.classList.add('fas', 'fa-check', 'tick-icon');
                    messageDiv.appendChild(tickIcon);
                messageDiv.classList.add('sent-message');
                document.querySelector('.message-container .received').appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error fetching messages from Page 1:', error));
}


function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}`;
}

fetchPage2Messages();
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
                messageDiv.classList.add('received-message');
                document.querySelector('.message-container .sent').appendChild(messageDiv);
            });
        })
        .catch(error => console.error('Error fetching messages from Page 2:', error));
}

fetchPage1Messages();

document.addEventListener('DOMContentLoaded', function () {
      fetch('/files')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch files from the server.');
          }
          return response.json();
        })
        .then(data => {
          const fileList = document.getElementById('fileList');
          if (data.length > 0) {
            fileList.innerHTML = data.map(file => `
              <div class="file-container">
                <span>${file.name}</span>
                <a href="/download/${file.id}" class="download-button" target="_blank"><i class="fas fa-download"></i> Download</a>
              </div>
            `).join('');
          } else {
            fileList.innerHTML = '<p>No files have been sent Yet</p>';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while retrieving files.');
        });
    });

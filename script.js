document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('status');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Replace with your Google Apps Script Web App URL
        const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Show "Sending..." message
        statusDiv.textContent = 'Sending...';
        statusDiv.className = '';
        statusDiv.style.display = 'block';
        
        // Send data to Google Apps Script
        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            statusDiv.textContent = 'Message sent successfully!';
            statusDiv.className = 'success';
            form.reset();
            
            // Show alert
            alert('Message sent successfully!');
        })
        .catch(error => {
            // Show error message
            statusDiv.textContent = 'Error: ' + error.message;
            statusDiv.className = 'error';
            console.error('Error:', error);
        });
    });
}); 
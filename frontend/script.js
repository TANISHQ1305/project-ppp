document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        // Prevent default form submission via HTTP
        e.preventDefault();

        // Capture form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Reset message box
        formMessage.className = 'form-message';
        formMessage.textContent = 'Sending message...';
        formMessage.style.display = 'block';
        formMessage.style.opacity = '1';

        // Prepare JSON payload
        const payload = {
            name: name,
            email: email,
            message: message
        };

        try {
            // Send POST request using Fetch API to backend
            const response = await fetch('http://localhost:5000/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                showMessage(data.message || 'Message sent successfully!', 'success');
                // Clear the form
                contactForm.reset();
            } else {
                // Server Error Response
                showMessage(data.message || 'Failed to send message. Please try again.', 'error');
            }

        } catch (error) {
            // Network or Request Error
            console.error('Error submitting form:', error);
            showMessage('Network error. Ensure the backend server is running.', 'error');
        }
    });

    /**
     * Helper function to show and style messages
     */
    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message show ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 300); // Wait for transition
        }, 5000);
    }
});

// Hamburger Menu Toggle (mobile)
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navbar = document.getElementById("navbar");
hamburgerBtn.addEventListener("click", () => {
    navbar.classList.toggle("open");
});
// Close menu on link click (mobile)
navbar.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navbar.classList.remove("open"));
});

// Dark mode toggle & persistent theme
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const darkOn = body.classList.contains('dark');
    themeToggle.textContent = darkOn ? '☀️' : '🌙';
    localStorage.setItem('theme', darkOn ? 'dark' : 'light');
});

// Scroll to Top Button
const toTopBtn = document.getElementById('toTopBtn');
window.addEventListener('scroll', () => {
    toTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});
toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Fade-in effect for project cards and sections
function fadeInOnScroll() {
    document.querySelectorAll('.fade-in').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 90) el.classList.add('visible');
    });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    let valid = true;
    const name = document.getElementById('name'),
        email = document.getElementById('email'),
        message = document.getElementById('message');
    const nameError = document.getElementById('nameError'),
        emailError = document.getElementById('emailError'),
        messageError = document.getElementById('messageError');
    nameError.textContent = emailError.textContent = messageError.textContent = '';
    if (!name.value.trim()) {
        nameError.textContent = "Name required.";
        valid = false;
    }
    if (!email.value.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email.value)) {
        emailError.textContent = "Invalid email.";
        valid = false;
    }
    if (!message.value.trim()) {
        messageError.textContent = "Message required.";
        valid = false;
    }
    if (!valid) e.preventDefault();
    else {
        document.getElementById('formSuccess').textContent = 'Thank you! Your message was sent.';
        e.preventDefault(); // Remove to actually submit
        this.reset();
    }
    // --- Main Submission Handler ---

    form.addEventListener('submit', function(event) {
        // Prevent the default HTML form submission
        event.preventDefault();

        // Reset success message
        formSuccess.textContent = '';

        // Perform all validations
        const isNameValid = validateRequired(nameInput, nameError, 'Name is required.');
        const isEmailValid = validateEmail(emailInput, emailError);
        const isMessageValid = validateRequired(messageInput, messageError, 'Message is required.');

        // Check if ALL fields are valid
        if (isNameValid && isEmailValid && isMessageValid) {
            // All validations passed!

            // 1. Display success message
            formSuccess.textContent = 'Thank you for your message! We will be in touch shortly.';

            // 2. Clear the form fields
            form.reset();

            // 3. (In a real application) Send the data to the server using fetch or XMLHttpRequest here.

            /* Example of sending data (uncomment and replace with your actual endpoint):
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            fetch('/your-server-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(data => {
                // Handle server response (e.g., show success)
            })
            .catch((error) => {
                // Handle error
            });
            */

        } else {
            // At least one field failed validation
            // The error messages are already displayed by the validation functions
            console.log('Form validation failed.');
        }
    });
});
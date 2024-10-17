const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');
const special_character = "!@#$%^&*()<>,.:;|{}[]\"'/?";
const alphanumeric = "!@#$%^&*()<>,.:;|{}[]\"'/?0123456789";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const btn = document.getElementById('submit--btn');
const success = document.getElementById('success');
const show = document.getElementById('show');

btn.addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(elem => {
        elem.textContent = '';
    });
    let validInputs = true;
    if(!usernameValidation()){
        validInputs = false;
    }

    if(!emailValidation()){
        validInputs = false;
    }

    if(!passwordValidation()){
        validInputs = false;
    }

    if (validInputs) {
        success.style.display = 'block';
        
        const timer = setTimeout(() => {
            success.style.display = 'none';
        }, 1000);

    }

});

show.addEventListener('click', () => {
    if (password.type === 'password') {
        password.type = 'text'; 
        show.textContent = 'Hide Password'; 
    } else {
        password.type = 'password';
        show.textContent = 'Show Password'; 
    }
});

const usernameValidation = () => {
    // Length check
    if (username.value.length === 0) {
        document.getElementById('name-error').textContent = "Username cannot be empty";
        return false;
    } else if (username.value.length < 5) {
        document.getElementById('name-error').textContent = "Username should be at least 5 characters";
        return false;
    } else if (username.value.length > 12) {
        document.getElementById('name-error').textContent = "Username should be less than 13 characters";
        return false;
    }

    // Alphanumeric check
    for (let i = 0; i < alphanumeric.length; i++) {
        if (username.value.includes(alphanumeric[i])) {
            document.getElementById('name-error').textContent = "Username should not contain alphanumeric characters";
            return false;
        }
    }

    // uppercase check
    for (let i = 0; i < uppercase.length; i++) {
        if (username.value.includes(uppercase[i])) {
            document.getElementById('name-error').textContent = "Username should contain only lowercase letters";
            return false;
        }
    }
    return true;
}

const number_check = () => {
    let contains_number = false;
    for (let i = 0; i < number.length; i++) {
        if (password.value.includes(number[i])) {
            contains_number = true;
            break;
        }
    }
    return contains_number;
}

const special_check = () => {
    let contains_special = false;
    for (let i = 0; i < special_character.length; i++) {
        if (password.value.includes(special_character[i])) {
            contains_special = true;
            break;
        }
    }
    return contains_special;
}

const uppercase_check = () => {
    let contains_uppercase = false;
    for (let i = 0; i < uppercase.length; i++) {
        if (password.value.includes(uppercase[i])) {
            contains_uppercase = true;
            break;
        }
    }
    return contains_uppercase;
}

const lowercase_check = () => {
    let contains_lowercase = false;
    for (let i = 0; i < lowercase.length; i++) {
        if (password.value.includes(lowercase[i])) {
            contains_lowercase = true;
            break;
        }
    }
    return contains_lowercase;
}

const emailValidation = () => {
    const emailVal = email.value;

    // Check if "@" is present and not at the start or end
    const atIndex = emailVal.indexOf("@");
    if (atIndex < 1 || atIndex === emailVal.length - 1) {
        document.getElementById('email-error').textContent = "Please enter a valid email address";
        return false;
    }

    // Check if "." is present after the "@" symbol and not at the end
    const dotIndex = emailVal.indexOf(".");
    if (dotIndex < atIndex + 3 || dotIndex === emailVal.length - 1) {
        document.getElementById('email-error').textContent = "Please enter a valid email address";
        return false;
    }
    return true;
}

const passwordValidation = () => {
    let errorMessages = [];

    // Length check
    if (password.value.length < 8) {
        errorMessages.push("Password should be at least 8 characters");
    } else if (password.value.length > 24) {
        errorMessages.push("Password should be less than 25 characters");
    }

    // Uppercase check
    if (!uppercase_check()) {
        errorMessages.push("Password should contain at least one uppercase letter");
    }

    // Lowercase check
    if (!lowercase_check()) {
        errorMessages.push("Password should contain at least one lowercase letter");
    }

    // Number check
    if (!number_check()) {
        errorMessages.push("Password should contain at least one number");
    }

    // Special character check
    if (!special_check()) {
        errorMessages.push("Password should contain at least one special character");
    }

    // Space character check
    if (password.value.includes(" ")) {
        errorMessages.push("Password should not contain spaces");
    }

    // Password and confirm password check
    if (password.value !== confirm_password.value) {
        errorMessages.push("Passwords do not match");
    }

    // Display error messages below the password field
    if (errorMessages.length > 0) {
        document.getElementById('password-error').textContent = errorMessages.join(', ');
        return false;
    }
    return true;
}
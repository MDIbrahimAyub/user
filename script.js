function showSignup() {
    document.getElementById('signupPage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('profilePage').style.display = 'none';
}

function showLogin() {
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('profilePage').style.display = 'none';
}

function showProfile() {
    document.getElementById('signupPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('profilePage').style.display = 'block';
}

// Initialize
showLogin();

// Handle signup
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    localStorage.setItem('user', JSON.stringify({
        name,
        email,
        password
    }));

    document.getElementById('userName').textContent = name.split(' ')[0];
    document.getElementById('successPopup').classList.add('show');
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
        loadProfile(user);
        showProfile();
    } else {
        alert('Invalid credentials');
    }
});

// Handle profile image change
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImage').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle profile form
document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically update the user data in localStorage
    alert('Profile updated successfully!');
});

function hidePopup() {
    document.getElementById('successPopup').classList.remove('show');
    showProfile();
}

function loadProfile(user) {
    const [firstName, lastName] = user.name.split(' ');
    document.getElementById('firstName').value = firstName || '';
    document.getElementById('lastName').value = lastName || '';
    document.getElementById('profileEmail').value = user.email || '';
}

function logout() {
    showLogin();
}
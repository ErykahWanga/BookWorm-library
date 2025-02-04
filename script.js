// Array of sample stories for now (this will eventually come from localStorage)
const stories = [
    { title: "The Adventure Begins", author: "Jane Doe", rating: "4.5/5", img: "assets/images/story1.jpg", link: "story-detail.html" },
    { title: "Lost in the Stars", author: "John Smith", rating: "4.8/5", img: "assets/images/story2.jpg", link: "story-detail.html" },
    { title: "The Secret Path", author: "Emily Johnson", rating: "4.7/5", img: "assets/images/story3.jpg", link: "story-detail.html" }
];

// Function to load stories dynamically
function loadStories() {
    const storyGrid = document.querySelector('.story-grid');
    storyGrid.innerHTML = '';

    stories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');
        
        storyItem.innerHTML = `
            <img src="${story.img}" alt="${story.title}">
            <h3>${story.title}</h3>
            <p>by ${story.author}</p>
            <p>Rating: ${story.rating}</p>
            <a href="${story.link}">Read More</a>
        `;
        
        storyGrid.appendChild(storyItem);
    });
}

// Function to search stories by title
function searchStories() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredStories = stories.filter(story => story.title.toLowerCase().includes(searchInput));
    
    // Update story grid with filtered results
    const storyGrid = document.querySelector('.story-grid');
    storyGrid.innerHTML = '';
    
    filteredStories.forEach(story => {
        const storyItem = document.createElement('div');
        storyItem.classList.add('story-item');
        
        storyItem.innerHTML = `
            <img src="${story.img}" alt="${story.title}">
            <h3>${story.title}</h3>
            <p>by ${story.author}</p>
            <p>Rating: ${story.rating}</p>
            <a href="${story.link}">Read More</a>
        `;
        
        storyGrid.appendChild(storyItem);
    });
}

// Initialize the page by loading all stories
document.addEventListener('DOMContentLoaded', loadStories);
// Simulating stored comments (In a real app, this would be from a database)
const comments = [];

// Handle "Post Comment"
document.getElementById('submitComment').addEventListener('click', function() {
    const commentBox = document.getElementById('commentBox');
    if (commentBox.value.trim() !== '') {
        comments.push(commentBox.value);
        commentBox.value = '';
        displayComments();
    }
});

// Display comments
function displayComments() {
    const commentList = document.getElementById('commentList');
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const p = document.createElement('p');
        p.textContent = comment;
        commentList.appendChild(p);
    });
}

// Handle Story Rating (Simplified)
document.getElementById('rateBtn').addEventListener('click', function() {
    alert('Thank you for rating!');
});

// Handle Like Button
document.getElementById('likeBtn').addEventListener('click', function() {
    alert('You liked this story!');
});
// Sign-up Form Handling
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get user input
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate fields
    if (username && email && password) {
        // Store user data in localStorage
        const userData = { username, email, password };
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to login page after successful sign-up
        alert('Sign up successful! You can now log in.');
        window.location.href = 'login.html';
    } else {
        alert('Please fill in all fields.');
    }
});

// Login Form Handling
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get user input
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Validate login credentials
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert('Login successful!');
        // Redirect to stories page after successful login
        window.location.href = 'stories.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
});


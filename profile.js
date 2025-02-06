document.addEventListener("DOMContentLoaded", function () {
    // Get logged-in user data
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Get HTML elements
    const usernameDisplay = document.getElementById("username");
    const emailDisplay = document.getElementById("email");
    const userStoriesContainer = document.getElementById("user-stories");

    // Check if user is logged in
    if (!currentUser) {
        alert("You need to log in first!");
        window.location.href = "login.html"; // Redirect to login page
        return;
    }

    // Display user details
    usernameDisplay.textContent = currentUser.username;
    emailDisplay.textContent = currentUser.email;

    // Load user's published stories
    loadUserStories(currentUser.username);
});

// Function to load stories created by the logged-in user
function loadUserStories(username) {
    const allStories = JSON.parse(localStorage.getItem("stories")) || [];
    const userStories = allStories.filter(story => story.author === username);

    const userStoriesContainer = document.getElementById("user-stories");
    userStoriesContainer.innerHTML = ""; // Clear existing content

    if (userStories.length === 0) {
        userStoriesContainer.innerHTML = "<p>No stories published yet.</p>";
        return;
    }

    userStories.forEach((story, index) => {
        const storyElement = document.createElement("div");
        storyElement.classList.add("story-card");

        storyElement.innerHTML = `
            <h3>${story.title}</h3>
            <p><strong>Category:</strong> ${story.category}</p>
            <p>${story.content.substring(0, 100)}...</p>
            <button onclick="deleteStory(${index})">Delete</button>
        `;

        userStoriesContainer.appendChild(storyElement);
    });
}

// Function to delete a story
function deleteStory(index) {
    let allStories = JSON.parse(localStorage.getItem("stories")) || [];
    const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));

    // Filter out the story to be deleted
    allStories = allStories.filter((story, i) => !(story.author === currentUser.username && i === index));

    // Save the updated stories list
    localStorage.setItem("stories", JSON.stringify(allStories));

    // Reload stories
    loadUserStories(currentUser.username);
}

// Logout function
function logout() {
    localStorage.removeItem("loggedInUser"); // Remove user session
    window.location.href = "login.html"; // Redirect to login page
}

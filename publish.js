document.addEventListener("DOMContentLoaded", function () {
    const publishForm = document.getElementById("publish-form");

    if (publishForm) {
        publishForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = document.getElementById("title").value;
            const coverImage = document.getElementById("coverImage").value;
            const content = document.getElementById("content").value;
            const user = JSON.parse(localStorage.getItem("loggedInUser"));

            if (!user) {
                alert("You need to be logged in to publish a story.");
                return;
            }

            let stories = JSON.parse(localStorage.getItem("stories")) || [];

            let newStory = {
                id: Date.now().toString(),
                title,
                coverImage,
                content,
                author: user.name
            };

            stories.push(newStory);
            localStorage.setItem("stories", JSON.stringify(stories));

            alert("Story published successfully!");
            window.location.href = "stories.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const postForm = document.getElementById("post-form");
    const postsContainer = document.getElementById("posts");
    const popularBlogsContainer = document.getElementById("popular-blogs");

    const blogs = [
        {
            title: "Fitness Tips for a Healthier Life",
            date: "2023-01-15",
            author: "Jane Doe",
            content: "Regular exercise is key to maintaining a healthy lifestyle. Aim for at least 30 minutes of moderate exercise most days of the week. Don't forget to include strength training exercises to build muscle and boost metabolism.",
            image: "img/fitness.jpg"
        },
        {
            title: "Ways to Get Taller",
            date: "2023-02-20",
            author: "John Smith",
            content: "While genetics play a major role in determining height, maintaining a balanced diet, getting enough sleep, and practicing good posture can help you maximize your growth potential.",
            image: "img/tall.jpg"
        },
        {
            title: "Proper Diet for Optimal Health",
            date: "2023-03-10",
            author: "Alice Johnson",
            content: "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains is essential for maintaining good health. Avoid processed foods and sugary drinks, and stay hydrated by drinking plenty of water.",
            image: "img/diet.jpg"
        },
        {
            title: "Building a Proper Routine",
            date: "2023-04-05",
            author: "Bob Lee",
            content: "Creating a daily routine can help you stay organized and focused. Start by setting specific goals, then break them down into manageable tasks. Prioritize your tasks and stick to a schedule to stay on track.",
            image: "img/rot.jpg"
        },
        {
            title: "Calisthenics...underated way of being fit",
            date: "2023-11-05",
            author: "John Doe",
            content: "Calisthenics athletes sometimes get scared with the thought of using weights and focus only on bodyweight exercises. Nothing bad about that but it hinders them from reaching their maximum strength and faster progress.",
            image: "img/cali.jpg"
        }
    ];

    function saveBlogs() {
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    function displayBlogs() {
        postsContainer.innerHTML = "";
        blogs.forEach(blog => {
            createPostElement(blog);
        });
    }

    function displayPopularBlogs() {
        popularBlogsContainer.innerHTML = "";
        blogs.slice(0, 3).forEach(blog => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = "#";
            link.textContent = blog.title;
            listItem.appendChild(link);
            popularBlogsContainer.appendChild(listItem);
        });
    }

    postForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const date = document.getElementById("date").value;
        const content = document.getElementById("content").value;
        const imageInput = document.getElementById("image");
        const imageFile = imageInput.files[0];

        const newBlog = { title, date, author, content, image: "" };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newBlog.image = e.target.result;
                blogs.push(newBlog);
                displayBlogs();
                displayPopularBlogs();
                postForm.reset();
            }
            reader.readAsDataURL(imageFile);
        } else {
            blogs.push(newBlog);
            saveBlogs();
            displayBlogs();
            displayPopularBlogs();
            postForm.reset();
        }
    });

    function createPostElement(blog) {
        const post = document.createElement("div");
        post.classList.add("post");

        if (blog.image) {
            const img = document.createElement("img");
            img.src = blog.image;
            post.appendChild(img);
        }

        const postDetails = document.createElement("div");
        postDetails.classList.add("post-details");

        const postTitle = document.createElement("h2");
        postTitle.textContent = blog.title;
        postDetails.appendChild(postTitle);

        const postMeta = document.createElement("p");
        postMeta.textContent = `${blog.date} by ${blog.author}`;
        postMeta.classList.add("post-meta");
        postDetails.appendChild(postMeta);

        const postContent = document.createElement("p");
        postContent.textContent = blog.content;
        postDetails.appendChild(postContent);

        post.appendChild(postDetails);
        postsContainer.appendChild(post);
    }

    displayBlogs();
    displayPopularBlogs();
});

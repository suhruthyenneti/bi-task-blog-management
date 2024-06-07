// script.js
const blogPostsSection = document.querySelector('.blog-posts');


fetch('/api/blog-posts')
    .then(response => response.json())
    .then(blogPosts => {
        blogPosts.forEach(blogPost => {
            const blogPostHTML = `
                <div class="blog-post">
                    <h2>${blogPost.title}</h2>
                    <p>${blogPost.content}</p>
                </div>
            `;
            blogPostsSection.innerHTML += blogPostHTML;
        });
    })
    .catch(error => console.error(error));
// server.js
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Connected to MongoDB');

    const db = client.db();

    const blogPostsCollection = db.collection('blog-posts');

    app.get('/api/blog-posts', (req, res) => {
        blogPostsCollection.find().toArray((err, blogPosts) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Error fetching blog posts' });
                return;
            }
            res.json(blogPosts);
        });
    });

    app.post('/api/blog-posts', (req, res) => {
        const { title, content } = req.body;
        blogPostsCollection.insertOne({ title, content }, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ message: 'Error creating blog post' });
                return;
            }
            res.json({ message: 'Blog post created successfully' });
        });
    });

    app.use(express.static('public'));

    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
});
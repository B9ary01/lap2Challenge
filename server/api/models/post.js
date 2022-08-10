const db = require ('../dbConfig');

class Post {

    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.name = data.name;
        this.post=data.post;
    }

    // get all posts
    static get all() {
        return new Promise (async (resolve, reject) => {
            try {
                const postData = await db.query(`SELECT * FROM posts;`)
                const posts = postData.rows.map(p => new Post(p))
                resolve(posts);
            } catch (err) {
                reject("Error retrieving posts")
            }
        })
    }

    //create a new post
    static create(title, name, post) {
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`INSERT INTO posts (title,name, post) VALUES ($1, $2, $3) RETURNING *;`, [ title, name, post ]);
                let newPost = new Post(postData.rows[0]);
                resolve (newPost);
            } catch (err) {
                reject('Error creating post');
            }
        });
    }




}

module.exports=Post;

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

    static findById (id) {
        return new Promise (async (resolve, reject) => {
            try {
                let postData = await db.query(`SELECT * FROM posts WHERE id = $1;`, [ id ]); 
                let post = new Post(postData.rows[0]);
                resolve (post);
            } catch (err) {
                reject('Owner not found');
            }
        });
    }



    //delete post
    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query('DELETE FROM posts WHERE id = $1;', [ this.id ]);
                const post = await Post.findById(result.rows[0]);
                
                post.destroy();
                resolve('Post was deleted')
 
            } catch (err) {
                reject('Post could not be deleted')
            }
        })
    }




}

module.exports=Post;

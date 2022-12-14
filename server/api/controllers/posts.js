
const Post = require('../models/post')


async function index (req, res) {
    try {
        const posts = await Post.all;
        
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({err})
    }
}

async function create (req, res) {
    try {
        const post = await Post.create(req.body.title, req.body.name, req.body.post);
        res.status(201).json(post);
    
    } catch (err) {
        res.status(422).json({err})
    }
}


async function destroy (req, res) {
    try {
       
        const post = await Post.findById(parseInt(req.params.id))
        await post.destroy();

        res.status(204).end();
    } catch (err) {
        res.status(404).json({err});
    };
}


module.exports = { index, create , destroy}



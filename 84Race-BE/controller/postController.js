const Post = require('../models/index').Post;

exports.getAllPost = async (req, res) => {
    const { page = 1, limit = 7 } = req.query;
    const offset = (page - 1) * limit;
    try {   
        const posts = await Post.findAll({
            limit: parseInt(limit),
            offset: parseInt(offset)
        });
        const totalItems = await Post.count();
        const totalPages = Math.ceil(totalItems / limit);
        res.status(200).json({
            data: posts,
            pagination: { totalItems, totalPages, currentPage: parseInt(page) }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createPost = async (req, res) => {
    try {           
        const post = await Post.create(req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getPostById = async(req,res) =>{
    const postId = req.params.id;
    try{
        const post = await Post.findByPk(postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


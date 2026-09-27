const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const verifyAdmin = require('../middleware/authMiddleware');

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});
const upload = multer({ storage: multer.memoryStorage() });

// 1. UPLOAD PDF TO CLOUDINARY (Protected)
router.post('/upload-pdf', verifyAdmin, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, { resource_type: "auto", folder: "sarkari_pdfs" });
    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: 'PDF Upload failed' });
  }
});

// 2. CREATE POST (Protected)
router.post('/add', verifyAdmin, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json({ success: true, data: savedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating post', error: error.message });
  }
});

// 3. GET ALL POSTS (Public)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching posts' });
  }
});

// 4. SEARCH POSTS (Public)
router.get('/search/query', async (req, res) => {
  try {
    const keyword = req.query.q || '';
    const posts = await Post.find({
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { shortInformation: { $regex: keyword, $options: 'i' } }]
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Search error' });
  }
});

// 5. GET SINGLE POST BY ID (Protected - For Edit Form)
router.get('/admin/:id', verifyAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching post' });
  }
});

// 6. UPDATE POST (Protected)
router.put('/update/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating post' });
  }
});

// 7. DELETE POST (Protected)
router.delete('/delete/:id', verifyAdmin, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, message: 'Post deleted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting post' });
  }
});

// 8. GET SINGLE POST BY SLUG (Public - Detailed Page)
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching post' });
  }
});

module.exports = router;
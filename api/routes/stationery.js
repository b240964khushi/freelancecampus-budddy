import express from 'express';
import Stationery from '../models/Stationery.js';

const router = express.Router();

// POST /api/stationery - Create a new stationery item
router.post('/', async (req, res) => {
  try {
    const { title, category, condition, description, whatsappNumber } = req.body;

    if (!title || !category || !condition || !description || !whatsappNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const stationery = new Stationery({
      title,
      category,
      condition,
      description,
      whatsappNumber,
    });

    await stationery.save();
    res.status(201).json(stationery);
  } catch (error) {
    console.error('Error creating stationery:', error);
    res.status(500).json({ error: 'Failed to create stationery item' });
  }
});

// GET /api/stationery - Fetch all stationery items (newest first)
router.get('/', async (req, res) => {
  try {
    const items = await Stationery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching stationery:', error);
    res.status(500).json({ error: 'Failed to fetch stationery items' });
  }
});

export default router;

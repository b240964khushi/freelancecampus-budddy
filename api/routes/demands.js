import express from 'express';
import Demand from '../models/Demand.js';

const router = express.Router();

// POST /api/demands - Create a new demand request
router.post('/', async (req, res) => {
  try {
    const { itemName, category, description, whatsappNumber } = req.body;

    if (!itemName || !category || !description || !whatsappNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const demand = new Demand({
      itemName,
      category,
      description,
      whatsappNumber,
    });

    await demand.save();
    res.status(201).json(demand);
  } catch (error) {
    console.error('Error creating demand:', error);
    res.status(500).json({ error: 'Failed to create demand request' });
  }
});

// GET /api/demands - Fetch all demands (newest first)
router.get('/', async (req, res) => {
  try {
    const demands = await Demand.find().sort({ createdAt: -1 });
    res.status(200).json(demands);
  } catch (error) {
    console.error('Error fetching demands:', error);
    res.status(500).json({ error: 'Failed to fetch demands' });
  }
});

export default router;

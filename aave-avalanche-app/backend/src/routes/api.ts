import express from 'express';
import { AaveService } from '../services/aave.service';
import { ethers } from 'ethers';

const router = express.Router();
const aaveService = new AaveService();

// Middleware to validate Ethereum addresses
const validateAddress = (req: any, res: any, next: any) => {
  const { address } = req.params;
  if (!ethers.utils.isAddress(address)) {
    return res.status(400).json({ error: 'Invalid Ethereum address' });
  }
  next();
};

// Get all markets data
router.get('/markets', async (req, res) => {
  try {
    const markets = await aaveService.getMarketsData();
    res.json(markets);
  } catch (error: any) {
    console.error('Error in /markets:', error);
    res.status(500).json({ 
      error: 'Failed to fetch markets data',
      details: error.message 
    });
  }
});

// Get user position
router.get('/user/:address', validateAddress, async (req, res) => {
  try {
    const position = await aaveService.getUserPosition(req.params.address);
    res.json(position);
  } catch (error: any) {
    console.error('Error in /user/:address:', error);
    res.status(500).json({ 
      error: 'Failed to fetch user position',
      details: error.message 
    });
  }
});

// Get token price in USD
router.get('/price/:tokenAddress', async (req, res) => {
  try {
    const { tokenAddress } = req.params;
    if (!ethers.utils.isAddress(tokenAddress)) {
      return res.status(400).json({ error: 'Invalid token address' });
    }
    
    const price = await aaveService.getTokenPriceInUSD(tokenAddress);
    res.json({ tokenAddress, price });
  } catch (error: any) {
    console.error('Error in /price/:tokenAddress:', error);
    res.status(500).json({ 
      error: 'Failed to fetch token price',
      details: error.message 
    });
  }
});

export default router;

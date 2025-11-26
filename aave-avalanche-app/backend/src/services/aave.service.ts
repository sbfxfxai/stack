import { ethers } from 'ethers';
import { 
  AAVE_AVALANCHE_ADDRESSES, 
  TOKEN_ADDRESSES, 
  RPC_URL 
} from '../config/constants';
import { AaveProtocolDataProvider__factory } from '@aave/protocol-v2/typechain/factories/AaveProtocolDataProvider__factory';
import { LendingPool__factory } from '@aave/protocol-v2/typechain/factories/LendingPool__factory';

export class AaveService {
  private provider: ethers.providers.JsonRpcProvider;
  private dataProvider: any; // Using any to avoid type issues with ABI

  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    this.dataProvider = AaveProtocolDataProvider__factory.connect(
      AAVE_AVALANCHE_ADDRESSES.AAVE_PROTOCOL_DATA_PROVIDER,
      this.provider
    );
  }

  async getMarketsData() {
    try {
      const reservesList = await this.dataProvider.getAllReservesTokens();
      const reservesData = [];
      
      for (const reserve of reservesList) {
        try {
          const reserveData = await this.dataProvider.getReserveData(reserve.tokenAddress);
          reservesData.push({
            symbol: reserve.symbol,
            address: reserve.tokenAddress,
            ...reserveData,
          });
        } catch (error) {
          console.error(`Error fetching data for ${reserve.symbol}:`, error);
        }
      }
      
      return reservesData;
    } catch (error) {
      console.error('Error in getMarketsData:', error);
      throw error;
    }
  }

  async getUserPosition(userAddress: string) {
    try {
      if (!ethers.utils.isAddress(userAddress)) {
        throw new Error('Invalid Ethereum address');
      }

      const reservesList = await this.dataProvider.getAllReservesTokens();
      const userReserves = [];
      
      for (const reserve of reservesList) {
        try {
          const userReserveData = await this.dataProvider.getUserReserveData(
            reserve.tokenAddress,
            userAddress
          );
          
          userReserves.push({
            symbol: reserve.symbol,
            address: reserve.tokenAddress,
            ...userReserveData,
          });
        } catch (error) {
          console.error(`Error fetching user data for ${reserve.symbol}:`, error);
        }
      }
      
      return userReserves;
    } catch (error) {
      console.error('Error in getUserPosition:', error);
      throw error;
    }
  }

  async getTokenPriceInUSD(tokenAddress: string): Promise<number> {
    // This is a simplified example - in a real app, you'd use a price oracle
    // For now, we'll return mock prices
    const prices: {[key: string]: number} = {
      [TOKEN_ADDRESSES.AVAX]: 80, // Example price in USD
      [TOKEN_ADDRESSES.USDC]: 1,
      [TOKEN_ADDRESSES.WBTC]: 30000,
      [TOKEN_ADDRESSES.WETH]: 2000,
    };
    
    return prices[tokenAddress.toLowerCase()] || 0;
  }
}

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { RefreshCcw, LogOut, Wallet, Loader, AlertTriangle } from 'lucide-react';

const FASTAPI_ENDPOINT_URL = 'https://your-live-fastapi-backend.vercel.app'; // Updated deployment
const APP_NAME = 'Aave Avalanche Live Dashboard';
const CHAIN_ID = 43114;

const formatBigNumber = (value) => {
  if (!value) return 'N/A';
  try {
    return parseFloat(ethers.utils.formatEther(value)).toFixed(4);
  } catch (e) {
    return value;
  }
};

const WalletPage = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isUnsupportedChain, setIsUnsupportedChain] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserPosition = async (userAddress) => {
    if (!userAddress) return;

    setIsLoading(true);
    setError(null);
    setUserPosition(null);

    try {
      console.log(`Fetching live data for: ${userAddress} from: ${FASTAPI_ENDPOINT_URL}`);
      const response = await fetch(`${FASTAPI_ENDPOINT_URL}/api/aave/v3/user-position?address=${userAddress}`);
      if (!response.ok) {
        throw new Error(`FastAPI Server Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const summary = data.summary || {};
      setUserPosition({
        totalLiquidityETH: summary.totalCollateralBase,
        totalCollateralETH: summary.totalCollateralBase,
        totalBorrowsETH: summary.totalDebtBase,
        availableBorrowsETH: summary.availableBorrowsBase,
        healthFactor: summary.healthFactor,
      });
    } catch (err) {
      console.error('Error fetching live Aave data:', err);
      setError(`Failed to fetch data: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected && !isUnsupportedChain && walletAddress) {
      fetchUserPosition(walletAddress);
    } else if (!isConnected) {
      setUserPosition(null);
    }
  }, [isConnected, walletAddress, isUnsupportedChain]);

  const ConnectButton = () => (
    <button
      onClick={() => {
        if (window.ethereum && window.ethereum.isTrust) {
          window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            setIsUnsupportedChain(false);
          }).catch(err => setError(err.message));
        } else {
          setError('Trust Wallet not detected. Please install Trust Wallet and refresh.');
        }
      }}
      className="flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
    >
      <Wallet size={20} />
      <span>Connect Trust Wallet</span>
    </button>
  );

  const UserDetails = () => (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-sm font-medium text-gray-700 truncate mb-2 sm:mb-0">
        <span className="text-indigo-600">Connected Address:</span> {walletAddress}
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => fetchUserPosition(walletAddress)}
          disabled={isLoading}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition duration-150 disabled:opacity-50"
        >
          {isLoading ? <Loader size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
          <span>Refresh</span>
        </button>
        <button
          onClick={() => {
            setWalletAddress('');
            setIsConnected(false);
            setIsUnsupportedChain(false);
            setUserPosition(null);
          }}
          className="flex items-center space-x-1 px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition duration-150"
        >
          <LogOut size={16} />
          <span>Disconnect</span>
        </button>
      </div>
    </div>
  );

  const PositionCard = ({ title, value, unit, isPrimary = false }) => (
    <div
      className={`p-5 rounded-xl shadow-md ${isPrimary ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'} border transition duration-300 hover:shadow-lg`}
    >
      <p className={`text-sm font-semibold ${isPrimary ? 'text-indigo-600' : 'text-gray-500'} mb-1`}>{title}</p>
      <p className="text-3xl font-bold text-gray-900">
        {formatBigNumber(value)}
        <span className="text-lg font-medium text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex items-start justify-center">
      <div className="w-full max-w-4xl">
        <header className="text-center py-6">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">{APP_NAME}</h1>
          <p className="text-md text-gray-500">Live Aave V3 Balances from Avalanche Chain ID: {CHAIN_ID}</p>
        </header>

        <main className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-6">
              <h2 className="text-xl font-semibold text-gray-700">Connect your wallet to see live data</h2>
              <ConnectButton />
              <p className="text-sm text-gray-400">Powered by Trust Wallet and your live FastAPI backend.</p>
            </div>
          ) : (
            <>
              <UserDetails />
              {isUnsupportedChain && (
                <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg flex items-center space-x-2">
                  <AlertTriangle size={20} />
                  <span>Wallet connected to unsupported chain. Please switch to Avalanche (Chain ID {CHAIN_ID}).</span>
                </div>
              )}

              {isLoading && !userPosition && (
                <div className="text-center p-10 flex flex-col items-center space-y-4">
                  <Loader size={32} className="text-indigo-500 animate-spin" />
                  <p className="text-lg text-gray-600">Fetching live Aave position from FastAPI...</p>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">
                  <p className="font-semibold">Error:</p>
                  <p>{error}</p>
                  <p className="text-sm mt-1">Check your console and ensure your FastAPI endpoint is running and accessible at: {FASTAPI_ENDPOINT_URL}</p>
                </div>
              )}

              {userPosition && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PositionCard title="Total Liquidity (Deposit)" value={userPosition.totalLiquidityETH} unit="ETH" isPrimary />
                  <PositionCard title="Total Collateral" value={userPosition.totalCollateralETH} unit="ETH" />
                  <PositionCard title="Total Borrows" value={userPosition.totalBorrowsETH} unit="ETH" />
                  <PositionCard title="Available Borrow Base" value={userPosition.availableBorrowsETH} unit="ETH" />
                  <PositionCard title="Health Factor" value={userPosition.healthFactor} unit="" />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default WalletPage;

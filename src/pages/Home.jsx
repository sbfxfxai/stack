import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, BarChart3, Shield, TrendingUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const Home = () => {
  return (
    <PageLayout>
      <div className="dashboard-container">
        <div className="dashboard-inner">
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                Stackbank
                <span className="block text-indigo-600">Aave Avalanche Dashboard</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Live DeFi position tracking on Avalanche mainnet. Connect your wallet to view real-time Aave V3 balances, health factors, and borrowing power.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/wallet"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    <Wallet size={20} className="mr-2" />
                    Connect Wallet
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    to="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    <BarChart3 size={20} className="mr-2" />
                    View Dashboard
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Wallet className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Trust Wallet Integration</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Secure wallet connection with Trust Wallet. Your private keys never leave your device.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <Shield className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Aave V3 Protocol</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Direct integration with Aave V3 on Avalanche mainnet for real-time position data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <div className="flow-root bg-white rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Live Data</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Real-time health factors, collateral, and borrowing power updated instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;

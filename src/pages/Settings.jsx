import React from 'react';
import { Settings as SettingsIcon, Globe, Shield, Bell } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your application preferences</p>
        </div>

        <div className="space-y-6">
          {/* Network Settings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-indigo-600" />
                Network Settings
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Configure blockchain network preferences
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Network</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Avalanche Mainnet (43114)</option>
                    <option>Ethereum Mainnet (1)</option>
                    <option>Polygon (137)</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="auto-switch-network"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="auto-switch-network" className="ml-2 block text-sm text-gray-900">
                    Automatically switch to required network
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2 text-indigo-600" />
                Security
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Security and privacy preferences
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="show-balance"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="show-balance" className="ml-2 block text-sm text-gray-900">
                    Show balance on dashboard
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="hide-sensitive"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hide-sensitive" className="ml-2 block text-sm text-gray-900">
                    Hide sensitive data when sharing screen
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Slippage Tolerance</label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>0.1%</option>
                    <option>0.5%</option>
                    <option>1.0%</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-indigo-600" />
                Notifications
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Configure notification preferences
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="health-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="health-alerts" className="ml-2 block text-sm text-gray-900">
                    Health factor alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="price-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="price-alerts" className="ml-2 block text-sm text-gray-900">
                    Price change notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="liquidation-alerts"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="liquidation-alerts" className="ml-2 block text-sm text-gray-900">
                    Liquidation risk warnings
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">About</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Application information
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Version</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">1.0.0</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Network</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Avalanche Mainnet</dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Protocol</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Aave V3</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

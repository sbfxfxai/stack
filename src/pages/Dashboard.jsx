import React from 'react';
import { BarChart3, TrendingUp, Shield, AlertTriangle } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const Dashboard = () => {
  return (
    <PageLayout>
      <div className="dashboard-container">
        <div className="dashboard-inner">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Overview of your DeFi positions and market data</p>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-header">
                <div className="card-icon">
                  <BarChart3 />
                </div>
                <div>
                  <div className="card-title">Total Portfolio Value</div>
                  <div className="card-value">$0.00</div>
                </div>
              </div>
              <div className="card-footer">
                <a href="#" className="card-link">
                  View all positions →
                </a>
              </div>
            </div>

            <div className="dashboard-card health-factor">
              <div className="card-header">
                <div className="card-icon">
                  <Shield />
                </div>
                <div>
                  <div className="card-title">Health Factor</div>
                  <div className="card-value">0.00</div>
                </div>
              </div>
              <div className="card-footer">
                <p className="card-description">
                  Above 1.0 is safe. Below 1.0 is subject to liquidation.
                </p>
              </div>
            </div>
          </div>

          <div className="markets-section">
            <div className="dashboard-card">
              <div className="markets-header">
                <h3 className="markets-title">Markets</h3>
                <p className="markets-subtitle">Available Aave V3 markets on Avalanche</p>
              </div>
              <ul className="markets-list">
                <li className="market-item">
                  <div className="market-content">
                    <div className="market-info">
                      <div className="market-icon avax">AVAX</div>
                      <div className="market-details">
                        <h4>Avalanche</h4>
                        <div className="market-rates">Deposit APY: – | Variable APY: –</div>
                      </div>
                    </div>
                    <button className="supply-button">Supply</button>
                  </div>
                </li>
                <li className="market-item">
                  <div className="market-content">
                    <div className="market-info">
                      <div className="market-icon usdc">USDC</div>
                      <div className="market-details">
                        <h4>USD Coin</h4>
                        <div className="market-rates">Deposit APY: – | Variable APY: –</div>
                      </div>
                    </div>
                    <button className="supply-button">Supply</button>
                  </div>
                </li>
                <li className="market-item">
                  <div className="market-content">
                    <div className="market-info">
                      <div className="market-icon weth">WETH</div>
                      <div className="market-details">
                        <h4>Wrapped Ether</h4>
                        <div className="market-rates">Deposit APY: – | Variable APY: –</div>
                      </div>
                    </div>
                    <button className="supply-button">Supply</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="alert-banner">
            <div className="alert-icon">
              <AlertTriangle />
            </div>
            <p className="alert-message">
              Connect your wallet to view your actual positions and live data. This dashboard shows placeholder market information.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;

import React from 'react';
import { Settings as SettingsIcon, Globe, Shield, Bell } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const SettingsPage = () => {
  return (
    <PageLayout>
      <div className="dashboard-container">
        <div className="dashboard-inner">
        <div className="settings-container">
          <div className="settings-inner">
            <div className="settings-header">
              <h1>Settings</h1>
              <p>Manage your application preferences</p>
            </div>

            <div className="settings-grid">
              <div className="settings-card network-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">
                    <Globe className="settings-card-icon" />
                    Network Settings
                  </h3>
                  <p className="settings-card-subtitle">Configure blockchain network preferences</p>
                </div>
                <div className="settings-card-content">
                  <div className="settings-form-group">
                    <label className="settings-label">Default Network</label>
                    <select className="settings-select">
                      <option>Avalanche Mainnet (43114)</option>
                      <option>Ethereum Mainnet (1)</option>
                      <option>Polygon (137)</option>
                    </select>
                  </div>
                  <div className="settings-checkbox">
                    <input id="auto-switch-network" type="checkbox" className="settings-checkbox-input" />
                    <label htmlFor="auto-switch-network" className="settings-checkbox-label">
                      Automatically switch to required network
                    </label>
                  </div>
                </div>
              </div>

              <div className="settings-card security-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">
                    <SettingsIcon className="settings-card-icon" />
                    Security
                  </h3>
                  <p className="settings-card-subtitle">Security and privacy preferences</p>
                </div>
                <div className="settings-card-content">
                  <div className="settings-checkbox">
                    <input id="show-balance" type="checkbox" defaultChecked className="settings-checkbox-input" />
                    <label htmlFor="show-balance" className="settings-checkbox-label">
                      Show balance on dashboard
                    </label>
                  </div>
                  <div className="settings-checkbox">
                    <input id="hide-sensitive" type="checkbox" className="settings-checkbox-input" />
                    <label htmlFor="hide-sensitive" className="settings-checkbox-label">
                      Hide sensitive data when sharing screen
                    </label>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-label">Default Slippage Tolerance</label>
                    <select className="settings-select">
                      <option>0.1%</option>
                      <option>0.5%</option>
                      <option>1.0%</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="settings-card notifications-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">
                    <Bell className="settings-card-icon" />
                    Notifications
                  </h3>
                  <p className="settings-card-subtitle">Configure notification preferences</p>
                </div>
                <div className="settings-card-content">
                  {[
                    { id: 'health-alerts', label: 'Health factor alerts', defaultChecked: true },
                    { id: 'price-alerts', label: 'Price change notifications' },
                    { id: 'liquidation-alerts', label: 'Liquidation risk warnings', defaultChecked: true },
                  ].map(({ id, label, defaultChecked }) => (
                    <div key={id} className="settings-checkbox">
                      <input id={id} type="checkbox" className="settings-checkbox-input" defaultChecked={defaultChecked} />
                      <label htmlFor={id} className="settings-checkbox-label">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-header">
                  <h3 className="settings-card-title">About</h3>
                  <p className="settings-card-subtitle">Application information</p>
                </div>
                <div className="settings-card-content">
                  <dl className="about-list">
                    {[
                      { term: 'Version', definition: '1.0.0' },
                      { term: 'Network', definition: 'Avalanche Mainnet' },
                      { term: 'Protocol', definition: 'Aave V3' },
                    ].map(({ term, definition }) => (
                      <div key={term} className="about-item">
                        <dt className="about-term">{term}</dt>
                        <dd className="about-definition">{definition}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SettingsPage;

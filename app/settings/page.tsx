'use client'

import { useState } from 'react'
import { Save, Bell, RefreshCw, Shield, User, Database, Globe, Palette, Download, Upload } from 'lucide-react'

export default function SettingsPage() {
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState('5')
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false
  })
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('en')

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-3">Settings</h1>
          <p className="text-lg text-gray-400">Configure your dashboard preferences and system settings</p>
        </div>
        <button onClick={handleSave} className="btn btn-primary">
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Auto-Refresh Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="icon-container bg-blue-600">
              <RefreshCw size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Auto-Refresh</h3>
              <p className="text-gray-400">Configure automatic data refresh intervals</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable Auto-Refresh</p>
                <p className="text-gray-400 text-sm">Automatically refresh dashboard data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#404040] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffe400] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffe400]"></div>
              </label>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Refresh Interval</label>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(e.target.value)}
                disabled={!autoRefresh}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 border border-[#505050] focus:outline-none focus:ring-2 focus:ring-[#ffe400] disabled:opacity-50"
              >
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="icon-container bg-yellow-600">
              <Bell size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Notifications</h3>
              <p className="text-gray-400">Manage your notification preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-gray-400 text-sm">Receive alerts via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#404040] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffe400] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffe400]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-gray-400 text-sm">Receive browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#404040] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffe400] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffe400]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">SMS Notifications</p>
                <p className="text-gray-400 text-sm">Receive alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#404040] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffe400] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ffe400]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="icon-container bg-purple-600">
              <Palette size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Appearance</h3>
              <p className="text-gray-400">Customize your dashboard appearance</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 border border-[#505050] focus:outline-none focus:ring-2 focus:ring-[#ffe400]"
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm font-medium bg-[#404040] text-gray-300 border border-[#505050] focus:outline-none focus:ring-2 focus:ring-[#ffe400]"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="zh">Chinese</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="icon-container bg-green-600">
              <Database size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Data Management</h3>
              <p className="text-gray-400">Import, export, and manage your data</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full btn btn-secondary">
              <Download size={18} className="mr-2" />
              Export All Data
            </button>
            <button className="w-full btn btn-secondary">
              <Upload size={18} className="mr-2" />
              Import Data
            </button>
            <button className="w-full btn btn-outline">
              <RefreshCw size={18} className="mr-2" />
              Sync with External Systems
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="icon-container bg-red-600">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Security</h3>
              <p className="text-gray-400">Manage your account security settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full btn btn-secondary">
              <User size={18} className="mr-2" />
              Change Password
            </button>
            <button className="w-full btn btn-secondary">
              <Shield size={18} className="mr-2" />
              Two-Factor Authentication
            </button>
            <button className="w-full btn btn-outline">
              <Globe size={18} className="mr-2" />
              Session Management
            </button>
          </div>
        </div>

        {/* System Information */}
        <div className="card">
          <div className="flex items-center gap-4 mb-6">
            <div className="icon-container bg-gray-600">
              <Database size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">System Info</h3>
              <p className="text-gray-400">Current system status and information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Version</span>
              <span className="text-white font-medium">v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Updated</span>
              <span className="text-white font-medium">2024-06-15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Database Status</span>
              <span className="text-green-400 font-medium">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">API Status</span>
              <span className="text-green-400 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
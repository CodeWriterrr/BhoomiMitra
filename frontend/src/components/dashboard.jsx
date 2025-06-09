import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { 
  Sprout, 
  CloudRain, 
  MessageSquare, 
  Camera, 
  ShoppingCart, 
  BarChart3, 
  Bell, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Calendar, 
  Thermometer, 
  Droplets 
} from "lucide-react"

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState(null)
  const navigate = useNavigate();



const handleQuickAction = (action) => {
  setActiveSection(`Navigating to ${action}...`);
  setTimeout(() => {
    setActiveSection(null);
    navigate('/predict');
  }, 2000);
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">BhoomiMitra</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                NS
              </div>
              <span className="text-sm font-medium text-gray-700">Nitin Saini</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Nitin!</h1>
          <p className="text-gray-600">Here's what's happening with your farm today.</p>
          {activeSection && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
              {activeSection}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Season Yield</p>
                <p className="text-2xl font-bold text-green-600">2.4 tons/ha</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% from last season
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weather Risk</p>
                <p className="text-2xl font-bold text-yellow-600">Medium</p>
                <p className="text-xs text-gray-500">Next 7 days</p>
              </div>
              <CloudRain className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-xs text-red-600">Requires attention</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Farm Health</p>
                <p className="text-2xl font-bold text-green-600">Good</p>
                <p className="text-xs text-green-600">85% optimal</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Weather */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-600" />
                  Bareilly, Uttar Pradesh
                </h3>
                <p className="text-sm text-gray-600 mt-1">Current weather conditions</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Thermometer className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">28°C</p>
                    <p className="text-sm text-gray-600">Temperature</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">65%</p>
                    <p className="text-sm text-gray-600">Humidity</p>
                  </div>
                  <div className="text-center">
                    <CloudRain className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold">12mm</p>
                    <p className="text-sm text-gray-600">Rainfall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Crop Predictions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold" >Crop Yield Predictions</h3>
                <p className="text-sm text-gray-600 mt-1">AI-powered forecasts for your current crops</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Wheat</span>
                      <span className="text-sm text-gray-600">Expected: 3.2 tons/ha</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Excellent conditions</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Rice</span>
                      <span className="text-sm text-gray-600">Expected: 2.8 tons/ha</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">Monitor water levels</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Sugarcane</span>
                      <span className="text-sm text-gray-600">Expected: 65 tons/ha</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                    <p className="text-xs text-orange-600 mt-1">Pest risk detected</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Alerts</h3>
                <p className="text-sm text-gray-600 mt-1">Important notifications for your farm</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-800">High Pest Risk</p>
                      <p className="text-sm text-red-600">Brown plant hopper detected in rice fields</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <CloudRain className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800">Weather Warning</p>
                      <p className="text-sm text-yellow-600">Heavy rainfall expected in next 48 hours</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-800">Optimal Planting Time</p>
                      <p className="text-sm text-green-600">Perfect conditions for wheat sowing</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <p className="text-sm text-gray-600 mt-1">Access key features</p>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  
                  onClick={() => handleQuickAction('Crop Prediction')}
                  className="w-full flex items-center justify-start px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="h-4 w-4 mr-2 text-gray-600" />
                  Crop Prediction
                </button>
                <button 
                  onClick={() => handleQuickAction('Weather Alerts')}
                  className="w-full flex items-center justify-start px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <CloudRain className="h-4 w-4 mr-2 text-gray-600" />
                  Weather Alerts
                </button>
                <button 
                  onClick={() => handleQuickAction('Disease Detection')}
                  className="w-full flex items-center justify-start px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Camera className="h-4 w-4 mr-2 text-gray-600" />
                  Disease Detection
                </button>
                <button 
                  onClick={() => handleQuickAction('AI Assistant')}
                  className="w-full flex items-center justify-start px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 mr-2 text-gray-600" />
                  AI Assistant
                </button>
                <button 
                  onClick={() => handleQuickAction('Marketplace')}
                  className="w-full flex items-center justify-start px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ShoppingCart className="h-4 w-4 mr-2 text-gray-600" />
                  Marketplace
                </button>
              </div>
            </div>

            {/* Market Prices */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Market Prices</h3>
                <p className="text-sm text-gray-600 mt-1">Today's rates in your area</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Wheat</span>
                    <div className="text-right">
                      <p className="font-bold">₹2,150/quintal</p>
                      <p className="text-xs text-green-600">+2.5%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Rice</span>
                    <div className="text-right">
                      <p className="font-bold">₹1,850/quintal</p>
                      <p className="text-xs text-red-600">-1.2%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sugarcane</span>
                    <div className="text-right">
                      <p className="font-bold">₹350/quintal</p>
                      <p className="text-xs text-gray-600">0%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
                <p className="text-sm text-gray-600 mt-1">Recommended actions</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Apply fertilizer to wheat</p>
                      <p className="text-xs text-gray-600">Due in 2 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Harvest rice crop</p>
                      <p className="text-xs text-gray-600">Due in 5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-orange-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">Pest control treatment</p>
                      <p className="text-xs text-gray-600">Due in 1 week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
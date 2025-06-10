import React, { useState } from 'react';
import { Leaf, MapPin, Calendar, BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const CropYieldPredictor = () => {
  const [formData, setFormData] = useState({
    crop: '',
    state: '',
    district: '',
    season: '',
    area: 1
  });
  
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Reference yield data for display
  const cropYields = {
    'Rice': { min: 15, max: 45, avg: 30, color: 'bg-green-500' },
    'Wheat': { min: 20, max: 50, avg: 35, color: 'bg-yellow-500' },
    'Maize': { min: 20, max: 60, avg: 40, color: 'bg-orange-500' },
    'Sugarcane': { min: 300, max: 600, avg: 350, color: 'bg-purple-500' },
    'Cotton': { min: 5, max: 20, avg: 12, color: 'bg-blue-500' },
    'Soybean': { min: 8, max: 25, avg: 16, color: 'bg-indigo-500' },
    'Groundnut': { min: 10, max: 30, avg: 20, color: 'bg-red-500' },
    'Potato': { min: 100, max: 300, avg: 200, color: 'bg-pink-500' },
    'Onion': { min: 80, max: 250, avg: 165, color: 'bg-cyan-500' },
    'Tomato': { min: 150, max: 400, avg: 275, color: 'bg-rose-500' }
  };

  const states = [
    'Punjab', 'Haryana', 'Uttar Pradesh', 'West Bengal', 'Andhra Pradesh',
    'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Gujarat', 'Rajasthan',
    'Bihar', 'Odisha', 'Madhya Pradesh', 'Chhattisgarh', 'Jharkhand'
  ];

  const seasons = ['Kharif', 'Rabi', 'Summer', 'Whole Year'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Call backend for prediction
  const calculatePrediction = async () => {
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: formData.crop,
          state: formData.state,
          district: formData.district,
          season: formData.season,
          area: formData.area
        })
      });
      const data = await response.json();

      if (data.error) {
        setPrediction({ error: data.error });
      } else {
        // Find crop reference info
        const cropData = cropYields[formData.crop] || { min: 0, max: 0, color: 'bg-gray-400' };
        setPrediction({
          crop: formData.crop,
          state: formData.state,
          season: formData.season,
          area: parseFloat(formData.area),
          yieldPerHectare: data.predicted_production,
          totalProduction: data.predicted_production * parseFloat(formData.area),
          minYield: cropData.min,
          maxYield: cropData.max,
          isRealistic: data.predicted_production >= cropData.min && data.predicted_production <= cropData.max * 1.2,
          color: cropData.color
        });
      }
    } catch (err) {
      setPrediction({ error: 'Failed to connect to backend.' });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="text-green-600 mr-3" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">Crop Yield Predictor</h1>
          </div>
          <p className="text-gray-600 text-lg">Predict crop yields in quintals per hectare</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="mr-2 text-blue-600" size={24} />
              Prediction Parameters
            </h2>
            
            <div className="space-y-4">
              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Leaf className="inline mr-1" size={16} />
                  Crop Type
                </label>
                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Crop</option>
                  {Object.keys(cropYields).map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline mr-1" size={16} />
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* District Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="Enter district name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Season Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-1" size={16} />
                  Season
                </label>
                <select
                  name="season"
                  value={formData.season}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Season</option>
                  {seasons.map(season => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>

              {/* Area Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area (Hectares)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  min="0.1"
                  step="0.1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Predict Button */}
              <button
                onClick={calculatePrediction}
                disabled={loading || !formData.crop || !formData.state || !formData.season}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2" size={20} />
                    Predict Yield
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <BarChart3 className="mr-2 text-green-600" size={24} />
              Prediction Results
            </h2>

            {!prediction && (
              <div className="text-center py-12">
                <Leaf className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">Fill in the parameters and click "Predict Yield" to see results</p>
              </div>
            )}

            {prediction && prediction.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="text-red-500 mr-3" size={24} />
                <p className="text-red-700">{prediction.error}</p>
              </div>
            )}

            {prediction && !prediction.error && (
              <div className="space-y-6">
                {/* Main Yield Result */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    {prediction.isRealistic ? (
                      <CheckCircle className="text-green-500 mr-2" size={24} />
                    ) : (
                      <AlertCircle className="text-yellow-500 mr-2" size={24} />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">Predicted Yield</h3>
                  </div>
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {prediction.yieldPerHectare.toFixed(1)}
                  </div>
                  <div className="text-xl text-gray-600 mb-4">
                    quintals per hectare
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full text-white text-sm font-medium ${prediction.color}`}>
                    {prediction.crop}
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Total Production</h4>
                    <p className="text-2xl font-bold text-gray-800">{prediction.totalProduction.toFixed(1)}</p>
                    <p className="text-sm text-gray-600">quintals ({prediction.area} hectares)</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Yield Range</h4>
                    <p className="text-lg font-bold text-gray-800">{prediction.minYield} - {prediction.maxYield}</p>
                    <p className="text-sm text-gray-600">quintals/hectare</p>
                  </div>
                </div>

                {/* Location Info */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                    <MapPin className="mr-2" size={16} />
                    Location Details
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="font-medium">State:</span> {prediction.state}</div>
                    <div><span className="font-medium">Season:</span> {prediction.season}</div>
                    <div><span className="font-medium">Area:</span> {prediction.area} hectares</div>
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        prediction.isRealistic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prediction.isRealistic ? 'Realistic' : 'Check Parameters'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Yield Comparison Bar */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Yield Comparison</h4>
                  <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${prediction.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: `${Math.min((prediction.yieldPerHectare / prediction.maxYield) * 100, 100)}%` 
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-medium text-gray-700">
                      <span>{prediction.minYield}</span>
                      <span>{prediction.maxYield}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Minimum</span>
                    <span>Maximum</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Crop Information Cards */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Crop Yield Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(cropYields).map(([crop, data]) => (
              <div key={crop} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${data.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <Leaf className="text-white" size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{crop}</h4>
                <p className="text-sm text-gray-600">{data.min}-{data.max}</p>
                <p className="text-xs text-gray-500">quintals/hectare</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropYieldPredictor;
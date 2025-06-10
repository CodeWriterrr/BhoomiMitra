import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  AlertTriangle, 
  Thermometer, 
  Wind, 
  Eye, 
  Droplets,
  Sun,
  Cloud,
  CloudSnow,
  Zap,
  RefreshCw,
  MapPin,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const WeatherAlertDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Bareilly, UP');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  

const fetchWeatherData = async () => {
  setLoading(true);
  try {
    const city = selectedLocation.split(',')[0]; // Extract city name (e.g., "Bareilly")
    const resWeather = await fetch(`http://localhost:5000/weather?location=${city}`);
    const resAlerts = await fetch(`http://localhost:5000/alerts`);

    const weather = await resWeather.json();
    const alertsData = await resAlerts.json();

    setWeatherData(weather);
    setAlerts(alertsData);
    setLastUpdated(new Date());
  } catch (err) {
    console.error("Failed to fetch weather or alerts:", err);
  }
  setLoading(false);
};


//get location
const detectUserLocation = async () => {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Use OpenWeatherMap reverse geocoding
        const apiKey = "3582913f081af70564f5d6932d35d496"; // your OpenWeatherMap API key
        const geoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

        const res = await fetch(geoUrl);
        const data = await res.json();

        if (data && data[0]) {
          const city = `${data[0].name}, ${data[0].state || data[0].country}`;
          setSelectedLocation(city);
        } else {
          console.warn("Could not determine city from coordinates.");
        }
      }, (error) => {
        console.error("Geolocation error:", error.message);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  } catch (err) {
    console.error("Error fetching location:", err);
  }
};

useEffect(() => {
  detectUserLocation();
}, []);


  useEffect(() => {
    fetchWeatherData();
  }, [selectedLocation]);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': <Sun className="h-8 w-8 text-yellow-500" />,
      'partly-cloudy': <Cloud className="h-8 w-8 text-gray-500" />,
      'cloudy': <Cloud className="h-8 w-8 text-gray-600" />,
      'rain': <CloudRain className="h-8 w-8 text-blue-500" />,
      'heavy-rain': <CloudRain className="h-8 w-8 text-blue-700" />,
      'thunderstorm': <Zap className="h-8 w-8 text-purple-600" />,
      'snow': <CloudSnow className="h-8 w-8 text-blue-300" />
    };
    return iconMap[condition] || <Sun className="h-8 w-8 text-yellow-500" />;
  };

  const getAlertColor = (type) => {
    const colors = {
      'severe': 'bg-red-50 border-red-200 text-red-800',
      'moderate': 'bg-yellow-50 border-yellow-200 text-yellow-800',
      'mild': 'bg-blue-50 border-blue-200 text-blue-800'
    };
    return colors[type] || colors.mild;
  };

  const getAlertIcon = (type) => {
    if (type === 'severe') return <AlertTriangle className="h-5 w-5 text-red-600" />;
    if (type === 'moderate') return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    return <AlertTriangle className="h-5 w-5 text-blue-600" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CloudRain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Weather Alert Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select 
  value={selectedLocation}
  onChange={(e) => {
    const value = e.target.value;
    if (value === 'detect') {
      detectUserLocation(); // custom function we'll define
    } else {
      setSelectedLocation(value);
    }
  }}
  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
>
  
  <option value="detect">📍 Detect My Location</option>
   <option value="">Select a city</option>
  <option value="Agra">Agra</option>
  <option value="Aligarh">Aligarh</option>
  <option value="Allahabad">Allahabad</option>
  <option value="Amroha">Amroha</option>
  <option value="Azamgarh">Azamgarh</option>
  <option value="Bareilly">Bareilly</option>
  <option value="Basti">Basti</option>
  <option value="Bijnor">Bijnor</option>
  <option value="Bulandshahr">Bulandshahr</option>
  <option value="Etawah">Etawah</option>
  <option value="Faizabad">Faizabad</option>
  <option value="Farrukhabad">Farrukhabad</option>
  <option value="Fatehpur">Fatehpur</option>
  <option value="Ghaziabad">Ghaziabad</option>
  <option value="Ghazipur">Ghazipur</option>
  <option value="Gonda">Gonda</option>
  <option value="Gorakhpur">Gorakhpur</option>
  <option value="Hardoi">Hardoi</option>
  <option value="Jaunpur">Jaunpur</option>
  <option value="Jhansi">Jhansi</option>
  <option value="Kannauj">Kannauj</option>
  <option value="Kanpur">Kanpur</option>
  <option value="Lakhimpur">Lakhimpur</option>
  <option value="Lalitpur">Lalitpur</option>
  <option value="Lucknow">Lucknow</option>
  <option value="Mathura">Mathura</option>
  <option value="Meerut">Meerut</option>
  <option value="Mirzapur">Mirzapur</option>
  <option value="Moradabad">Moradabad</option>
  <option value="Muzaffarnagar">Muzaffarnagar</option>
  <option value="Noida">Noida</option>
  <option value="Raebareli">Raebareli</option>
  <option value="Rampur">Rampur</option>
  <option value="Saharanpur">Saharanpur</option>
  <option value="Sambhal">Sambhal</option>
  <option value="Shahjahanpur">Shahjahanpur</option>
  <option value="Shamli">Shamli</option>
  <option value="Sitapur">Sitapur</option>
  <option value="Sultanpur">Sultanpur</option>
  <option value="Unnao">Unnao</option>
  <option value="Varanasi">Varanasi</option>
</select>
 
 

              <button 
                onClick={fetchWeatherData}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Current Weather */}
        {weatherData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">{weatherData.location}</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                {getWeatherIcon(weatherData.current.icon)}
                <p className="text-3xl font-bold text-gray-900 mt-2">{weatherData.current.temperature}°C</p>
                <p className="text-gray-600">{weatherData.current.condition}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.humidity}%</p>
                  <p className="text-gray-600">Humidity</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Wind className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.windSpeed} km/h</p>
                  <p className="text-gray-600">Wind Speed</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Eye className="h-6 w-6 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{weatherData.current.visibility} km</p>
                  <p className="text-gray-600">Visibility</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weather Alerts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Weather Alerts</h2>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <p className="text-sm mt-1">{alert.description}</p>
                        <div className="flex items-center justify-between mt-3 text-xs">
                          <span>Duration: {alert.duration}</span>
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="mt-2">
                          <span className="text-xs font-medium">Impact: {alert.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5-Day Forecast */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">5-Day Forecast</h2>
            <div className="space-y-4">
              {weatherData?.forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    {getWeatherIcon(day.icon)}
                    <div>
                      <p className="font-medium text-gray-900">{day.day}</p>
                      <p className="text-sm text-gray-600">{day.condition}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-900">{day.high}°</span>
                      <span className="text-gray-600">{day.low}°</span>
                    </div>
                    <p className="text-xs text-blue-600">{day.precipitation}% rain</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Statistics */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Weather Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-900">
    {weatherData?.forecast?.[0]?.high ?? '--'}°C
  </p>
              <p className="text-blue-700">Highest Today</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
             <p className="text-2xl font-bold text-green-900">
    {weatherData?.forecast?.[0]?.low ?? '--'}°C
  </p>
              <p className="text-green-700">Lowest Today</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Droplets className="h-8 w-8 text-purple-600 mx-auto mb-2" />
             <p className="text-2xl font-bold text-purple-900">
    {weatherData?.forecast?.[0]?.precipitation ?? '--'} mm
  </p>

              <p className="text-purple-700">Rainfall Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAlertDashboard;
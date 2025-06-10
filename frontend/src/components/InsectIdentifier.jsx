import React, { useState } from 'react';
import { Upload, Camera, Loader2, Bug, ExternalLink, Star, Shield, AlertTriangle } from 'lucide-react';

const InsectIdentifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Mock suggested insects for demonstration
  const mockSuggestions = [
    {
      id: "mock1",
      name: "Ladybug (Coccinella septempunctata)",
      probability: 0.92,
      description: "Common red ladybug with seven black spots",
      habitat: "Gardens, fields, crops"
    },
    {
      id: "mock2", 
      name: "Honeybee (Apis mellifera)",
      probability: 0.87,
      description: "European honeybee, important pollinator",
      habitat: "Flowers, hives, gardens"
    },
    {
      id: "mock3",
      name: "Monarch Butterfly (Danaus plexippus)",
      probability: 0.81,
      description: "Orange butterfly with black veins and borders",
      habitat: "Milkweed plants, gardens"
    },
    {
      id: "mock4",
      name: "House Spider (Parasteatoda tepidariorum)",
      probability: 0.76,
      description: "Common indoor spider with varied coloration",
      habitat: "Corners, basements, sheds"
    },
    {
      id: "mock5",
      name: "Ant (Lasius niger)",
      probability: 0.71,
      description: "Black garden ant, very common species",
      habitat: "Soil, under stones, lawns"
    }
  ];

  // Pesticide recommendations based on insect type
  const pesticidesData = [
    {
      id: "pest1",
      name: "Imidacloprid",
      type: "Systemic Insecticide",
      targetPests: "Aphids, Whiteflies, Thrips, Termites",
      application: "Soil drench or foliar spray",
      activeIngredient: "21.4% Imidacloprid",
      dosage: "0.5-1ml per liter of water",
      safety: "Moderate toxicity - wear protective gear"
    },
    {
      id: "pest2",
      name: "Cypermethrin",
      type: "Pyrethroid Insecticide", 
      targetPests: "Ants, Cockroaches, Moths, Beetles",
      application: "Surface spray or crack treatment",
      activeIngredient: "10% Cypermethrin",
      dosage: "1-2ml per liter of water",
      safety: "Low to moderate toxicity"
    },
    {
      id: "pest3",
      name: "Malathion",
      type: "Organophosphate",
      targetPests: "Fruit flies, Aphids, Scale insects",
      application: "Foliar spray",
      activeIngredient: "50% Malathion",
      dosage: "2ml per liter of water",
      safety: "Moderate toxicity - avoid skin contact"
    },
    {
      id: "pest4",
      name: "Neem Oil",
      type: "Botanical Insecticide",
      targetPests: "Soft-bodied insects, Larvae, Mites",
      application: "Foliar spray (organic option)",
      activeIngredient: "Azadirachtin 0.03%",
      dosage: "5-10ml per liter of water",
      safety: "Low toxicity - safe for beneficial insects"
    },
    {
      id: "pest5",
      name: "Bifenthrin",
      type: "Pyrethroid",
      targetPests: "Termites, Spiders, Crickets, Ants",
      application: "Perimeter treatment or soil application",
      activeIngredient: "10% Bifenthrin",
      dosage: "1ml per liter of water",
      safety: "Low toxicity to mammals"
    }
  ];

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const identifyInsect = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // Update this URL to match your Flask server
      const response = await fetch(`${API_BASE_URL}/identify`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to identify insect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bug className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Insect Identifier</h1>
          </div>
          <p className="text-gray-600 text-lg">Upload an image to identify insects using AI</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-blue-600" />
                Upload Image
              </h2>
              
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-input').click()}
              >
                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-500">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Drop an image here or click to browse
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Supports JPG, PNG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={identifyInsect}
                  disabled={!selectedFile || loading}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Identifying...
                    </>
                  ) : (
                    <>
                      <Bug className="w-5 h-5 mr-2" />
                      Identify Insect
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-600" />
                Identification Results
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  <p className="font-medium">Error occurred:</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}

              {results ? (
                <div className="space-y-6">
                  {/* Top Suggestions */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Top Matches:</h3>
                    <div className="space-y-3">
                      {results.result?.classification?.suggestions?.slice(0, 5).map((suggestion, index) => (
                        <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-800">{suggestion.name}</h4>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                              {(suggestion.probability * 100).toFixed(1)}%
                            </span>
                          </div>
                          
                          {suggestion.similar_images && suggestion.similar_images.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm text-gray-600 mb-2">Similar image:</p>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={suggestion.similar_images[0].url_small || suggestion.similar_images[0].url}
                                  alt="Similar"
                                  className="w-16 h-16 object-cover rounded border"
                                />
                                <div className="flex-1 text-xs text-gray-500">
                                  <p>Similarity: {(suggestion.similar_images[0].similarity * 100).toFixed(1)}%</p>
                                  {suggestion.similar_images[0].citation && (
                                    <p>Credit: {suggestion.similar_images[0].citation}</p>
                                  )}
                                  {suggestion.similar_images[0].license_name && (
                                    <a
                                      href={suggestion.similar_images[0].license_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:underline flex items-center"
                                    >
                                      {suggestion.similar_images[0].license_name}
                                      <ExternalLink className="w-3 h-3 ml-1" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* API Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Analysis Details:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Model: {results.model_version}</p>
                      <p>Analysis Time: {new Date(results.input?.datetime).toLocaleString()}</p>
                      <p>Total Suggestions: {results.result?.classification?.suggestions?.length || 0}</p>
                    </div>
                  </div>

                  {/* Pesticide Recommendations Section */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-red-600" />
                      Recommended Pesticides for Control:
                    </h3>
                    <div className="grid gap-4">
                      {pesticidesData.map((pesticide, index) => (
                        <div key={pesticide.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-red-50 to-orange-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">{pesticide.name}</h4>
                              <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium mt-1">
                                {pesticide.type}
                              </span>
                            </div>
                            <Shield className="w-5 h-5 text-red-600" />
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Target Pests:</span>
                              <p className="text-gray-600">{pesticide.targetPests}</p>
                            </div>
                            
                            <div>
                              <span className="font-medium text-gray-700">Active Ingredient:</span>
                              <p className="text-gray-600">{pesticide.activeIngredient}</p>
                            </div>
                            
                            <div>
                              <span className="font-medium text-gray-700">Application:</span>
                              <p className="text-gray-600">{pesticide.application}</p>
                            </div>
                            
                            <div>
                              <span className="font-medium text-gray-700">Dosage:</span>
                              <p className="text-gray-600 font-medium">{pesticide.dosage}</p>
                            </div>
                            
                            <div className="flex items-start space-x-2 mt-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium text-yellow-800 text-xs">Safety:</span>
                                <p className="text-yellow-700 text-xs">{pesticide.safety}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-800 mb-2">Important Safety Guidelines:</h4>
                          <ul className="text-sm text-red-700 space-y-1">
                            <li>• Always read and follow label instructions</li>
                            <li>• Wear appropriate protective equipment (gloves, mask, goggles)</li>
                            <li>• Do not spray during windy conditions</li>
                            <li>• Keep away from children and pets</li>
                            <li>• Avoid application near water sources</li>
                            <li>• Consider beneficial insects before treatment</li>
                            <li>• Consult agricultural experts for best practices</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Bug className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800 mb-1">Integrated Pest Management (IPM)</h4>
                          <p className="text-sm text-green-700">
                            Consider using biological controls, cultural practices, and targeted applications as part of a comprehensive pest management strategy. This reduces environmental impact and prevents resistance development.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Mock Examples Section */}
                  <div className="text-center py-8 text-gray-500">
                    <Bug className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg mb-2">Upload an image to identify insects</p>
                    <p className="text-sm">Our AI can identify various insects with high accuracy</p>
                  </div>

                  {/* Sample Identifications */}
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      Examples of what we can identify:
                    </h3>
                    <div className="space-y-3">
                      {mockSuggestions.map((insect, index) => (
                        <div key={insect.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-700">{insect.name}</h4>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                              {(insect.probability * 100).toFixed(0)}% accuracy
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{insect.description}</p>
                          <p className="text-xs text-gray-500">
                            <span className="font-medium">Habitat:</span> {insect.habitat}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Camera className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800 mb-1">Tips for best results:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Use clear, well-lit photos</li>
                          <li>• Focus on the insect (close-up works best)</li>
                          <li>• Avoid blurry or dark images</li>
                          <li>• Include the whole insect if possible</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsectIdentifier;
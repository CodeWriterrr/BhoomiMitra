"use client"

import { useState, useEffect } from "react"

// Inline UI Components
const Button = ({
  children,
  className = "",
  disabled = false,
  variant = "default",
  size = "default",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  }
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
)

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Select = ({ children, value, onValueChange, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <option value="">{placeholder}</option>
      {children}
    </select>
  )
}

const SelectItem = ({ children, value }) => <option value={value}>{children}</option>

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    destructive: "bg-red-100 text-red-800",
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

// Icons
const Search = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const Plus = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const MapPin = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Calendar = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const Phone = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const User = ({ className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

// Large Mock Data
const mockListings = [
  // Wheat listings
  {
    id: "1",
    crop: "Wheat",
    variety: "HD-2967",
    quantity: 100,
    price: 2150,
    location: "Bareilly, Uttar Pradesh",
    description: "High quality wheat, freshly harvested. Moisture content 12%. Ready for immediate delivery.",
    listing_type: "sell",
    seller_name: "Ramesh Kumar",
    seller_phone: "+91 9876543210",
    created_at: "2024-01-15T10:00:00Z",
    rating: 4.5,
  },
  {
    id: "2",
    crop: "Wheat",
    variety: "PBW-343",
    quantity: 250,
    price: 2200,
    location: "Ludhiana, Punjab",
    description: "Premium wheat variety with excellent grain quality. Stored in proper conditions.",
    listing_type: "sell",
    seller_name: "Gurpreet Singh",
    seller_phone: "+91 9876543211",
    created_at: "2024-01-14T15:30:00Z",
    rating: 4.8,
  },
  {
    id: "3",
    crop: "Wheat",
    variety: "DBW-88",
    quantity: 150,
    price: 2100,
    location: "Karnal, Haryana",
    description: "Disease-resistant wheat variety. Excellent for flour production.",
    listing_type: "sell",
    seller_name: "Suresh Sharma",
    seller_phone: "+91 9876543212",
    created_at: "2024-01-13T09:15:00Z",
    rating: 4.2,
  },

  // Rice listings
  {
    id: "4",
    crop: "Rice",
    variety: "Basmati 1121",
    quantity: 80,
    price: 4500,
    location: "Dehradun, Uttarakhand",
    description: "Premium basmati rice with long grains and excellent aroma. Export quality.",
    listing_type: "sell",
    seller_name: "Mohan Lal",
    seller_phone: "+91 9876543213",
    created_at: "2024-01-12T14:20:00Z",
    rating: 4.9,
  },
  {
    id: "5",
    crop: "Rice",
    variety: "IR-64",
    quantity: 200,
    price: 1850,
    location: "Cuttack, Odisha",
    description: "High-yielding rice variety. Good for daily consumption. Bulk quantity available.",
    listing_type: "sell",
    seller_name: "Ravi Patel",
    seller_phone: "+91 9876543214",
    created_at: "2024-01-11T11:45:00Z",
    rating: 4.3,
  },
  {
    id: "6",
    crop: "Rice",
    variety: "Sona Masuri",
    quantity: 120,
    price: 2200,
    location: "Guntur, Andhra Pradesh",
    description: "Premium quality Sona Masuri rice. Light weight and aromatic.",
    listing_type: "sell",
    seller_name: "Venkat Reddy",
    seller_phone: "+91 9876543215",
    created_at: "2024-01-10T16:30:00Z",
    rating: 4.6,
  },

  // Corn listings
  {
    id: "7",
    crop: "Corn",
    variety: "Sweet Corn",
    quantity: 50,
    price: 1200,
    location: "Nashik, Maharashtra",
    description: "Fresh sweet corn, perfect for processing. Harvested yesterday.",
    listing_type: "sell",
    seller_name: "Prakash Jadhav",
    seller_phone: "+91 9876543216",
    created_at: "2024-01-09T08:00:00Z",
    rating: 4.4,
  },
  {
    id: "8",
    crop: "Corn",
    variety: "Dent Corn",
    quantity: 300,
    price: 1100,
    location: "Indore, Madhya Pradesh",
    description: "High-quality dent corn suitable for animal feed and industrial use.",
    listing_type: "sell",
    seller_name: "Rajesh Patidar",
    seller_phone: "+91 9876543217",
    created_at: "2024-01-08T13:15:00Z",
    rating: 4.1,
  },

  // Sugarcane listings
  {
    id: "9",
    crop: "Sugarcane",
    variety: "Co-86032",
    quantity: 500,
    price: 350,
    location: "Muzaffarnagar, Uttar Pradesh",
    description: "High sucrose content sugarcane. Ready for crushing. Direct from field.",
    listing_type: "sell",
    seller_name: "Mahesh Tyagi",
    seller_phone: "+91 9876543218",
    created_at: "2024-01-07T10:30:00Z",
    rating: 4.7,
  },
  {
    id: "10",
    crop: "Sugarcane",
    variety: "CoM-265",
    quantity: 800,
    price: 320,
    location: "Kolhapur, Maharashtra",
    description: "Disease-resistant sugarcane variety with good yield. Bulk quantity available.",
    listing_type: "sell",
    seller_name: "Santosh Patil",
    seller_phone: "+91 9876543219",
    created_at: "2024-01-06T12:45:00Z",
    rating: 4.5,
  },

  // Cotton listings
  {
    id: "11",
    crop: "Cotton",
    variety: "Bt Cotton",
    quantity: 40,
    price: 5800,
    location: "Nagpur, Maharashtra",
    description: "Premium Bt cotton with excellent fiber quality. Ginned and ready for sale.",
    listing_type: "sell",
    seller_name: "Anil Deshmukh",
    seller_phone: "+91 9876543220",
    created_at: "2024-01-05T14:00:00Z",
    rating: 4.8,
  },
  {
    id: "12",
    crop: "Cotton",
    variety: "Desi Cotton",
    quantity: 60,
    price: 5200,
    location: "Rajkot, Gujarat",
    description: "Traditional desi cotton variety. Good staple length and strength.",
    listing_type: "sell",
    seller_name: "Kiran Patel",
    seller_phone: "+91 9876543221",
    created_at: "2024-01-04T09:30:00Z",
    rating: 4.3,
  },

  // Soybean listings
  {
    id: "13",
    crop: "Soybean",
    variety: "JS-335",
    quantity: 180,
    price: 4200,
    location: "Bhopal, Madhya Pradesh",
    description: "High protein content soybean. Excellent for oil extraction and animal feed.",
    listing_type: "sell",
    seller_name: "Dinesh Chouhan",
    seller_phone: "+91 9876543222",
    created_at: "2024-01-03T11:20:00Z",
    rating: 4.6,
  },
  {
    id: "14",
    crop: "Soybean",
    variety: "MACS-1407",
    quantity: 220,
    price: 4100,
    location: "Latur, Maharashtra",
    description: "Disease-resistant soybean variety with good oil content.",
    listing_type: "sell",
    seller_name: "Balasaheb Shinde",
    seller_phone: "+91 9876543223",
    created_at: "2024-01-02T15:45:00Z",
    rating: 4.4,
  },

  // Mustard listings
  {
    id: "15",
    crop: "Mustard",
    variety: "Pusa Bold",
    quantity: 90,
    price: 5500,
    location: "Bharatpur, Rajasthan",
    description: "High oil content mustard seeds. Perfect for oil extraction.",
    listing_type: "sell",
    seller_name: "Gopal Sharma",
    seller_phone: "+91 9876543224",
    created_at: "2024-01-01T08:15:00Z",
    rating: 4.7,
  },

  // Groundnut listings
  {
    id: "16",
    crop: "Groundnut",
    variety: "TAG-24",
    quantity: 70,
    price: 4800,
    location: "Junagadh, Gujarat",
    description: "Premium groundnut with high oil content. Bold size kernels.",
    listing_type: "sell",
    seller_name: "Jayesh Patel",
    seller_phone: "+91 9876543225",
    created_at: "2023-12-31T13:30:00Z",
    rating: 4.5,
  },

  // Onion listings
  {
    id: "17",
    crop: "Onion",
    variety: "Nashik Red",
    quantity: 150,
    price: 2200,
    location: "Nashik, Maharashtra",
    description: "Fresh red onions with good storage life. Direct from farm.",
    listing_type: "sell",
    seller_name: "Sunil Jadhav",
    seller_phone: "+91 9876543226",
    created_at: "2023-12-30T10:00:00Z",
    rating: 4.2,
  },
  {
    id: "18",
    crop: "Onion",
    variety: "Bangalore Rose",
    quantity: 200,
    price: 1800,
    location: "Bangalore, Karnataka",
    description: "Light red onions with mild flavor. Good for export.",
    listing_type: "sell",
    seller_name: "Ravi Kumar",
    seller_phone: "+91 9876543227",
    created_at: "2023-12-29T14:45:00Z",
    rating: 4.6,
  },

  // Potato listings
  {
    id: "19",
    crop: "Potato",
    variety: "Kufri Jyoti",
    quantity: 300,
    price: 1200,
    location: "Agra, Uttar Pradesh",
    description: "Fresh potatoes with good size and quality. Cold storage available.",
    listing_type: "sell",
    seller_name: "Mukesh Agarwal",
    seller_phone: "+91 9876543228",
    created_at: "2023-12-28T09:20:00Z",
    rating: 4.3,
  },
  {
    id: "20",
    crop: "Potato",
    variety: "Kufri Chipsona",
    quantity: 250,
    price: 1400,
    location: "Hooghly, West Bengal",
    description: "Processing grade potatoes perfect for chips and fries.",
    listing_type: "sell",
    seller_name: "Subhash Das",
    seller_phone: "+91 9876543229",
    created_at: "2023-12-27T16:10:00Z",
    rating: 4.8,
  },

  // Tomato listings
  {
    id: "21",
    crop: "Tomato",
    variety: "Pusa Ruby",
    quantity: 80,
    price: 2500,
    location: "Pune, Maharashtra",
    description: "Fresh red tomatoes with good shelf life. Perfect for processing.",
    listing_type: "sell",
    seller_name: "Ganesh Kulkarni",
    seller_phone: "+91 9876543230",
    created_at: "2023-12-26T11:30:00Z",
    rating: 4.4,
  },

  // Buy requests
  {
    id: "22",
    crop: "Wheat",
    variety: "Any variety",
    quantity: 500,
    price: 2000,
    location: "Delhi, Delhi",
    description: "Looking to buy wheat in bulk for flour mill. Good rates offered.",
    listing_type: "buy",
    seller_name: "Amit Gupta",
    seller_phone: "+91 9876543231",
    created_at: "2023-12-25T12:00:00Z",
    rating: 4.1,
  },
  {
    id: "23",
    crop: "Rice",
    variety: "Basmati",
    quantity: 200,
    price: 4000,
    location: "Mumbai, Maharashtra",
    description: "Urgent requirement for basmati rice. Immediate payment guaranteed.",
    listing_type: "buy",
    seller_name: "Rohit Shah",
    seller_phone: "+91 9876543232",
    created_at: "2023-12-24T15:20:00Z",
    rating: 4.7,
  },
  {
    id: "24",
    crop: "Corn",
    variety: "Feed grade",
    quantity: 1000,
    price: 1000,
    location: "Hyderabad, Telangana",
    description: "Need corn for poultry feed. Regular monthly requirement.",
    listing_type: "buy",
    seller_name: "Srinivas Rao",
    seller_phone: "+91 9876543233",
    created_at: "2023-12-23T08:45:00Z",
    rating: 4.5,
  },
  {
    id: "25",
    crop: "Cotton",
    variety: "Any variety",
    quantity: 100,
    price: 5500,
    location: "Coimbatore, Tamil Nadu",
    description: "Cotton required for textile mill. Quality parameters negotiable.",
    listing_type: "buy",
    seller_name: "Murugan Textiles",
    seller_phone: "+91 9876543234",
    created_at: "2023-12-22T13:15:00Z",
    rating: 4.6,
  },

  // More diverse listings
  {
    id: "26",
    crop: "Turmeric",
    variety: "Salem Turmeric",
    quantity: 30,
    price: 8500,
    location: "Salem, Tamil Nadu",
    description: "Premium quality turmeric with high curcumin content. Export grade.",
    listing_type: "sell",
    seller_name: "Selvam Raman",
    seller_phone: "+91 9876543235",
    created_at: "2023-12-21T10:30:00Z",
    rating: 4.9,
  },
  {
    id: "27",
    crop: "Chili",
    variety: "Guntur Sannam",
    quantity: 25,
    price: 12000,
    location: "Guntur, Andhra Pradesh",
    description: "Spicy red chilies with high capsaicin content. Sun-dried and ready.",
    listing_type: "sell",
    seller_name: "Krishna Reddy",
    seller_phone: "+91 9876543236",
    created_at: "2023-12-20T14:00:00Z",
    rating: 4.8,
  },
  {
    id: "28",
    crop: "Cardamom",
    variety: "Malabar",
    quantity: 5,
    price: 150000,
    location: "Idukki, Kerala",
    description: "Premium cardamom with strong aroma. Hand-picked and processed.",
    listing_type: "sell",
    seller_name: "Thomas Joseph",
    seller_phone: "+91 9876543237",
    created_at: "2023-12-19T09:45:00Z",
    rating: 4.7,
  },
  {
    id: "29",
    crop: "Black Pepper",
    variety: "Malabar Pepper",
    quantity: 10,
    price: 45000,
    location: "Wayanad, Kerala",
    description: "Organic black pepper with high piperine content. Export quality.",
    listing_type: "sell",
    seller_name: "Ravi Menon",
    seller_phone: "+91 9876543238",
    created_at: "2023-12-18T11:20:00Z",
    rating: 4.6,
  },
  {
    id: "30",
    crop: "Coconut",
    variety: "Tall Variety",
    quantity: 2000,
    price: 25,
    location: "Coimbatore, Tamil Nadu",
    description: "Fresh coconuts with good water content. Direct from farm.",
    listing_type: "sell",
    seller_name: "Palani Swamy",
    seller_phone: "+91 9876543239",
    created_at: "2023-12-17T16:30:00Z",
    rating: 4.3,
  },
]

export default function MarketplacePage() {
  const [filteredListings, setFilteredListings] = useState(mockListings)
  const [searchTerm, setSearchTerm] = useState("")
  const [cropFilter, setCropFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  useEffect(() => {
    filterListings()
  }, [searchTerm, cropFilter, typeFilter, locationFilter])

  const filterListings = () => {
    let filtered = mockListings

    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.seller_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Crop filter
    if (cropFilter) {
      filtered = filtered.filter((listing) => listing.crop.toLowerCase() === cropFilter.toLowerCase())
    }

    // Type filter
    if (typeFilter) {
      filtered = filtered.filter((listing) => listing.listing_type === typeFilter)
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter((listing) => listing.location.toLowerCase().includes(locationFilter.toLowerCase()))
    }

    setFilteredListings(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setCropFilter("")
    setTypeFilter("")
    setLocationFilter("")
  }

  // Get unique crops for filter dropdown
  const uniqueCrops = [...new Set(mockListings.map((listing) => listing.crop))].sort()

  // Get unique states for location filter
  const uniqueStates = [
    ...new Set(mockListings.map((listing) => listing.location.split(", ")[1]).filter(Boolean)),
  ].sort()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Agricultural Marketplace</h1>
              <p className="text-gray-600">Connect with farmers across India - Buy and sell crops directly</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Listing
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Search Box */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search crops, variety, location, seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Crop Filter */}
            <Select value={cropFilter} onValueChange={setCropFilter} placeholder="All Crops">
              {uniqueCrops.map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop}
                </SelectItem>
              ))}
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter} placeholder="All Types">
              <SelectItem value="sell">For Sale</SelectItem>
              <SelectItem value="buy">Wanted to Buy</SelectItem>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter} placeholder="All States">
              {uniqueStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredListings.length} of {mockListings.length} listings
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="text-lg">{listing.crop}</CardTitle>
                    <p className="text-sm text-gray-500">{listing.variety}</p>
                  </div>
                  <Badge variant={listing.listing_type === "sell" ? "success" : "warning"}>
                    {listing.listing_type === "sell" ? "For Sale" : "Wanted"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{listing.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price and Quantity */}
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">₹{listing.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-600">
                    {listing.quantity} {listing.crop === "Coconut" ? "pieces" : "quintals"}
                  </span>
                </div>

                {/* Location and Date */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{listing.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    {new Date(listing.created_at).toLocaleDateString("en-IN")}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(listing.rating))}
                    {"☆".repeat(5 - Math.floor(listing.rating))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({listing.rating})</span>
                </div>

                {/* Seller Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        <p className="font-medium text-sm">{listing.seller_name}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-2" />
                        <span className="text-sm text-gray-600">{listing.seller_phone}</span>
                      </div>
                    </div>
                    <Button size="sm">Contact Seller</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or clear the filters to see more results.
              </p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{mockListings.length}</div>
              <div className="text-sm text-gray-600">Total Listings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {mockListings.filter((l) => l.listing_type === "sell").length}
              </div>
              <div className="text-sm text-gray-600">For Sale</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {mockListings.filter((l) => l.listing_type === "buy").length}
              </div>
              <div className="text-sm text-gray-600">Wanted</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{uniqueCrops.length}</div>
              <div className="text-sm text-gray-600">Crop Types</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

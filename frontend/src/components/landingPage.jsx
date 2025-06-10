

import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { 
  Sprout
} from "lucide-react"


// Custom Button Component
const Button = ({ children, variant = "primary", size = "md", className = "", onClick, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    secondary: "bg-white text-green-600 border border-green-600 hover:bg-green-50 focus:ring-green-500",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

// Custom Card Component
const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({ children, className = "", ...props }) => {
  return (
    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

const CardDescription = ({ children, className = "", ...props }) => {
  return (
    <p className={`text-sm text-gray-600 mt-2 ${className}`} {...props}>
      {children}
    </p>
  )
}

// Custom Badge Component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}



const CloudRain = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const TrendingUp = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const Shield = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const MessageCircle = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const Smartphone = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" strokeWidth={2} />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} />
  </svg>
)

const BarChart3 = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
)



const ArrowRight = ({ className = "", ...props }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)



const Brain = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
)

const Satellite = ({ className = "", ...props }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
    />
  </svg>
)

// Floating animation component
const FloatingElement = ({ children, delay = 0, duration = 3 }) => {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}

// Parallax scroll component
const ParallaxElement = ({ children, speed = 0.5 }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return <div style={{ transform: `translateY(${offset}px)` }}>{children}</div>
}

// Intersection Observer hook for scroll animations
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView]
}

// 3D Card component with tilt effect
const TiltCard = ({ children, className = "" }) => {
  const [transform, setTransform] = useState("")

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`)
  }

  const handleMouseLeave = () => {
    setTransform("")
  }

  return (
    <div
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}





export default function BhoomiMitraLanding() {
  const [heroRef, heroInView] = useInView()
  const [solutionRef, solutionInView] = useInView()
  const [techRef, techInView] = useInView()

  const navigate = useNavigate();

const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate 20s linear infinite;
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .morphism {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingElement delay={0} duration={4}>
          <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-20"></div>
        </FloatingElement>
        <FloatingElement delay={1} duration={5}>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20"></div>
        </FloatingElement>
        <FloatingElement delay={2} duration={3}>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-20"></div>
        </FloatingElement>
        <FloatingElement delay={0.5} duration={6}>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
        </FloatingElement>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b glass-effect">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-3 animate-slideInLeft">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white animate-pulse-slow">
              <Sprout className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <span className="text-xl font-bold text-green-800">BhoomiMitra</span>
              
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#problem"
              className="text-sm font-medium hover:text-green-600 transition-all duration-300 hover:scale-105"
            >
              Problem
            </a>
            <a
              href="#solution"
              className="text-sm font-medium hover:text-green-600 transition-all duration-300 hover:scale-105"
            >
              Solution
            </a>
            <a
              href="#technology"
              className="text-sm font-medium hover:text-green-600 transition-all duration-300 hover:scale-105"
            >
              Technology
            </a>
            <a
              href="#team"
              className="text-sm font-medium hover:text-green-600 transition-all duration-300 hover:scale-105"
            >
              Team
            </a>
          </nav>

          <div className="flex items-center space-x-4 animate-slideInRight">
            <Button variant="outline" className="hidden md:inline-flex hover:scale-105 transition-transform">
              View Demo
            </Button>
            <Button className="hover:scale-105 transition-all duration-300" onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>

      

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="animate-rotate-slow absolute top-10 left-10 w-32 h-32 border-2 border-green-300 rounded-full"></div>
            <div
              className="animate-rotate-slow absolute bottom-20 right-20 w-24 h-24 border-2 border-blue-300 rounded-full"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div ref={heroRef} className={`space-y-8 ${heroInView ? "animate-slideInLeft" : "opacity-0"}`}>
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit bg-green-100 text-green-800 animate-pulse-slow">
                  🌾 AI-Powered Agriculture Platform
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Smart Farming for
                  <span className="text-green-600 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {" "}
                    Better Yields
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-[600px]">
                  AI-powered agricultural platform helping farmers in Uttar Pradesh make informed decisions, predict
                  crop yields, and manage weather-related risks with real-time alerts and expert guidance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="md" className="text-lg px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg " onClick={handleGetStarted}>
                  Start Farming Smart
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className="text-lg px-8 hover:scale-105 transition-all duration-300"
                >
                  Watch Demo
                </Button>
              </div>

              
            </div>

            <div className={`relative ${heroInView ? "animate-slideInRight" : "opacity-0"}`}>
              <ParallaxElement speed={0.2}>
                <TiltCard>
                  <div className="relative rounded-xl bg-white p-8 shadow-2xl morphism">
                    {/* Dashboard Mockup with CSS */}
                    <div className="w-full h-80 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-4">
                         <img
    src="https://img.freepik.com/premium-photo/tablet-with-plant-hand-touching-it_669646-22607.jpg?ga=GA1.1.2015822098.1714583635&semt=ais_items_boosted&w=740" // Replace with your actual path
    
    className="w-full h-80 mx-auto rounded-lg shadow-md"
  />
                       
                        
                      </div>
                    </div>
                    <FloatingElement delay={1}>
                      <div className="absolute -top-4 -right-4 bg-green-600 text-white p-3 rounded-full shadow-lg">
                        <Brain className="h-6 w-6" />
                      </div>
                    </FloatingElement>
                    <FloatingElement delay={2}>
                      <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                        <Satellite className="h-6 w-6" />
                      </div>
                    </FloatingElement>
                  </div>
                </TiltCard>
              </ParallaxElement>
            </div>
          </div>
        </div>
      </section>

    

      {/* Solution Section */}
      <section id="solution" className="py-20 md:py-32 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-blue-400 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div
            ref={solutionRef}
            className={`text-center space-y-4 mb-16 ${solutionInView ? "animate-fadeInUp" : "opacity-0"}`}
          >
            <Badge variant="secondary" className="w-fit mx-auto bg-green-100 text-green-800 animate-pulse-slow">
              Our Solution
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Meet BhoomiMitra</h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              Comprehensive AI-powered platform that empowers farmers with predictive insights, real-time alerts, and
              intelligent recommendations.
            </p>
          </div>

          <div
            className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 ${solutionInView ? "animate-fadeInUp" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            {[
              {
                icon: BarChart3,
                title: "Crop Yield Prediction",
                description:
                  "LSTM neural networks forecast crop production using weather data, soil parameters, and historical patterns for accurate yield predictions.",
                color: "green",
                delay: 0,
              },
              {
                icon: CloudRain,
                title: "Weather Impact Analysis",
                description:
                  "Advanced models identify flood/drought risks and provide actionable alerts to help farmers prepare for weather extremes.",
                color: "blue",
                delay: 0.2,
              },
              {
                icon: Smartphone,
                title: "Real-time Alerts",
                description:
                  "SMS and voice alerts in local languages deliver timely warnings and recommendations directly to farmers' mobile phones.",
                color: "purple",
                delay: 0.4,
              },
              {
                icon: MessageCircle,
                title: "AI Chatbot Assistant",
                description:
                  "LLM-powered chatbot provides natural language responses to farmer queries, crop disease identification, and fertilizer recommendations.",
                color: "orange",
                delay: 0.6,
              },
              {
                icon: Shield,
                title: "Disease Detection",
                description:
                  "AI-powered image recognition identifies crop diseases early and suggests appropriate treatments and fertilizer usage.",
                color: "red",
                delay: 0.8,
              },
              {
                icon: TrendingUp,
                title: "Smart Marketplace",
                description:
                  "Connects farmers directly with buyers and recommends best crops based on market trends and soil potential.",
                color: "yellow",
                delay: 1,
              },
            ].map((feature, index) => (
              <TiltCard key={index}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 morphism">
                  <CardHeader>
                    <FloatingElement delay={feature.delay}>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${feature.color}-100`}>
                        <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                      </div>
                    </FloatingElement>
                    <CardTitle className="hover:text-green-600 transition-colors">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20 md:py-32 bg-gray-50 relative">
        <ParallaxElement speed={0.1}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl"></div>
          </div>
        </ParallaxElement>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div ref={techRef} className={`text-center space-y-4 mb-16 ${techInView ? "animate-fadeInUp" : "opacity-0"}`}>
            <Badge variant="secondary" className="w-fit mx-auto animate-pulse-slow">
              AI Technology
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Powered by Advanced AI</h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              Our platform leverages cutting-edge machine learning models and cloud infrastructure to deliver accurate
              predictions and insights.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className={`space-y-6 ${techInView ? "animate-slideInLeft" : "opacity-0"}`}>
              {[
                {
                  icon: Brain,
                  title: "LSTM Neural Networks",
                  description:
                    "Long Short-Term Memory networks for accurate crop yield prediction using time-series data",
                  color: "blue",
                },
                {
                  icon: BarChart3,
                  title: "Random Forest & XGBoost",
                  description: "Classification models for flood and drought risk prediction with high accuracy",
                  color: "green",
                },
                {
                  icon: MessageCircle,
                  title: "LLM Integration",
                  description:
                    "GPT-4 with RAG architecture for intelligent farmer advisory and natural language queries",
                  color: "purple",
                },
                {
                  icon: Satellite,
                  title: "Satellite Data Integration",
                  description: "Real-time satellite feeds for crop monitoring and weather pattern analysis",
                  color: "orange",
                },
              ].map((tech, index) => (
                <TiltCard key={index}>
                  <Card className="p-6 hover:shadow-lg transition-all duration-300 morphism">
                    <div className="flex items-start space-x-4">
                      <FloatingElement delay={index * 0.2}>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${tech.color}-100`}>
                          <tech.icon className={`h-5 w-5 text-${tech.color}-600`} />
                        </div>
                      </FloatingElement>
                      <div>
                        <h3 className="font-semibold hover:text-green-600 transition-colors">{tech.title}</h3>
                        <p className="text-sm text-gray-600">{tech.description}</p>
                      </div>
                    </div>
                  </Card>
                </TiltCard>
              ))}
            </div>

           
          </div>
        </div>
      </section>

      

      {/* ROI Section */}
      <section className="py-20 md:py-32 bg-green-50 relative">
        <ParallaxElement speed={0.3}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full">
              <FloatingElement>
                <div className="absolute top-20 left-20 w-32 h-32 bg-green-300 rounded-full"></div>
              </FloatingElement>
              <FloatingElement delay={1}>
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-300 rounded-full"></div>
              </FloatingElement>
            </div>
          </div>
        </ParallaxElement>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center space-y-4 mb-16 animate-fadeInUp">
            <Badge variant="secondary" className="w-fit mx-auto bg-green-100 text-green-800 animate-pulse-slow">
              Impact & ROI
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Measurable Results</h2>
            <p className="text-xl text-gray-600 max-w-[800px] mx-auto">
              Our solution delivers tangible benefits to farmers and the agricultural ecosystem.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "15-25%", label: "Improved Crop Yields", sublabel: "Per season increase", color: "green" },
              {
                value: "20-30%",
                label: "Reduced Disaster Impact",
                sublabel: "Fewer losses from floods/droughts",
                color: "blue",
              },
              { value: "Real-time", label: "Better Decision Making", sublabel: "Instant advisories", color: "purple" },
              {
                value: "Significant",
                label: "Time & Cost Savings",
                sublabel: "Reduced manual intervention",
                color: "orange",
              },
            ].map((stat, index) => (
              <TiltCard key={index}>
                <Card className="text-center p-6 bg-white hover:shadow-xl transition-all duration-500 hover:scale-105">
                  <FloatingElement delay={index * 0.2}>
                    <div
                      className={`text-3xl font-bold text-${stat.color}-600 mb-2 hover:scale-110 transition-transform`}
                    >
                      {stat.value}
                    </div>
                  </FloatingElement>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.sublabel}</div>
                </Card>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-20"></div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <div className="space-y-8 max-w-3xl mx-auto animate-fadeInUp">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Transform Agriculture?
            </h2>
            <p className="text-xl text-green-100">
              Join the agricultural revolution with BhoomiMitra. Help farmers make smarter decisions, increase yields,
              and build resilience against climate change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 transition-all duration-300"
              >
                Contact Team
              </Button>
            </div>
            <p className="text-sm text-green-200 animate-pulse-slow">
              PRARAMBH 2025 • IBM Career Education • Team CodeWriter
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 animate-slideInLeft">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 animate-pulse-slow">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">BhoomiMitra</span>
              </div>
              <p className="text-gray-400">
                AI-powered agricultural platform for smart farming and weather risk management.
              </p>
            </div>

            {[
              {
                title: "Solution",
                items: ["Crop Yield Prediction", "Weather Alerts", "Disease Detection", "Smart Marketplace"],
              },
              {
                title: "Technology",
                items: ["Machine Learning", "AI Chatbot", "Satellite Data", "Cloud Platform"],
              },
              {
                title: "Contact",
                items: [
                  "Team CodeWriter",
                  "PRARAMBH 2025",
                  "IBM Career Education",
                  "Agriculture & Disaster Management",
                ],
              },
            ].map((section, index) => (
              <div key={index} className="space-y-4 animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                <h3 className="font-semibold hover:text-green-400 transition-colors">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="hover:text-white transition-colors cursor-pointer">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center animate-fadeInUp">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BhoomiMitra by Team CodeWriter. Built for PRARAMBH 2025 - IBM Career
              Education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

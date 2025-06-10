"use client"

import { useState } from "react"

// Inline UI Components
const Button = ({
  children,
  className = "",
  disabled = false,
  variant = "default",
  type = "button",
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground border-gray-300 hover:bg-gray-50",
  }
  const sizeClasses = "h-10 py-2 px-4"

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizeClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200 ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-muted-foreground text-gray-600 ${className}`}>{children}</p>
)

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
)

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${className}`}
    {...props}
  />
)

const Select = ({ children, value, onValueChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      >
        {children}
      </select>
    </div>
  )
}

const SelectItem = ({ children, value }) => <option value={value}>{children}</option>

// Icons as simple SVG components
const Loader2 = ({ className = "" }) => (
  <svg
    className={`animate-spin ${className}`}
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
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
)

const MessageSquare = ({ className = "" }) => (
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
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
)

const Sprout = ({ className = "" }) => (
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
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 00-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
)

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
]

export default function FarmerAssistant() {
  const [prompt, setPrompt] = useState("")
  const [language, setLanguage] = useState("en")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!prompt.trim()) {
      setError("Please enter your question")
      return
    }

    setLoading(true)
    setError("")
    setResponse("")

    try {
      // Create a language-aware prompt
      const languagePrompt =
        language !== "en"
          ? `Please respond in ${languages.find((l) => l.code === language)?.name || "the selected language"}. ${prompt}`
          : prompt

      const res = await fetch("http://127.0.0.1:5000/ask-gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: languagePrompt,
        }),
      })

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }

      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResponse(data.response || "No response received from AI")
      }
    } catch (err) {
      console.error("Error:", err)

      if (err instanceof TypeError && err.message.includes("fetch")) {
        setError(
          "Cannot connect to the server. Please make sure your Flask backend is running on http://127.0.0.1:5000",
        )
      } else if (err instanceof Error) {
        setError(`Connection error: ${err.message}`)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const clearForm = () => {
    setPrompt("")
    setResponse("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Farm Assistant AI</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Get instant answers to your farming questions in your preferred language
          </p>
        </div>

        {/* Main Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ask Your Question
            </CardTitle>
            <CardDescription>Ask about crops, weather, soil, pests, or any farming-related topic</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Language Selection */}
              <div className="space-y-2">
                <Label htmlFor="language">Select Language / भाषा चुनें</Label>
                <Select value={language} onValueChange={setLanguage}>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.nativeName} ({lang.name})
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Question Input */}
              <div className="space-y-2">
                <Label htmlFor="prompt">Your Question / आपका प्रश्न</Label>
                <Textarea
                  id="prompt"
                  placeholder="e.g., What is the best time to plant tomatoes? / टमाटर लगाने का सबसे अच्छा समय क्या है?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  style={{ resize: "none" }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button type="submit" disabled={loading || !prompt.trim()} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4" />
                      Getting Answer...
                    </>
                  ) : (
                    "Get Answer"
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={clearForm} disabled={loading}>
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-600">
                <strong>Error:</strong> {error}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response Display */}
        {response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">AI Response</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{response}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Questions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600">Sample Questions / नमूना प्रश्न</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => setPrompt("What are the best crops to grow in monsoon season?")}
                className="text-left p-2 rounded hover:bg-gray-100 text-blue-600 transition-colors"
              >
                • What crops are best for monsoon season?
              </button>
              <button
                onClick={() => setPrompt("How to identify and treat plant diseases?")}
                className="text-left p-2 rounded hover:bg-gray-100 text-blue-600 transition-colors"
              >
                • How to identify plant diseases?
              </button>
              <button
                onClick={() => setPrompt("What is the ideal soil pH for vegetables?")}
                className="text-left p-2 rounded hover:bg-gray-100 text-blue-600 transition-colors"
              >
                • What soil pH is best for vegetables?
              </button>
              <button
                onClick={() => setPrompt("How to improve crop yield naturally?")}
                className="text-left p-2 rounded hover:bg-gray-100 text-blue-600 transition-colors"
              >
                • How to improve crop yield naturally?
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Farm Assistant AI - Powered by BHOOMIMITRA</p>
          <p>Helping farmers grow better crops with AI technology</p>
        </div>
      </div>
    </div>
  )
}

# 🧑‍🤝‍🧑Team - CodeWriter
     
# Problem Statement : Predicting Crop Yields & Weather Impact

# 🌾 BhoomiMitra - AI-Powered Agricultural Platform

**BhoomiMitra** (भूमिमित्र - "Friend of the Earth") is a comprehensive AI-powered agricultural platform designed to empower farmers with cutting-edge technology for better crop management, disease detection, yield prediction, and smart marketplace solutions.


   ![Screenshot 2025-06-10 174145](https://github.com/user-attachments/assets/428b8c25-ee11-46b0-9983-4e915855c4e8)


## 🚀 Features

### 🤖 **AI-Powered Agriculture**
- **Crop Yield Prediction**: Advanced ML models predict crop yields based on soil, weather, and historical data
- **Disease Detection**: Upload crop images for instant AI-powered disease identification and treatment recommendations
- **Smart AI Assistant**: 24/7 agricultural expert chatbot for farming guidance and support
- **Weather Risk Analysis**: Real-time weather monitoring with risk assessments

### 📊 **Smart Dashboard**
- **Real-time Analytics**: Live farm statistics, yield predictions, and health metrics
- **Weather Integration**: Current conditions, forecasts, and agricultural alerts
- **Quick Actions**: One-click access to all platform features
- **Alert System**: Automated notifications for weather risks, disease outbreaks, and market opportunities

### 🛒 **Digital Marketplace**
- **Buy & Sell Crops**: Direct farmer-to-buyer marketplace with competitive pricing
- **Smart Listings**: AI-powered crop categorization and quality assessment




## 🛠 Technology Stack

### **Frontend**
- **Framework**: React.js  with App Router
- **Language**: Js
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React icons

### **Backend**
- **Framework**: Flask (Python)
- **AI/ML**: TensorFlow, scikit-learn, Gemini-pro
- **APIs**: RESTful APIs with automatic documentation

### **AI & Machine Learning**
- **Crop Prediction**: Random Forest and Neural Networks
- **Disease Detection**: Pre traind Computer Vision with CNN models
- **Natural Language**: Gemini for AI assistant

## 📦 Installation & Setup

### **Prerequisites**
- react.js and npm
- Python 3.8+
- Git

### **Frontend Setup**

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeWriterrr/bhoomimitra.git
   cd bhoomimitra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_APP_NAME=BhoomiMitra
   ```

4. **Run development server**
   ```bash
   npm run dev  / start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### **Backend Setup**

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```



3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment configuration**
   \`\`\`bash
   .env file
   \`\`\`
   
  

5. **Run backend server**
   ```bash
   
   python main.py
   ```

## ScreenShote

![image](https://github.com/user-attachments/assets/c2361987-f495-41d0-9eca-13bc9e787efc)
![image](https://github.com/user-attachments/assets/e07929c3-4627-4160-917e-0e99747a36a7)
![localhost_3000_dashboard](https://github.com/user-attachments/assets/446284b2-96c3-4d48-8fdf-ccad96443de9)
![localhost_3000_predict](https://github.com/user-attachments/assets/553433c8-8e4b-4921-bf33-c6032087a184)
![localhost_3000_weather](https://github.com/user-attachments/assets/f38ec159-eab5-41dc-ba15-efc3bd48dfcc)
![localhost_3000_insect-identifier](https://github.com/user-attachments/assets/6647eebe-0541-4c60-b8c1-725c1c0eb098)
![localhost_3000_farm-ai](https://github.com/user-attachments/assets/2c866a86-14c1-42e1-9688-0ad5a91a205d)
![localhost_3000_marketplace](https://github.com/user-attachments/assets/006edf2c-c741-4069-9ee7-038512faecdb)


## 📱 Usage Guide

### **For Farmers**

1. **Registration**: Create account with farm details
2. **Dashboard**: Monitor farm statistics and weather
3. **Crop Prediction**: Input soil and crop data for yield forecasts
4. **Disease Detection**: Upload crop photos for instant diagnosis
5. **AI Assistant**: Ask farming questions anytime
6. **Marketplace**: List crops for sale or browse buying opportunities

### **For Buyers**

1. **Browse Marketplace**: Search crops by location, type, and quality
2. **Contact Farmers**: Direct communication with sellers
3. **Price Analysis**: View market trends and price predictions
4. **Secure Transactions**: Safe buying process with verified farmers

### **For Agricultural Experts**

1. **Analytics Dashboard**: Monitor regional farming trends
2. **Alert Management**: Send weather and disease alerts
3. **Knowledge Base**: Contribute to AI assistant training
4. **Market Insights**: Analyze crop supply and demand

## 🔧 API Documentation

### **Crop Management**
- `POST /crop/predict` - Predict crop yield
- `POST /crop/disease-detect` - Detect crop diseases
- `GET /crop/recommendations` - Get crop recommendations

### **AI Assistant**
- `POST /ai/chat` - Chat with AI assistant
- `GET /ai/chat/history` - Get chat history


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit changes**
   \`\`\`bash
   git commit -m 'Add amazing feature'
   \`\`\`
4. **Push to branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow conventional commit messages







**Made with ❤️ for farmers worldwide**

*BhoomiMitra - Empowering agriculture through AI*

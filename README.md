# 🩺 Medical Report Assistant

A modern, AI-powered web application that analyzes and simplifies medical reports for better patient understanding. Built with React and deployed on AWS Lambda + Vercel.

## 🌐 Live Demo

**Production URL**: https://medical-report-analyzer-one.vercel.app/

## ✨ Features

- **🎨 Modern React UI**: Professional gradient design with smooth animations
- **🤖 AI-Powered Analysis**: Uses Google's Gemini AI to analyze medical reports
- **🔒 Security Enhanced**: XSS protection, CSRF protection, input validation
- **📁 File Upload**: Intuitive drag & drop interface with file validation
- **👁️ Real-time Preview**: Instant image preview before analysis
- **⏳ Loading Screens**: Professional loading animations during AI processing
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **☁️ Cloud Deployed**: Serverless architecture for scalability

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Lucide React** - Beautiful icons
- **DOMPurify** - XSS protection
- **Marked** - Markdown parsing
- **Webpack 5** - Module bundler
- **Babel** - JavaScript transpiler
- **CSS3** - Modern styling with gradients and animations

### Backend
- **AWS Lambda** - Serverless compute
- **Node.js 18** - Runtime environment
- **Google Gemini AI** - AI image analysis
- **API Gateway** - REST API management

### Deployment & DevOps
- **Vercel** - Frontend hosting
- **AWS Lambda** - Backend hosting
- **Serverless Framework** - Infrastructure as Code
- **GitHub** - Version control

### Security
- **DOMPurify** - XSS protection
- **CORS** - Cross-origin resource sharing
- **Input Validation** - File type and size validation
- **Environment Variables** - Secure API key management

## 🚀 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Vercel        │    │   API Gateway    │    │   AWS Lambda    │
│   (Frontend)    │───▶│   (REST API)     │───▶│   (AI Analysis) │
│   React App     │    │   CORS Enabled   │    │   Gemini AI     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 📋 Local Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medical-report-simplifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Add your Google Gemini API key to .env
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

4. **Development mode**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000

5. **Production build**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Deployment Guide

### Backend (AWS Lambda)

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Configure AWS credentials**
   ```bash
   aws configure
   ```

3. **Deploy to AWS**
   ```bash
   cd lambda
   serverless deploy
   ```

### Frontend (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Add environment variables**
   ```bash
   vercel env add REACT_APP_API_URL
   # Enter your Lambda API Gateway URL
   ```

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

### Environment Variables

**Backend (Lambda)**
- `GOOGLE_GENAI_API_KEY` - Your Google Gemini API key

**Frontend (Vercel)**
- `REACT_APP_API_URL` - Your Lambda API Gateway endpoint

### API Configuration

**Endpoint**: `POST /caption`

**Request Body**:
```json
{
  "imageBase64": "base64_encoded_image_data"
}
```

**Response**:
```json
{
  "caption": "AI-generated medical report summary in markdown format"
}
```

## 📁 Project Structure

```
medical-report-simplifier/
├── src/                    # React frontend source
│   ├── App.js             # Main React component
│   ├── App.css            # Styling
│   └── index.js           # React entry point
├── lambda/                 # AWS Lambda backend
│   ├── index.js           # Lambda function
│   ├── package.json       # Lambda dependencies
│   └── serverless.yml     # Serverless config
├── webpack.config.js       # Build configuration
├── vercel.json            # Vercel deployment config
├── package.json           # Frontend dependencies
└── README.md              # This file
```

## 🔒 Security Features

- ✅ **XSS Protection**: DOMPurify sanitizes all HTML output
- ✅ **Input Validation**: File type, size, and format validation
- ✅ **CORS Security**: Properly configured cross-origin requests
- ✅ **Environment Security**: API keys stored securely
- ✅ **Error Handling**: Graceful error handling and user feedback

## 💰 Cost Estimation

### AWS Lambda (Backend)
- **Free Tier**: 1M requests/month + 400,000 GB-seconds
- **After Free Tier**: ~$0.20 per 1M requests
- **Estimated Monthly Cost**: $0-3 for moderate usage

### Vercel (Frontend)
- **Hobby Plan**: Free (100GB bandwidth)
- **Pro Plan**: $20/month (if needed)

### Google Gemini AI
- **Free Tier**: 15 requests/minute
- **Paid**: $0.00025 per 1K characters

**Total Estimated Cost**: $0-5/month for moderate usage

## 🎯 Usage Instructions

1. **Visit the application**: https://medical-report-analyzer-one.vercel.app/
2. **Upload medical report**: Click upload area or drag & drop image
3. **Preview**: Review the uploaded image
4. **Analyze**: Click "Analyze Report" button
5. **Loading**: Wait for AI processing (with loading animation)
6. **Results**: View simplified, patient-friendly summary

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## ⚠️ Disclaimer

This application provides AI-generated summaries for educational purposes only. Always consult with healthcare professionals for medical decisions and diagnosis.

---

**Built with ❤️ using React, AWS Lambda, and Google Gemini AI**
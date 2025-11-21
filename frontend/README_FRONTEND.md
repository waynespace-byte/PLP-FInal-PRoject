# SmartFarmLink Frontend

Complete functional frontend for SmartFarmLink agricultural platform with M-Pesa payment integration.

## ✅ Implemented Features

### 1. **Authentication System**
- Login and Registration forms
- JWT token management with automatic refresh
- Protected routes for authenticated users
- User profile integration

### 2. **Dashboard**
- Farmer overview page
- Quick access to all features
- User profile display

### 3. **AI Crop Advisor**
- Input farm details (location, soil pH, rainfall, temperature, farm size)
- Get AI-powered crop recommendations
- View expected yields, seasons, and market prices

### 4. **Disease Detection**
- Upload plant images
- AI-powered disease identification
- Treatment and prevention recommendations
- Confidence scores for diagnoses

### 5. **Marketplace**
- Browse products (seeds, fertilizers, equipment)
- Search functionality
- M-Pesa payment integration for purchases
- Product details with seller information

### 6. **Weather Forecast**
- Location-based weather data
- Current weather conditions
- 7-day forecast
- Farming recommendations based on weather

### 7. **M-Pesa Payment Integration** ✨
- Payment initiation modal
- Real-time payment status polling
- Success/failure notifications
- Secure phone number input
- Works with Safaricom M-Pesa sandbox

## 🚀 How to Use

### Prerequisites
1. Backend must be running at `http://127.0.0.1:8000`
2. M-Pesa sandbox credentials configured in backend

### Testing the Application

1. **Start the app**: The frontend is already running in Lovable

2. **Register an account**:
   - Click "Get Started" or "Login"
   - Go to "Register" tab
   - Fill in your details (use sandbox M-Pesa number: 254712345678)
   - Click "Create Account"

3. **Login**:
   - Switch to "Login" tab
   - Enter your email and password
   - You'll be redirected to the dashboard

4. **Test AI Crop Advisor**:
   - Click "AI Crop Advisor" from dashboard
   - Enter farm details:
     - Location: e.g., "Nairobi, Kenya"
     - Soil pH: e.g., 6.5
     - Rainfall: e.g., 1000 mm/year
     - Temperature: e.g., 25°C
     - Farm Size: e.g., 5 acres
   - Click "Get Recommendation"

5. **Test Disease Detection**:
   - Click "Disease Detection" from dashboard
   - Upload an image of a diseased plant
   - Wait for AI analysis
   - View diagnosis and treatment recommendations

6. **Test Marketplace & M-Pesa**:
   - Click "Marketplace" from dashboard
   - Browse available products
   - Click "Buy Now" on any product
   - Enter M-Pesa phone number (sandbox: 254712345678)
   - Click "Pay Now"
   - Check your phone (in sandbox, check backend logs)
   - Payment status updates automatically

7. **Test Weather Forecast**:
   - Click "Weather Forecast" from dashboard
   - Enter location (e.g., "Nairobi, Kenya")
   - View current weather and 7-day forecast

## 🎨 Design System

The app uses an agricultural-themed design with:
- **Primary Color**: Green (#22c55e) - representing growth and agriculture
- **Secondary Color**: Yellow (#facc15) - representing sunshine and harvest
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Semantic Tokens**: All colors use HSL and design system variables

## 🔐 Security Features

- JWT token authentication with automatic refresh
- Protected routes (redirect to login if not authenticated)
- Secure API communication with bearer tokens
- Proper error handling and user feedback

## 📦 Tech Stack

- **React 18** with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

## 🔌 API Endpoints Used

All endpoints expect `http://127.0.0.1:8000/api/v1/` prefix:

- `POST /auth/register/` - User registration
- `POST /auth/login/` - User login
- `GET /auth/profile/` - Get user profile
- `POST /auth/token/refresh/` - Refresh JWT token
- `POST /ai/crop-recommendation/` - Get crop recommendations
- `POST /ai/disease-detection/` - Detect plant diseases
- `GET /ai/weather-forecast/` - Get weather data
- `GET /marketplace/products/` - List products
- `POST /payments/mpesa/initiate/` - Initiate M-Pesa payment
- `GET /payments/mpesa/status/:id/` - Check payment status

## 🧪 Testing M-Pesa (Sandbox)

For M-Pesa testing in sandbox mode:

1. **Phone Number**: Use 254712345678 (or any sandbox number)
2. **PIN**: When prompted, any 4-digit number works in sandbox
3. **Payment Flow**:
   - Frontend initiates payment
   - Backend sends STK push to phone
   - User enters PIN
   - Frontend polls status every 3 seconds
   - Shows success/failure notification

## 📝 Notes

1. **Backend must be running** at `http://127.0.0.1:8000` for the frontend to work
2. **CORS** should be enabled in Django backend for `http://localhost:5173` (or your Lovable preview URL)
3. **M-Pesa credentials** must be configured in your Django backend `.env` file
4. The app uses **localStorage** for token storage (access_token and refresh_token)
5. Token refresh happens automatically when tokens expire

## 🐛 Troubleshooting

**Issue**: "Network Error" when trying to login
- **Solution**: Ensure Django backend is running on `http://127.0.0.1:8000`
- Check CORS settings in Django

**Issue**: M-Pesa payment not working
- **Solution**: 
  - Verify M-Pesa credentials in backend
  - Check backend logs for API errors
  - Ensure using sandbox phone number (254712345678)

**Issue**: Images not loading in marketplace
- **Solution**: Products need `image_url` field populated in database

**Issue**: "401 Unauthorized" errors
- **Solution**: Try logging out and logging in again to refresh tokens

## 🎯 Next Steps

To enhance the application further:

1. **Add more features**:
   - SACCO/Loan integration
   - Equipment hire/rental system
   - Learning hub with videos
   - Farm analytics dashboard

2. **Improve UX**:
   - Add loading skeletons
   - Add image optimization
   - Add offline support
   - Add push notifications

3. **Enhance M-Pesa**:
   - Add transaction history
   - Add payment receipts
   - Add multiple payment methods
   - Add subscription payments

4. **Testing**:
   - Add unit tests
   - Add E2E tests
   - Add API mocking for development

## 📧 Support

If you encounter any issues or need help:
1. Check the browser console for errors
2. Check the Django backend logs
3. Verify all backend endpoints are accessible
4. Ensure M-Pesa sandbox credentials are correct

---

**Built with ❤️ for African Farmers**

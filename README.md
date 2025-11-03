# DocTalk - Doctor Appointment Booking Platform

🔗 **Live Site:** [https://p-assignment8.netlify.app/](https://p-assignment8.netlify.app/)

## 📋 Overview

DocTalk is a modern doctor appointment booking platform built with React and Vite. Our platform connects you with verified, experienced doctors across various specialties — all at your convenience. Whether it's a routine checkup or urgent consultation, book appointments in minutes and receive quality care you can trust.

## ✨ Features

- **Doctor Directory**: Browse through a comprehensive list of verified doctors across multiple specialties
- **Appointment Booking**: Easy-to-use booking system for scheduling consultations
- **Doctor Profiles**: Detailed information about each doctor including qualifications, experience, and availability
- **My Bookings**: Personal dashboard to manage your appointments
- **Medical Blog**: Educational content about React hooks and web development
- **Responsive Design**: Optimized for all devices with modern UI/UX
- **Real-time Availability**: Check doctor availability and working days

## 🏥 Medical Specialties Available

- Cardiology
- Neurology
- Pediatrics
- Orthopedics
- Dermatology
- General Surgery
- Gynecology
- Psychiatry
- Endocrinology
- Pulmonology
- Rheumatology

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.0.0
- **Build Tool**: Vite 6.3.1
- **Routing**: React Router 7.5.1
- **Styling**: Tailwind CSS 4.1.4 + DaisyUI 5.0.27
- **Icons**: Lucide React + React Icons
- **Charts**: Recharts 2.15.3
- **Notifications**: React Toastify 11.0.5
- **Animations**: React CountUp 6.5.3
- **Code Quality**: ESLint 9.22.0

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Assignment8
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
src/
├── Components/
│   ├── Layout/
│   │   └── MainLayout.jsx
│   ├── Banner.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   └── Navbar.jsx
├── Pages/
│   ├── Home.jsx
│   ├── DoctorDetails.jsx
│   ├── MyBookings.jsx
│   ├── Blogs.jsx
│   ├── Contact.jsx
│   └── Error.jsx
├── Routes/
│   └── Routes.jsx
├── hooks/
│   └── useDocumentTitle.jsx
├── assets/
└── App.jsx

public/
├── Data/
│   ├── doctors.json
│   ├── blogs.json
│   └── success.json
└── _redirects
```

## 🎯 Key Features Implementation

### Lazy Loading
The application implements lazy loading for optimal performance:
- Home page components
- Doctor details pages
- Booking management
- Blog sections

### Responsive Design
Built with Tailwind CSS and DaisyUI for:
- Mobile-first approach
- Cross-device compatibility
- Modern UI components
- Accessible design patterns

### State Management
Utilizes React hooks for:
- Component state management
- Side effects handling
- Custom hook implementations
- Form state management

## 📱 Pages Overview

- **Home**: Landing page with doctor listings and search functionality
- **Doctor Details**: Comprehensive doctor profiles with booking options
- **My Bookings**: Personal appointment management dashboard
- **Blogs**: Educational content about React development
- **Error**: Custom 404 page for better user experience

## 🔧 Configuration

The project uses:
- **Vite Config**: Optimized build configuration
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling approach
- **React Router**: Client-side routing with lazy loading

## 🌐 Deployment

The application is deployed on Netlify with:
- Automatic deployments from Git
- Custom redirects configuration
- Optimized build process
- CDN distribution

## 📄 License

This project is part of a programming assignment and is for educational purposes.

## 🤝 Contributing

This is an assignment project. For educational purposes, feel free to fork and experiment with the codebase.

---

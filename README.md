# Kitchen Order Management System

A comprehensive role-based kitchen order management system designed for hotels and restaurants. This system streamlines the order workflow from customer order placement to kitchen fulfillment with real-time tracking and analytics.

![Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-24%20at%209.21.01%E2%80%AFAM-afU8in46NDXrTQ25Pb86wxFKqaiQtE.png)

## 🚀 Features

### 📊 Dashboard & Analytics
- **Real-time metrics**: Total orders, revenue, and average order value
- **Visual analytics**: Orders by category and daily revenue charts
- **Monthly filtering**: Filter data by specific months
- **Export functionality**: Export order data for reporting

### 👥 Role-Based Access Control

#### 🏨 Front Desk (Order Taker)
- Take customer orders
- Manage room assignments
- View order history
- Customer management interface

#### 🍳 Kitchen Staff (Order Receiver)
- View pending orders in real-time
- Mark orders as completed
- Track order preparation status
- Kitchen workflow optimization

#### 👤 User Management
- Add and manage staff accounts
- Assign roles and permissions
- Multi-hotel support
- User activity tracking

### 📋 Order Management
- **Order tracking**: Complete order lifecycle management
- **Status updates**: Pending, In Progress, Completed statuses
- **Room integration**: Link orders to specific hotel rooms
- **Item management**: Detailed item tracking with quantities and pricing
- **Multi-currency support**: Thai Baht (฿) currency integration

### 🏨 Multi-Hotel Support
- Manage multiple hotel properties
- Hotel-specific user accounts
- Centralized management dashboard
- Property-wise analytics

## 🛠️ Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Supabase
- **Authentication**: Role-based authentication system
- **State Management**: React Context/Hooks
- **Deployment**: Vercel-ready configuration

## 📱 Screenshots

### Order Management Interface
![Order Management](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-24%20at%209.21.46%E2%80%AFAM-VKa56xl74OU1kfmVvC2TvnqDbYuk3N.png)

### Kitchen Order Receiver
![Order Receiver](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-24%20at%209.21.39%E2%80%AFAM-7bXiq231tlMLiGBQ6Q31T6idn45M6p.png)

### User Management
![User Management](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-24%20at%209.21.29%E2%80%AFAM-NGU12lridUvbSK1vWKXlTkLz6FeSrw.png)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tusharsaini-05/kitchen.git
   cd kitchen
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Database Setup**
   - Set up your Supabase project
   - Run the database migrations
   - Configure Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173) (default Vite port)

## 🏗️ Project Structure

```
kitchen/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages/views
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── context/       # React Context providers
│   ├── services/      # API services and Supabase client
│   └── assets/        # Static assets
├── supabase/          # Database schemas and migrations
├── public/            # Public static assets
├── index.html         # Main HTML file
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🔐 User Roles & Permissions

| Role | Permissions |
|------|-------------|
| **Front Desk** | Create orders, manage customers, view order history |
| **Order Receiver** | View pending orders, update order status, kitchen operations |
| **Order Taker** | Take customer orders, manage room assignments |
| **Admin** | Full system access, user management, analytics |

## 🌟 Key Features

- **Real-time Updates**: Live order status updates across all interfaces
- **Mobile Responsive**: Optimized for tablets and mobile devices used in kitchen environments
- **Multi-language Support**: Thai and English language support
- **Dark Mode**: Eye-friendly dark theme for kitchen environments
- **Export Functionality**: Export orders and analytics data
- **Audit Trail**: Complete order and user activity logging
- **Fast Performance**: Powered by Vite for lightning-fast development and builds

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized builds. Key configurations include:
- TypeScript support
- Path aliases for clean imports
- Environment variable handling
- Optimized build output

### Tailwind CSS
Custom Tailwind configuration includes:
- Custom color palette for kitchen/restaurant theme
- Responsive breakpoints
- Custom components and utilities
- Dark mode support

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement responsive design
- Write meaningful commit messages
- Add proper error handling

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Tushar Saini** - *Initial work* - [@tusharsaini-05](https://github.com/tusharsaini-05)

## 🙏 Acknowledgments

- Built with React, Vite, and Supabase
- Designed for real-world hotel and restaurant operations
- Inspired by modern kitchen management workflows
- Tailwind CSS for rapid UI development


---

**Live Demo**: [kitchen-navy.vercel.app](https://kitchen-navy.vercel.app)
```
```


# Fable Ebooks Sharing Platform - Client

This is the frontend client for the Fable Ebooks Sharing Platform, a modern digital publishing and ebook-sharing platform built with Next.js.

## Project Overview

Fable allows writers to publish original ebooks, readers to discover and purchase ebooks, and administrators to manage the entire platform.

## Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS v4** - Styling
- **HeroUI v3** - UI component library
- **Better Auth** - Authentication (email/password + Google OAuth)
- **MongoDB** - Database (via Better Auth adapter)
- **Motion** - Animations
- **Lucide React** - Icons
- **React Icons** - Additional icons

## Features

### Authentication
- Email/password registration and login
- Google OAuth integration
- Role-based access control (reader, writer, admin)
- Session persistence

### Public Pages
- **Home Page** - Hero section, featured ebooks, top writers, genre grid
- **Browse Ebooks** - Search, filter by genre/price, sort, pagination
- **Ebook Details** - Full ebook information, purchase action, bookmark

### Reader Dashboard
- Purchase history
- Purchased ebooks gallery
- Bookmarks management
- Profile management

### Writer Dashboard
- Ebook management (create, edit, delete, publish/unpublish)
- Sales history
- Writer verification status
- Verification payment flow

### Admin Dashboard
- User management
- Ebook management
- Transaction management
- Platform analytics with charts

### Payment Integration
- Stripe Checkout for ebook purchases
- Stripe Checkout for writer verification fee
- Payment success/cancel pages

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fable-ebooks-sharing-client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Configure environment variables (see below)

5. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000` by default.

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```env
# Backend API URL
NEXT_PUBLIC_SERVER_URL=http://localhost:8000

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB URI (for Better Auth)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# Database Name
DATABASE_NAME=fable_ebook_platform

# Better Auth
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

## MongoDB Configuration

The frontend uses MongoDB through Better Auth for session storage. Configure the same MongoDB URI as the backend server.

## Google OAuth Setup

1. Go to Google Cloud Console
2. Create a new OAuth 2.0 client ID
3. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - Your production URL with the same path
4. Copy the Client ID and Client Secret to your `.env` file

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (auth)
│   ├── browse/            # Browse ebooks page
│   ├── dashboard/         # Role-based dashboards
│   │   ├── admin/         # Admin dashboard
│   │   ├── reader/        # Reader dashboard
│   │   └── writer/        # Writer dashboard
│   ├── payment/           # Payment success/cancel pages
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable components
│   ├── admin/             # Admin-specific components
│   ├── reader/            # Reader-specific components
│   ├── writer/            # Writer-specific components
│   ├── BrowsePage.jsx     # Main browse component
│   ├── EbookCard.jsx      # Ebook display card
│   ├── Navbar.jsx         # Navigation
│   └── Footer.jsx         # Footer
└── lib/                   # Utilities
    ├── action/            # Server actions (API calls)
    ├── auth.js            # Better Auth configuration
    ├── auth-client.js     # Better Auth client
    ├── auth-backend.js    # JWT token exchange
    ├── core/              # Core utilities (API helper)
    └── queries/           # Data fetching functions
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` folder.

## Running Production Build

```bash
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

The build command is `npm run build` and the start command is `npm start`.

### Other Platforms

Ensure your platform supports Next.js and configure the appropriate build and start commands.

## Important Notes

- Never commit `.env` files with real credentials
- Use different Google OAuth credentials for development and production
- Ensure `NEXT_PUBLIC_SERVER_URL` points to your production backend
- MongoDB URI should be the same as the backend server for Better Auth

## Development

The project uses Next.js 16 with the App Router and React 19.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Design System

The application uses a dark theme with Tailwind CSS v4. Key design choices:

- Dark navy background (slate-950)
- Amber accent color for primary actions
- Editorial-inspired clean design
- Responsive layouts for all screen sizes
- Subtle animations using Motion

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

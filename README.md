# The Findery

A platform to discover Australia's best emerging fashion brands through smart search and curated discovery.

## Features

### 🔍 Smart Search
- **Pinterest Board Analysis**: Paste a Pinterest board URL and get Australian brand suggestions that match your aesthetic
- **AI-Powered Search**: Describe what you're looking for and let AI find the perfect brands
- **Advanced Filters**: Filter by price, category, sustainability, and more

### 👤 User Profiles
- Personal profile with saved items and lists
- Instagram-style stats display
- Member since tracking

### 🎨 Discovery Feed
- Curated products from independent Australian brands
- Easy-to-browse product grid
- Brand information and product details

### 🔐 Authentication
- Email/password sign up and sign in
- Google OAuth integration
- Protected routes for authenticated users

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Serverless Functions**: Netlify Functions
- **AI Integration**: OpenAI / Anthropic Claude
- **Routing**: React Router v6

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Supabase account
- (Optional) Pinterest API access
- (Optional) OpenAI or Anthropic API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/the-findery.git
cd the-findery
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
PINTEREST_ACCESS_TOKEN=your-pinterest-token (optional)
OPENAI_API_KEY=your-openai-key (optional)
```

4. Set up Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Disable email confirmation: Authentication → Providers → Email → Turn OFF "Confirm email"
   - (Optional) Enable Google OAuth: Authentication → Providers → Google

5. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Development with Netlify Functions

To test serverless functions locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run dev server with functions
netlify dev
```

This will start the app on `http://localhost:8888` with functions available.

## Project Structure

```
the-findery/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Header/        # Navigation header
│   │   └── ProtectedRoute/ # Auth route wrapper
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── lib/               # Third-party integrations
│   │   └── supabase.ts    # Supabase client
│   ├── utils/             # Utility functions
│   │   └── pinterest.ts   # Pinterest URL parsing
│   ├── views/             # Page components
│   │   ├── Discover/      # Discovery feed
│   │   ├── Profile/       # User profile
│   │   ├── Search/        # Smart search
│   │   ├── UserLogin/     # Auth page
│   │   └── Waitlist/      # Landing page
│   └── App.tsx            # Main app component
├── netlify/
│   └── functions/         # Serverless functions
│       └── analyze-pinterest-board.ts
├── tailwind.config.js     # Tailwind configuration
└── PINTEREST_SETUP.md     # Pinterest setup guide
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `netlify dev`
Runs the app with Netlify functions at [http://localhost:8888](http://localhost:8888)

## Features in Detail

### Pinterest Board Analysis

The Pinterest analysis feature works in three stages:

1. **URL Parsing**: Validates and extracts board information from Pinterest URLs
2. **API Integration**: Fetches board pins via Pinterest API (or uses mock data in development)
3. **AI Analysis**: Uses OpenAI/Claude to analyze pins and suggest matching Australian brands

**Currently**: Works with mock data out of the box. See [PINTEREST_SETUP.md](PINTEREST_SETUP.md) for production setup.

**Example URL**: `https://www.pinterest.com.au/username/board-name/`

### Authentication Flow

1. User signs up/in via email or Google OAuth
2. Supabase creates session and stores in localStorage
3. AuthContext provides user data to all components
4. ProtectedRoute guards authenticated pages
5. Session persists across browser refreshes

See authentication flow diagram in codebase documentation.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `REACT_APP_SUPABASE_URL` | Yes | Your Supabase project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | Yes | Your Supabase anonymous key |
| `PINTEREST_ACCESS_TOKEN` | No | Pinterest API access token (for production) |
| `OPENAI_API_KEY` | No | OpenAI API key (for AI analysis) |
| `ANTHROPIC_API_KEY` | No | Anthropic API key (alternative to OpenAI) |

## Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy!

Build settings:
- Build command: `npm run build`
- Publish directory: `build`
- Functions directory: `netlify/functions`

## Color Theme

The app uses a custom Tailwind theme inspired by The Iconic:

- **Primary**: `#5F2C14` (Deep brown)
- **Accent Orange**: `#E07C3B` (Warm orange)
- **Accent Cream**: `#F5E6D3` (Soft cream)
- **Font**: Instrument Sans

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For help with:
- **Pinterest API**: See [PINTEREST_SETUP.md](PINTEREST_SETUP.md)
- **Supabase**: Check [Supabase docs](https://supabase.com/docs)
- **General issues**: Open an issue on GitHub

## Roadmap

- [ ] AI-powered text search implementation
- [ ] Brand database with vector embeddings
- [ ] Saved lists functionality
- [ ] Boards feature
- [ ] Following brands
- [ ] Product detail pages
- [ ] Shopping cart integration
- [ ] Brand partnerships dashboard

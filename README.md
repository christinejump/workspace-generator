# Workspace Generator

A full-stack application for generating professional content with customizable tone and length.

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Architecture**: Full-stack with API proxy in development

## Project Structure

```
/app
├── src/                          # Frontend source code
│   ├── components/               # React components
│   ├── lib/                      # Frontend utilities & API client
│   └── App.tsx                   # Main app component
├── server/                       # Backend source code
│   ├── src/
│   │   ├── index.ts             # Express server entry point
│   │   ├── routes/
│   │   │   └── api.ts           # API routes
│   │   └── utils/
│   │       └── mockGenerator.ts # Mock text generation logic
│   ├── dist/                    # Backend compiled output
│   └── tsconfig.json            # Backend TypeScript config
├── dist/                        # Frontend production build
├── package.json                 # Dependencies & scripts
└── vite.config.ts              # Vite configuration with proxy
```

## API Endpoints

### GET /api/health
Health check endpoint
- **Response**: `{ ok: true }`

### POST /api/generate
Generate content based on form data
- **Request Body**:
  ```json
  {
    "topic": "string",
    "tone": "Friendly" | "Professional" | "Direct",
    "outputLength": "Short" | "Medium" | "Long",
    "input": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "output": "generated mock text..."
  }
  ```

### POST /api/save
Save generated content (stub implementation)
- **Request Body**:
  ```json
  {
    "content": "string"
  }
  ```
- **Response**: 
  ```json
  {
    "saved": true
  }
  ```

## Development Workflow

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Run Development Mode
Starts both Vite dev server (port 5173) and Express server (port 3001):
```bash
npm run dev
```

This command uses `concurrently` to run:
- Frontend dev server: `npm run dev:frontend` (Vite on port 5173)
- Backend dev server: `npm run dev:backend` (Express on port 3001)

The Vite dev server proxies `/api/*` requests to the Express server automatically.

### Access the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/api/health

## Production Workflow

### Build for Production
```bash
npm run build
```

This command:
1. Builds the frontend (`vite build`) → creates `dist/` folder
2. Compiles the backend TypeScript (`npm run build:backend`) → creates `server/dist/` folder

### Run Production Server
```bash
npm start
```

This starts the Express server which:
- Serves the production frontend from `dist/`
- Provides API endpoints at `/api/*`
- Handles React routing (returns `index.html` for all non-API routes)

The production server runs on port 3001 by default (configurable via `PORT` environment variable).

### Access Production App
- Visit: http://localhost:3001
- API: http://localhost:3001/api

## Key Features

### Development
- ✅ Hot Module Replacement (HMR) for React
- ✅ TypeScript watch mode for backend
- ✅ Automatic API proxy (no CORS issues)
- ✅ Concurrent dev servers with single command

### Production
- ✅ Optimized frontend build
- ✅ Compiled TypeScript backend
- ✅ Single server serves both frontend and API
- ✅ Proper React Router support

### API
- ✅ Mock text generation (3 tones × 3 lengths = 9 variants)
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ JSON request/response

## Configuration

### Vite Proxy (Development)
Located in `vite.config.ts`:
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

### Backend Port
Default: 3001
Override with environment variable:
```bash
PORT=4000 npm start
```

## Testing the API

### Test Health Endpoint
```bash
curl http://localhost:3001/api/health
```

### Test Generate Endpoint
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Project Update",
    "tone": "Professional",
    "outputLength": "Medium",
    "input": "We completed the frontend redesign and backend integration"
  }'
```

### Test Save Endpoint
```bash
curl -X POST http://localhost:3001/api/save \
  -H "Content-Type: application/json" \
  -d '{"content": "Some generated content"}'
```

## Files Changed/Added

### New Files
- `server/src/index.ts` - Express server
- `server/src/routes/api.ts` - API routes
- `server/src/utils/mockGenerator.ts` - Mock text generation
- `server/tsconfig.json` - Backend TypeScript config
- `.gitignore` - Git ignore rules

### Modified Files
- `package.json` - Added backend dependencies and scripts
- `vite.config.ts` - Added API proxy configuration
- `src/lib/api.ts` - Changed from mock to real API calls
- `src/App.tsx` - Added save functionality
- `src/components/ActionButtons.tsx` - Enabled save button
- `README.md` - This file

## Next Steps

To add real functionality:
1. Replace mock generation with actual AI API (OpenAI, Anthropic, etc.)
2. Implement real save functionality (database, Google Sheets API, etc.)
3. Add authentication
4. Add rate limiting
5. Add request logging
6. Deploy to production

## Notes

- Still using **mocked** text generation - no external API calls
- Save endpoint is a **stub** - returns success but doesn't actually save
- No database configured yet
- No authentication/authorization
- CORS is wide open (secure for production deployment)

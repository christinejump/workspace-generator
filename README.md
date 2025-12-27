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

### Run Production Server (Local Testing)
```bash
npm start
```

This starts **both** frontend and backend servers concurrently:
- Frontend: Vite preview server on port 3000
- Backend: Express API server on port 8001

### Production Deployment (Emergent/Kubernetes)

The application uses **Supervisor** to manage both services:

**Supervisor Configuration:** `/etc/supervisor/conf.d/supervisord.conf`

```ini
[program:backend]
command=node server/dist/index.js
environment=NODE_ENV="production",PORT="8001"

[program:frontend]
command=npx vite preview --port 3000 --host 0.0.0.0
```

**Deploy Steps:**
1. Build: `npm run build`
2. Start supervisor: `sudo supervisorctl restart all`
3. Access via Kubernetes ingress

**Ports:**
- Frontend: `3000` (serves static built files)
- Backend API: `8001` (handles /api/* requests)

**Health Checks:**
- Backend: `GET http://localhost:8001/api/health` → `{"ok":true}`
- Backend Root: `GET http://localhost:8001/` → `{"status":"ok","service":"workspace-generator-backend"}`

## Key Features

### Development
- ✅ Hot Module Replacement (HMR) for React
- ✅ TypeScript watch mode for backend
- ✅ Automatic API proxy (no CORS issues)
- ✅ Concurrent dev servers with single command

### Production
- ✅ Optimized frontend build
- ✅ Compiled TypeScript backend
- ✅ Separate frontend (port 3000) and backend (port 8001) services
- ✅ Supervisor manages both processes
- ✅ Proper React Router support
- ✅ Health check endpoints

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
Default: 8001 (required for Emergent deployment)
Override with environment variable:
```bash
PORT=8001 npm run start:backend
```

### Frontend Port
Default: 3000 (required for Emergent deployment)
Fixed in Vite preview configuration

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

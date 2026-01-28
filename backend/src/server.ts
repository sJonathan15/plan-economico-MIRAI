import dotenv from 'dotenv';
// Load environment variables at the very beginning
dotenv.config();

import express from 'express';
import cors from 'cors';
import routes from './routes';
import binaryRoutes from './routes/binaryRoutes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// --- CORS config (Astro dev server) ---
const corsOptions: cors.CorsOptions = {
    origin: true,
    credentials: true,
};


// ✅ Enable CORS for all requests
app.use(cors(corsOptions));

// ✅ IMPORTANT: respond to preflight requests (OPTIONS) for ALL routes
app.options('*', cors(corsOptions));

// 🚀 MOUNT BINARY ROUTES BEFORE BODY PARSERS
app.use('/api/binary', binaryRoutes);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional: ensure proper caching behavior for multiple origins
app.use((req, res, next) => {
    res.header('Vary', 'Origin');
    next();
});

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes (mounted under /api)
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});

// ===============================
// SERVE FRONTEND (PRODUCTION)
// ===============================

const frontendDistPath = path.join(__dirname, '../../frontend/dist');

// Serve static frontend files
app.use(express.static(frontendDistPath));

// Let frontend handle client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});


// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API available at http://localhost:${PORT}/api`);
    console.log(`🏥 Health check at http://localhost:${PORT}/health`);
});

export default app;

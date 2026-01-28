import { Router } from 'express';
import * as planController from '../controllers/planController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// 🚀 CRITICAL: This route is for binary binary download and MUST NOT be processed by body-parsers.
// It is mounted in server.ts BEFORE express.json()
router.get('/plans/:id/export', authMiddleware, planController.exportPlan);
router.post('/plans/:id/export', authMiddleware, planController.exportPlan);

export default router;

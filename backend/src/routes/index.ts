import { Router } from 'express';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import * as entrepreneurshipController from '../controllers/entrepreneurshipController';
import * as planController from '../controllers/planController';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/verify-password', authMiddleware, authController.verifyPassword);
router.post('/auth/forgot-password', authController.forgotPassword);
router.post('/auth/reset-password', authController.resetPassword);

// Generic upload (pre-creation)
router.post('/upload/image', authMiddleware, upload.single('image'), entrepreneurshipController.uploadImageGeneric);

// User routes (protected)
router.get('/users/me', authMiddleware, userController.getProfile);
router.put('/users/me', authMiddleware, userController.updateProfile);
router.put('/users/me/password', authMiddleware, userController.changePassword);
router.post('/users/me/images', authMiddleware, upload.single('image'), userController.updateImages);

// Entrepreneurship routes (protected)
router.post('/entrepreneurships', authMiddleware, entrepreneurshipController.createEntrepreneurship);
router.get('/entrepreneurships', authMiddleware, entrepreneurshipController.getEntrepreneurships);
router.get('/entrepreneurships/:id', authMiddleware, entrepreneurshipController.getEntrepreneurship);
router.put('/entrepreneurships/:id', authMiddleware, entrepreneurshipController.updateEntrepreneurship);
router.delete('/entrepreneurships/:id', authMiddleware, entrepreneurshipController.deleteEntrepreneurship);
router.post('/entrepreneurships/:id/image', authMiddleware, upload.single('image'), entrepreneurshipController.updateImage);
router.post('/entrepreneurships/:id/logo', authMiddleware, upload.single('image'), entrepreneurshipController.updateLogo);
router.post('/entrepreneurships/:id/supply-chain-image', authMiddleware, upload.single('image'), entrepreneurshipController.updateSupplyChainImage);

// Plan routes (protected)
router.post('/plans', authMiddleware, planController.createPlan);
router.get('/plans', authMiddleware, planController.getPlans);
router.get('/plans/:id', authMiddleware, planController.getPlan);
router.put('/plans/:id', authMiddleware, planController.updatePlan);
router.delete('/plans/:id', authMiddleware, planController.deletePlan);
router.delete('/documents/:id', authMiddleware, planController.deleteDocument);
// router.post('/plans/:id/export', authMiddleware, planController.exportPlan); // MOVED to binaryRoutes.ts
router.use((req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

export default router;

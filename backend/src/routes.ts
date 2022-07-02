import express from 'express';
import projectRouter from './routes/project';
const router = express.Router();

router.use('/projects', projectRouter);

export default router;


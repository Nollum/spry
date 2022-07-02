import { 
    getProject, 
    getAllProjects, 
    createProject, 
    deleteProject, 
    updateProject
} from '../controllers/project';
import checkJwt from '../middleware/auth';
import express from 'express';

const router = express.Router();

router.get('/', checkJwt, getAllProjects);
router.post('/', checkJwt, createProject);
router.get('/:id', checkJwt, getProject);
router.delete('/:id', checkJwt, deleteProject);
router.put('/:id', checkJwt, updateProject);

export default router;


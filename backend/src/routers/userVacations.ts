import { Router } from 'express';
import { allVacations } from '../controllers/vacation/vacationController';

const router = Router();

router.get('/', allVacations);

export default router;

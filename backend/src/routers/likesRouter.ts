import { Router } from 'express';
import { getLikesDistribution, getUserLikes, likeVacation, unlikeVacation } from '../controllers/likes/likeController';
import validation from '../middlewares/validation';
import { likeValidator, unlikeValidator } from '../controllers/likes/likeValidator';

const router = Router();

router.post('/like/:vacationId', validation(likeValidator), likeVacation);
router.post('/unlike/:vacationId', validation(unlikeValidator), unlikeVacation);
router.get('/liked/:userId', getUserLikes);
router.get('/all', getLikesDistribution);
export default router;

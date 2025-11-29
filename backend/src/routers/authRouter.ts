import { Router } from 'express';
import validation from '../middlewares/validation';
import { loginValidator, signupValidator } from '../controllers/auth/authValidator';
import { login, signup } from '../controllers/auth/authController';
// import validation from "../middlewares/validation"

const router = Router();

router.post('/signup', validation(signupValidator), signup);
router.post('/login', validation(loginValidator), login);

export default router;

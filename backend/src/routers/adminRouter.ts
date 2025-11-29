import { Router } from 'express';
import { createVacation, updateVacation, deleteVacation } from '../controllers/admin/adminController';
import validation from '../middlewares/validation';
import { deleteVacationValidator, newVacationValidator, updateVacationValidator } from '../controllers/admin/adminValidator';
import enforceAuth from '../middlewares/enforce-auth';
import fileUploader from '../middlewares/file-uploader';

const router = Router();

router.post('/', enforceAuth(true), validation(newVacationValidator), fileUploader, createVacation);
router.patch('/:id', enforceAuth(true), validation(updateVacationValidator), updateVacation);
router.delete('/:id', enforceAuth(true), validation(deleteVacationValidator), deleteVacation);

export default router;

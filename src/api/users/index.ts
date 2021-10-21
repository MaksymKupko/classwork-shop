import { Router } from 'express';
import { getUsers } from './get';
import { postUsers } from './post';
import { putUsers } from './put';
import { deleteUsers } from './delete';
import { patchUsers } from './patch';

const router = Router();

router.get('/', getUsers);
router.post('/', postUsers);
router.put('/', putUsers);
router.delete('/', deleteUsers);
router.patch('/', patchUsers);

export default router; 
		
import { Router } from 'express';
import { getItems } from './get';
import { postItems } from './post';
import { putItems } from './put';
import { deleteItems } from './delete';
import { patchItems } from './patch';

const router = Router();

router.get('/', getItems);
router.post('/', postItems);
router.put('/', putItems);
router.delete('/', deleteItems);
router.patch('/', patchItems);

export default router; 
		
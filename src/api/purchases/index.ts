import { Router } from 'express';
import { getPurchases } from './get';
import { postPurchases } from './post';
import { putPurchases } from './put';
import { deletePurchases } from './delete';
import { patchPurchases } from './patch';

const router = Router();

router.get('/', getPurchases);
router.post('/', postPurchases);
router.put('/', putPurchases);
router.delete('/', deletePurchases);
router.patch('/', patchPurchases);

export default router; 
		
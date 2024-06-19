import express from 'express';
import { checkForUsername , updateProfileDetails , updateProfilePicture , updateSocials } from '../controllers/profile';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/checkForUsername', checkForUsername);
router.post('/updateProfile' , auth , updateProfileDetails);
router.post('/updateSocials' , auth , updateSocials);
router.post('/updaetProfileImage' , auth , updateProfilePicture);

export default router;
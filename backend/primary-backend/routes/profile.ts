import express from 'express';
import { checkForUsername , updateProfileDetails , updateProfilePicture , updateSocials  ,getUserByUsername , updateUsername, deleteProfile} from '../controllers/profile';
import { auth } from '../middlewares/auth';

const router = express.Router();

router.post('/checkForUsername', checkForUsername);
router.post('/updateProfile' , auth , updateProfileDetails);
router.post('/updateSocials' , auth , updateSocials);
router.post('/updaetProfileImage' , auth , updateProfilePicture);
router.post('/getUserByUsername' , getUserByUsername);
router.post('/updateUsername' , auth , updateUsername);
router.post('/deleteProfile' , auth , deleteProfile)

export default router;
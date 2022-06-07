import express, {Request, Response} from "express";
import {
    processGetEmailForm,
    showCheckEmailForm,
    showGetEmailForm,
    showNewPasswordForm,
    updatePassword,
    showEnterMobileForm,
    processEnterMobileForm, submitMobileVerificationCode, checkEmailOtp
} from "../controllers/create-account";
import {emailValidator} from "../middleware/emailValidator";
import {mobileValidator} from "../middleware/mobileValidator";

const router = express.Router();

router.get('/create-account-or-sign-in', (req: Request, res: Response) => {
    res.render('create-account-or-sign-in.njk');
});
router.get('/create/get-email', showGetEmailForm);
router.post('/create/get-email', emailValidator, processGetEmailForm);

router.get('/create/check-email', showCheckEmailForm);
router.post('/create/check-email', checkEmailOtp);

router.get('/create/update-password', showNewPasswordForm);
router.post('/create/update-password', updatePassword);

router.get('/create/enter-mobile', showEnterMobileForm);
router.post('/create/enter-mobile', mobileValidator, processEnterMobileForm);

router.post('/create/verify-phone-code', submitMobileVerificationCode);

export default router;
import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import TokenValidation from '../middlewares/auth.middleware';

const loginController = new LoginController();
const tokenValidation = new TokenValidation();

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  tokenValidation.validateToken,
  (req: Request, res: Response) => LoginController.getRole(req, res),
);

export default router;

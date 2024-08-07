import { Request, Router, Response, NextFunction } from 'express';
import LoginController from '../controllers/LoginController';
import TokenValidation from '../middlewares/auth.middleware';

const loginController = new LoginController();
const tokenValidation = new TokenValidation();

const router = Router();

router.post('/', (req: Request, res: Response) => loginController.login(req, res));
router.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) =>
    tokenValidation.validateToken(req, res, next),
  (req: Request, res: Response) => LoginController.getRole(req, res),
);

export default router;

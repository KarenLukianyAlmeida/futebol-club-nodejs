import { Request, Router, Response, NextFunction } from 'express';
import TokenValidation from '../middlewares/auth.middleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const tokenValidation = new TokenValidation();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  (req: Request, res: Response, next: NextFunction) =>
    tokenValidation.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.endMatch(req, res),
);

router.patch(
  '/:id',
  (req: Request, res: Response, next: NextFunction) =>
    tokenValidation.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.updateGoals(req, res),
);

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) =>
    tokenValidation.validateToken(req, res, next),
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;

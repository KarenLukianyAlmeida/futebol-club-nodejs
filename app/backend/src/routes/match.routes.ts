import { Request, Router, Response, NextFunction } from 'express';
import TokenValidation from '../middlewares/auth.middleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
const tokenValidation = new TokenValidation();
console.log(tokenValidation.validateToken);
const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.use(
  (req: Request, res: Response, next: NextFunction) =>
    tokenValidation.validateToken(req, res, next),
);
// router.use(tokenValidation.validateToken);
router.patch('/:id/finish', (req: Request, res: Response) => matchController.endMatch(req, res));

export default router;

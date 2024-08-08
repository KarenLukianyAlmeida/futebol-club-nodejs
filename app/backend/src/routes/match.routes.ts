import { Request, Router, Response } from 'express';
// import TokenValidation from '../middlewares/auth.middleware';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();
// const tokenValidation = new TokenValidation();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default router;

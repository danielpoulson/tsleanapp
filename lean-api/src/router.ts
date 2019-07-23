import { Router, Request, Response, NextFunction } from 'express';
import { getDailyTrend } from './controllers/Daily';
import { getLineData, getMonthlyLineData } from './controllers/Line';

import { getShiftSeq } from './utils/helpers';

let returned: Object;
const test = (req: Request, res: Response, next: NextFunction) => {
    try {
        returned = getShiftSeq();
        next();
    } catch (e) {
        return res.status(401).end();
    }
};

const router = Router();

router.get('/oee', getDailyTrend);
router.get('/line/:id', getLineData);
// router.get('/monthlyline', getMonthlyLineData);
router.get('/test', test, (req, res) => res.send({ returned }));

export default router;

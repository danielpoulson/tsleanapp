import { Response, Request } from 'express';
import { getShiftSeq } from '../utils/helpers';
import { loadMain } from '../db/sqldata';

export const getDailyTrend = async (req: Request, res: Response) => {
    const shiftseq = getShiftSeq();

    loadMain(shiftseq).then(items => {
        res.send(items);
    });
};

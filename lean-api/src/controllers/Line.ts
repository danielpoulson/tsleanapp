import { Request, Response } from 'express';
import { getShiftSeq } from '../utils/helpers';
import { callDB, monthlyLineData } from '../db/sqldata';

// const mthOEE = [{ line: 1, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
const mthOEE = [
    { line: 1, oeedata: [0, 0, 30.0, 38.9, 51.9, 41.3, 0, 0, 0, 0, 0, 0] },
    { line: 2, oeedata: [0, 0, 46.0, 40.1, 52.1, 46.5, 0, 0, 0, 0, 0, 0] },
    { line: 3, oeedata: [0, 0, 26.8, 27.1, 48.9, 55.3, 0, 0, 0, 0, 0, 0] },
    { line: 4, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { line: 5, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { line: 6, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { line: 7, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

// TODO:  Fix harded coded month

export const getLineData = async (req: Request, res: Response) => {
    const shiftseq = getShiftSeq();
    const lineOEETrend = mthOEE.find(e => e.line == req.params.id);

    callDB(shiftseq, '201906010', req.params.id).then(items => {
        res.send({
            day: items.day,
            month: items.month,
            oeeTrend: lineOEETrend,
            downPareto: items.downPareto,
        });
    });
};

export const getMonthlyLineData = async (req: Request, res: Response) => {
    const shiftseq: string = '201906010';
    // const shiftseq = getShiftSeq()
    monthlyLineData(shiftseq).then(items => {
        res.send(items);
    });
};

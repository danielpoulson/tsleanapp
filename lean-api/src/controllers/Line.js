const { Request, Response } = require('express');
const { getShiftSeq } = require('../utils/helpers');
const { callDB, monthlyLineData } = require('../db/sqldata');

// const mthOEE = [{ line: 1, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }]
const mthOEE = [
    { line: 1, oeedata: [0, 0, 30.0, 38.9, 51.9, 41.3, 60, 0, 0, 0, 0, 0] },
    { line: 2, oeedata: [0, 0, 46.0, 40.1, 52.1, 46.5, 100, 0, 0, 0, 0, 0] },
    { line: 3, oeedata: [0, 0, 26.8, 27.1, 48.9, 55.3, 60, 0, 0, 0, 0, 0] },
    { line: 4, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { line: 5, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { line: 6, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { line: 7, oeedata: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

// TODO:  Fix harded coded month

exports.getLineData = async (req, res) => {
    const shiftseq = getShiftSeq();
    const lineOEETrend = mthOEE.find((e) => e.line == req.params.id);

    callDB(shiftseq, '201906010', req.params.id).then((items) => {
        res.send({
            day: items.day,
            month: items.month,
            oeeTrend: lineOEETrend,
            downPareto: items.downPareto,
        });
    });
};

exports.getMonthlyLineData = async (req, res) => {
    const shiftseq = '201906010';
    // const shiftseq = getShiftSeq()
    monthlyLineData(shiftseq).then((items) => {
        res.send(items);
    });
};

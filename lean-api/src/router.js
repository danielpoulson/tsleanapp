const { Router, Request, Response, NextFunction } = require('express');
const { getDailyTrend } = require('./controllers/Daily');
const { getLineData, getMonthlyLineData } = require('./controllers/Line');

const { getShiftSeq } = require('./utils/helpers');

let returned = {};
const test = (req, res, next) => {
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

module.exports = router;

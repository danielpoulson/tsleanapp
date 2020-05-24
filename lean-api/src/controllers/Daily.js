const { Response, Request } = require('express');
const { getShiftSeq } = require('../utils/helpers');
const { loadMain } = require('../db/sqldata');

exports.getDailyTrend = async (req, res) => {
    const shiftseq = getShiftSeq();

    loadMain(shiftseq).then((items) => {
        res.send(items);
    });
};

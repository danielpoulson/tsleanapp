import sql from 'mssql';
import moment from 'moment';
import { timeConvert } from '../utils/helpers';

const config = {
    user: 'deltapp',
    password: 'pa$$w0rd',
    server: '10.0.10.12',
    database: 'MATTEC_PROHELP',
};

const createMonthData = r => {
    const rtd = {};
    rtd.machno = r.MachNo;
    rtd.runtime = Math.round((r.TotalTime - r.DownTime) / 60);
    rtd.downtime = Math.round(r.DownTime / 60);
    rtd.downpc = ((r.DownTime / r.TotalTime) * 100).toFixed(1);
    rtd.units = r.Total;

    if (r.Total > 0) {
        rtd.avail = ((1 - r.DownTime / r.TotalTime) * 100).toFixed(1);
        rtd.perf = ((r.Total / r.Target) * 100).toFixed(1);
        rtd.oee = ((rtd.avail * rtd.perf) / 100).toFixed(1);
    }
    rtd.idle = 480 - (rtd.runtime + rtd.downtime);
    rtd.unitsmin = (r.Total / (rtd.runtime + rtd.downtime)).toFixed(1);
    return rtd;
};

const createDayData = (r, down) => {
    const rtd = {};
    const dnTotal = down.Total / 60;
    const runtime = r.RunTime;
    const downtime = r.DownTime;

    rtd.shiftseq = r.ShiftSeq;
    rtd.machno = r.MachNo;
    rtd.runtime = timeConvert(runtime);
    rtd.downtime = timeConvert(downtime);
    rtd.downpc = ((downtime / r.TotalTime) * 100).toFixed(1);
    rtd.units = r.Total;

    if (r.Total > 0) {
        rtd.avail = ((1 - downtime / r.TotalTime) * 100).toFixed(1);
        // rtd.perf = ((r.Total / (r.TotalTime - r.DownTime) * RunRate) * 100).toFixed(1)
        rtd.perf = ((r.Total / r.Target) * 100).toFixed(1);
        rtd.oee = ((rtd.avail * rtd.perf) / 100).toFixed(1);
    }
    rtd.idle = 480 - (runtime + downtime);
    rtd.unitsmin = (r.Total / (runtime + downtime)).toFixed(1);
    rtd.downnone = ((dnTotal / downtime) * 100).toFixed(1);
    return rtd;
};

const getTotalDownTime = rs => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.total;
    return rs.recordset.reduce(reducer, 0);
};

const createDownPareto = (rs, total) => {
    const labels = [];
    const values = [];
    const pareto = [];
    let cnt = 0;
    rs.recordset.forEach((r, i) => {
        if (i <= 8) {
            const val = ((r.total / total) * 100).toFixed(1);
            cnt = cnt + +val;
            labels.push(r.DownCode.trim());
            values.push(val);
            pareto.push(cnt.toFixed(1));
        }
    });

    return { labels, values, pareto };
};

// Not in use
export const monthlyLineData = async (laWhere: string) => {
    const queryMonth = `SELECT MachNo
  ,SUM([ExpProdQty]) Target
  ,SUM([CalProdQty]) Total
  ,SUM([DefectQty]) Defects
  ,SUM([TotTime]) AS TotalTime
  ,SUM([DownTime]) AS DownTime
  ,SUM([NumDownTm]) Down_Amounts 
  FROM [MATTEC_PROHELP].[dbo].[ShiftProd] 
  WHERE shiftseq = ${laWhere}
  Group By MachNo`;
    try {
        // make sure that any items are correctly URL encoded in the connection string
        sql.close();
        let pool = await sql.connect(config);
        const resultMonth = await pool.request().query(queryMonth);

        const month = createMonthData(resultMonth.recordset[0]);
        console.log(month);

        const data = [];
        data.push({ month });
        pool.close();
        return data;
    } catch (err) {
        console.error(err);
    }
};

export const loadMain = async shiftseq => {
    const query1 = `SELECT [MachNo]
     , SUM(((([TotTime]-[DownTime])/60) * [ExpCycTm])) As Target
     , SUM([CalProdQty]) As Total
     , SUM([TotTime] / 60) As TotalTime
     , SUM((TotTime - DownTime) / 60) As RunTime
     , SUM([DownTime] / 60) As DownTime
     , SUM([NumDownTm]) AS DownFreq
     FROM [MATTEC_PROHELP].[dbo].[vReportShift]
     WHERE ShiftSeq like '${shiftseq}%' AND JobSeq is not NULL
     GROUP By MachNo`;

    const query2 = `SELECT [MachNo]
  ,SUM([Qty]) Total
  ,SUM([NumOccur]) Occur
  FROM [MATTEC_PROHELP].[dbo].[ShiftDown]
  WHERE ShiftSeq like '${shiftseq}%' AND DownNo = '1'
  Group By MachNo`;

    try {
        // make sure that any items are correctly URL encoded in the connection string
        sql.close();
        let pool = await sql.connect(config);
        const results = await pool.request().query(query1);

        const down = await pool.request().query(query2);

        const data = results.recordset.map((rs, i) => {
            return createDayData(rs, down.recordset[i]);
        });

        pool.close();
        return data;
    } catch (err) {
        console.error(err);
    }
};

// TODO: Fix hard coded down query

export const callDB = async (shiftseq, monthseq, id) => {
    const data = {};

    const query1 = `SELECT [MachNo]
     , SUM(((([TotTime]-[DownTime])/60) * [ExpCycTm])) As Target
     , SUM([CalProdQty]) As Total
     , SUM([TotTime] / 60) As TotalTime
     , SUM((TotTime - DownTime) / 60) As RunTime
     , SUM([DownTime] / 60) As DownTime
     , SUM([NumDownTm]) AS DownFreq
     FROM [MATTEC_PROHELP].[dbo].[vReportShift]
     WHERE ShiftSeq like '${shiftseq}%' AND MachNo = ${id} AND JobSeq is not NULL
     GROUP By MachNo`;

    const query2 = `SELECT [MachNo]
  ,SUM([Qty]) Total
  ,SUM([NumOccur]) Occur
  FROM [MATTEC_PROHELP].[dbo].[ShiftDown]
  WHERE ShiftSeq like '${shiftseq}%' AND DownNo = '1' AND MachNo = ${id}
  Group By MachNo`;

    const queryMonth = `SELECT MachNo
  ,SUM([ExpProdQty]) Target
  ,SUM([CalProdQty]) Total
  ,SUM([DefectQty]) Defects
  ,SUM([TotTime]) AS TotalTime
  ,SUM([DownTime]) AS DownTime
  ,SUM([NumDownTm]) Down_Amounts 
  FROM [MATTEC_PROHELP].[dbo].[ShiftProd] 
  WHERE ShiftSeq >= '${monthseq}' AND MachNo = ${id}
  Group By MachNo`;

    const downQuery = `
  SELECT MachNo, s.DownNo, c.DownCode, SUM([Qty]) total, SUM([NumOccur]) occ
  FROM [MATTEC_PROHELP].[dbo].[ShiftDown] s
  INNER JOIN DownCodes c ON s.DownNo = c.DownNo
  WHERE ShiftSeq >= '201905270' AND MachNo = ${id}
  GROUP BY MachNo, s.DownNo, c.DownCode
  ORDER BY total DESC
`;

    try {
        // make sure that any items are correctly URL encoded in the connection string
        sql.close();
        let pool = await sql.connect(config);
        const result1 = await pool.request().query(query1);

        const down = await pool.request().query(query2);
        const resultMonth = await pool.request().query(queryMonth);
        const rsDownPareto = await pool.request().query(downQuery);

        const day = createDayData(result1.recordset[0], down.recordset[0]);

        const month = createMonthData(resultMonth.recordset[0]);

        const totalDownTime = await getTotalDownTime(rsDownPareto);
        const downPareto = createDownPareto(rsDownPareto, totalDownTime);

        data.day = day;
        data.month = month;
        data.downPareto = downPareto;
        pool.close();
        return data;
    } catch (err) {
        console.error(err);
    }
};

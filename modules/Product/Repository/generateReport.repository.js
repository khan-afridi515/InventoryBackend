import Product from '../model/modal.js';
import { reportData } from '../../../shared/ReportData.js';

/**
 * Helper to calculate period totals across records
 */
const calculateTotals = (records) => {
    return records.reduce(
        (acc, curr) => {
            acc.totalQtySold += curr.qtySold;
            acc.totalCost += curr.totalCost;
            acc.totalRevenue += curr.totalRevenue;
            acc.profitLoss += curr.profitLoss;
            return acc;
        },
        { totalQtySold: 0, totalCost: 0, totalRevenue: 0, profitLoss: 0 }
    );
};

/**
 * Helper to get week key (YYYY-Www) using ISO week calculation
 */
const getISOWeekKey = (dateStr) => {
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
};

/**
 * Generates Daily, Weekly, and Monthly aggregated sales reports.
 */
const generateReportRepository = async () => {
    try {
        const daily = {};
        const weekly = {};
        const monthly = {};

        reportData.forEach((item) => {
            const dayKey = item.date; // e.g. "2026-04-15"
            const weekKey = getISOWeekKey(item.date); // e.g. "2026-W16"
            const monthKey = item.date.slice(0, 7); // e.g. "2026-04"

            // 1. Group Daily
            if (!daily[dayKey]) daily[dayKey] = [];
            daily[dayKey].push(item);

            // 2. Group Weekly
            if (!weekly[weekKey]) weekly[weekKey] = [];
            weekly[weekKey].push(item);

            // 3. Group Monthly
            if (!monthly[monthKey]) monthly[monthKey] = [];
            monthly[monthKey].push(item);
        });

        // Format aggregated response output
        const formatAggregatedData = (groupedData) => {
            return Object.keys(groupedData).map((period) => {
                const records = groupedData[period];
                const totals = calculateTotals(records);

                return {
                    period,
                    summary: {
                        totalQtySold: totals.totalQtySold,
                        totalCost: Number(totals.totalCost.toFixed(2)),
                        totalRevenue: Number(totals.totalRevenue.toFixed(2)),
                        profitLoss: Number(totals.profitLoss.toFixed(2)),
                    },
                    records,
                };
            });
        };

        return {
            dailyReport: formatAggregatedData(daily),
            weeklyReport: formatAggregatedData(weekly),
            monthlyReport: formatAggregatedData(monthly),
        };
    } catch (error) {
        throw error;
    }
};

export { generateReportRepository };
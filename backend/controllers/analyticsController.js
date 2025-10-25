import {
  getAnalyticsData,
  getDailySalesData,
} from '../services/analyticsService.js';

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await getAnalyticsData();

    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    const dailySalesData = await getDailySalesData(startDate, endDate);

    return res.status(200).json({ analytics, dailySalesData });
  } catch (error) {
    console.error('Error in Analytics controller:', error);
    return res.status(500).json({ message: error.message });
  }
};

export function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

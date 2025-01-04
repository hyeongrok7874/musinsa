import axios from "axios";
const getMusinsaRankingURL = (period) => `https://api.musinsa.com/api2/hm/v2/pans/ranking/sections/199?period=${period}`;
const MUSINSA_NOW = getMusinsaRankingURL("REALTIME");
const MUSINSA_DAILY = getMusinsaRankingURL("DAILY");
const MUSINSA_WEEK = getMusinsaRankingURL("WEEKLY");
const MUSINSA_MONTH = getMusinsaRankingURL("MONTHLY");
const transformItemToRanking = (item) => {
    if (!item) {
        return;
    }
    const { image, info, onClick } = item;
    return {
        ranking: image.rank,
        img: image.url,
        brand: info.brandName,
        name: info.productName,
        price: info.finalPrice,
        link: onClick.url,
    };
};
const getRanking = async (url) => {
    try {
        const response = await axios.get(url);
        const modules = response?.data?.data?.modules ?? [];
        const validModules = modules.filter((module) => Array.isArray(module?.items));
        const goodsList = validModules.flatMap((module) => module.items);
        const ranking = goodsList
            .map((good) => transformItemToRanking(good))
            .filter((item) => !!item);
        return ranking;
    }
    catch (e) {
        return [];
    }
};
export const getNowRanking = () => getRanking(MUSINSA_NOW);
export const getDailyRanking = () => getRanking(MUSINSA_DAILY);
export const getWeeklyRanking = () => getRanking(MUSINSA_WEEK);
export const getMonthlyRanking = () => getRanking(MUSINSA_MONTH);

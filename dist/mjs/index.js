import axios from "axios";
const getMusinsaRankingURL = (period) => `https://ranking.musinsa.com/api/ranking/v1/goods/pan?period=${period}&size=100&goodsImageWidth=500&siteKindId=musinsa&newProduct=false&sex=A&age=ALL`;
const MUSINSA_NOW = getMusinsaRankingURL("now");
const MUSINSA_DAILY = getMusinsaRankingURL("day");
const MUSINSA_WEEK = getMusinsaRankingURL("week");
const MUSINSA_MONTH = getMusinsaRankingURL("month");
const MUSINSA_MONTH_3 = getMusinsaRankingURL("month_3");
const getRanking = async (url) => {
    try {
        const { data: { data: { goods }, }, } = await axios.get(url);
        return goods.map(({ rank, thumbnailURL, brandName, goodsName, price, linkURL }) => ({
            ranking: rank,
            img: thumbnailURL,
            brand: brandName,
            name: goodsName,
            price: price,
            link: linkURL,
        }));
    }
    catch (e) {
        return [];
    }
};
export const getNowRanking = () => getRanking(MUSINSA_NOW);
export const getDailyRanking = () => getRanking(MUSINSA_DAILY);
export const getWeeklyRanking = () => getRanking(MUSINSA_WEEK);
export const getMonthlyRanking = () => getRanking(MUSINSA_MONTH);
export const get3MonthlyRanking = () => getRanking(MUSINSA_MONTH_3);

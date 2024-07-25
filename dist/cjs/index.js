"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get3MonthlyRanking = exports.getMonthlyRanking = exports.getWeeklyRanking = exports.getDailyRanking = exports.getNowRanking = void 0;
const axios_1 = __importDefault(require("axios"));
const getMusinsaRankingURL = (period) => `https://ranking.musinsa.com/api/ranking/v1/goods/pan?period=${period}&size=100&goodsImageWidth=500&siteKindId=musinsa&newProduct=false&sex=A&age=ALL`;
const MUSINSA_NOW = getMusinsaRankingURL("now");
const MUSINSA_DAILY = getMusinsaRankingURL("day");
const MUSINSA_WEEK = getMusinsaRankingURL("week");
const MUSINSA_MONTH = getMusinsaRankingURL("month");
const MUSINSA_MONTH_3 = getMusinsaRankingURL("month_3");
const getRanking = async (url) => {
    try {
        const { data: { data: { goods }, }, } = await axios_1.default.get(url);
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
const getNowRanking = () => getRanking(MUSINSA_NOW);
exports.getNowRanking = getNowRanking;
const getDailyRanking = () => getRanking(MUSINSA_DAILY);
exports.getDailyRanking = getDailyRanking;
const getWeeklyRanking = () => getRanking(MUSINSA_WEEK);
exports.getWeeklyRanking = getWeeklyRanking;
const getMonthlyRanking = () => getRanking(MUSINSA_MONTH);
exports.getMonthlyRanking = getMonthlyRanking;
const get3MonthlyRanking = () => getRanking(MUSINSA_MONTH_3);
exports.get3MonthlyRanking = get3MonthlyRanking;

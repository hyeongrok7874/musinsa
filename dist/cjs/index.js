"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get3MonthlyRanking = exports.getMonthlyRanking = exports.getWeeklyRanking = exports.getDailyRanking = exports.getNowRanking = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const MUSINSA_NOW = "https://www.musinsa.com/ranking/best?period=now";
const MUSINSA_DAILY = "https://www.musinsa.com/ranking/best?period=day";
const MUSINSA_WEEK = "https://www.musinsa.com/ranking/best?period=week";
const MUSINSA_MONTH = "https://www.musinsa.com/ranking/best?period=month";
const MUSINSA_MONTH_3 = "https://www.musinsa.com/ranking/best?period=month_3";
const GET_IMG = "a.img-block > img";
const GET_BRAND = "div.article_info p.item_title > a";
const GET_NAME_AND_LINK = "div.article_info p.list_info > a";
const GET_PRICE = "div.article_info p.price";
const priceFilter = (price) => price.split("\n")[2].replace(/\s/g, "");
const getRanking = async (url) => {
    try {
        const { data } = await axios_1.default.get(url);
        const $ = cheerio_1.default.load(data);
        const body = $("div.li_inner");
        let ranking = [];
        body.map((i, item) => {
            ranking[i] = {
                ranking: i + 1,
                img: $(item).find(GET_IMG).attr("data-original") ?? "",
                brand: $(item).find(GET_BRAND).text() ?? "",
                name: $(item).find(GET_NAME_AND_LINK).attr("title") ?? "",
                price: priceFilter($(item).find(GET_PRICE).text()) ?? "",
                link: $(item).find(GET_NAME_AND_LINK).attr("href") ?? "",
            };
        });
        return ranking.length > 0 ? ranking : [];
    }
    catch (e) {
        throw e;
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

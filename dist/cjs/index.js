"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyRanking = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const MUSINSA_DAILY = "https://www.musinsa.com/ranking/best?period=day";
const GET_IMG = "a.img-block > img";
const GET_BRAND = "div.article_info p.item_title > a";
const GET_NAME_AND_LINK = "div.article_info p.list_info > a";
const GET_PRICE = "div.article_info p.price";
const priceFilter = (price) => price.split("\n")[2].replace(/\s/g, "");
const getDailyRanking = async () => {
    try {
        const { data } = await axios_1.default.get(MUSINSA_DAILY);
        const $ = cheerio_1.default.load(data);
        const body = $("div.li_inner");
        let dailyRanking = [];
        body.map((i, item) => {
            dailyRanking[i] = {
                img: $(item).find(GET_IMG).attr("data-original") ?? "",
                brand: $(item).find(GET_BRAND).text() ?? "",
                name: $(item).find(GET_NAME_AND_LINK).attr("title") ?? "",
                price: priceFilter($(item).find(GET_PRICE).text()) ?? "",
                link: $(item).find(GET_NAME_AND_LINK).attr("href") ?? "",
            };
        });
        return dailyRanking.length > 0 ? dailyRanking : [];
    }
    catch (e) {
        throw e;
    }
};
exports.getDailyRanking = getDailyRanking;

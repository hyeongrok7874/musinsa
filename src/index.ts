import axios from "axios";
import cheerio from "cheerio";

const MUSINSA_DAILY = "https://www.musinsa.com/ranking/best?period=day";
const GET_IMG = "a.img-block > img";
const GET_BRAND = "div.article_info p.item_title > a";
const GET_NAME_AND_LINK = "div.article_info p.list_info > a";
const GET_PRICE = "div.article_info p.price";

const priceFilter = (price: string) => price.split("\n")[2].replace(/\s/g, "");

export interface DailyRanking {
  img?: string;
  brand: string;
  name?: string;
  price: string;
  link?: string;
}

export const getDailyRanking = async (): Promise<DailyRanking[] | []> => {
  try {
    const { data } = await axios.get(MUSINSA_DAILY);
    const $ = cheerio.load(data);
    const body = $("div.li_inner");
    let dailyRanking: DailyRanking[] = [];
    body.map((i, item) => {
      dailyRanking[i] = {
        img: $(item).find(GET_IMG).attr("data-original"),
        brand: $(item).find(GET_BRAND).text(),
        name: $(item).find(GET_NAME_AND_LINK).attr("title"),
        price: priceFilter($(item).find(GET_PRICE).text()),
        link: $(item).find(GET_NAME_AND_LINK).attr("href"),
      };
    });
    return dailyRanking.length > 0 ? dailyRanking : [];
  } catch (e) {
    throw e;
  }
};
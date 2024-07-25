import axios from "axios";

type PeriodType = "now" | "day" | "week" | "month" | "month_3";

const getMusinsaRankingURL = (period: PeriodType) =>
  `https://ranking.musinsa.com/api/ranking/v1/goods/pan?period=${period}&size=100&goodsImageWidth=500&siteKindId=musinsa&newProduct=false&sex=A&age=ALL`;

const MUSINSA_NOW = getMusinsaRankingURL("now");
const MUSINSA_DAILY = getMusinsaRankingURL("day");
const MUSINSA_WEEK = getMusinsaRankingURL("week");
const MUSINSA_MONTH = getMusinsaRankingURL("month");
const MUSINSA_MONTH_3 = getMusinsaRankingURL("month_3");

export interface RankingType {
  ranking: number;
  img: string;
  brand: string;
  name: string;
  price: number;
  link: string;
}

interface GoodsType {
  linkURL: string;
  thumbnailURL: string;
  goodsNo: number;
  goodsName: string;
  brand: string;
  brandName: string;
  normalPrice: number;
  price: number;
  saleRate: number;
  hasCoupon: boolean;
  rank: number;
  isSoldOut: boolean;
}

interface GetRankingRes {
  data: {
    goods: GoodsType[];
  };
}

const getRanking = async (url: string): Promise<RankingType[]> => {
  try {
    const {
      data: {
        data: { goods },
      },
    } = await axios.get<GetRankingRes>(url);

    return goods.map(
      ({ rank, thumbnailURL, brandName, goodsName, price, linkURL }) => ({
        ranking: rank,
        img: thumbnailURL,
        brand: brandName,
        name: goodsName,
        price: price,
        link: linkURL,
      })
    );
  } catch (e) {
    return [];
  }
};

export const getNowRanking = () => getRanking(MUSINSA_NOW);
export const getDailyRanking = () => getRanking(MUSINSA_DAILY);
export const getWeeklyRanking = () => getRanking(MUSINSA_WEEK);
export const getMonthlyRanking = () => getRanking(MUSINSA_MONTH);
export const get3MonthlyRanking = () => getRanking(MUSINSA_MONTH_3);

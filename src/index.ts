import axios from "axios";

type PeriodType = "REALTIME" | "DAILY" | "WEEKLY" | "MONTHLY";

const getMusinsaRankingURL = (period: PeriodType) =>
  `https://api.musinsa.com/api2/hm/v2/pans/ranking/sections/199?period=${period}`;

const MUSINSA_NOW = getMusinsaRankingURL("REALTIME");
const MUSINSA_DAILY = getMusinsaRankingURL("DAILY");
const MUSINSA_WEEK = getMusinsaRankingURL("WEEKLY");
const MUSINSA_MONTH = getMusinsaRankingURL("MONTHLY");

export interface RankingType {
  ranking: number;
  img: string;
  brand: string;
  name: string;
  price: number;
  link: string;
}

interface Item {
  image: {
    rank: number;
    url: string;
  };
  info: {
    brandName: string;
    finalPrice: number;
    productName: string;
  };
  onClick: {
    url: string;
  };
}

interface Module {
  items?: Item[];
}

interface GetRankingRes {
  data: {
    modules: Module[];
  };
}

const transformItemToRanking = (item?: Item): RankingType | void => {
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

const getRanking = async (url: string): Promise<RankingType[]> => {
  try {
    const response = await axios.get<GetRankingRes>(url);
    const modules = response?.data?.data?.modules ?? [];

    const validModules = modules.filter((module) =>
      Array.isArray(module?.items)
    );

    const goodsList = validModules.flatMap((module) => module.items);

    const ranking = goodsList
      .map((good) => transformItemToRanking(good))
      .filter((item): item is RankingType => !!item);

    return ranking;
  } catch (e) {
    return [];
  }
};

export const getNowRanking = () => getRanking(MUSINSA_NOW);
export const getDailyRanking = () => getRanking(MUSINSA_DAILY);
export const getWeeklyRanking = () => getRanking(MUSINSA_WEEK);
export const getMonthlyRanking = () => getRanking(MUSINSA_MONTH);

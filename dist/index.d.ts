export interface RankingType {
    img: string;
    brand: string;
    name: string;
    price: string;
    link: string;
}
export declare const getNowRanking: () => Promise<[] | RankingType[]>;
export declare const getDailyRanking: () => Promise<[] | RankingType[]>;
export declare const getWeeklyRanking: () => Promise<[] | RankingType[]>;
export declare const getMonthlyRanking: () => Promise<[] | RankingType[]>;
export declare const get3MonthlyRanking: () => Promise<[] | RankingType[]>;

export interface RankingType {
    ranking: number;
    img: string;
    brand: string;
    name: string;
    price: number;
    link: string;
}
export declare const getNowRanking: () => Promise<RankingType[]>;
export declare const getDailyRanking: () => Promise<RankingType[]>;
export declare const getWeeklyRanking: () => Promise<RankingType[]>;
export declare const getMonthlyRanking: () => Promise<RankingType[]>;

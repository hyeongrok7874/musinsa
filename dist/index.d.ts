export interface DailyRankingType {
    img: string;
    brand: string;
    name: string;
    price: string;
    link: string;
}
export declare const getDailyRanking: () => Promise<DailyRankingType[] | []>;

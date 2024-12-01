import { atom, selector } from "recoil"


export type WordFrequency = {
    word: string;
    count: number;
    averageSentiment: number
}[];

type filterTrendResultTypes = {
    word: string,
    count: number,
    averageSentiment: number,
    avgLikes: number,
    avgRetweets: number

}

export const chartData = atom<WordFrequency>({
    key: 'chartDataState',
    default: []
})

export const filterTrend = atom({
    key: 'filterTrend',
    default: ""
})

export const filterTrendResult = atom<filterTrendResultTypes>({
    key: 'filterTrendResult',
    default: {
        word: "",
        count: 0,
        averageSentiment: 0,
        avgLikes: 0,
        avgRetweets: 0
    }
})

export const trendAtTop = selector({
    key: 'trendAtTop', // Unique key for this selector
    get: ({ get }) => {
        const data = get(chartData);
        return data.length > 0 ? data[0] : undefined;
    },
});
export const trendAtLast = selector({
    key: 'trendAtlast', // Unique key for this selector
    get: ({ get }) => {
        const data = get(chartData);

        return data.length > 0 ? data[data.length - 1] : undefined;
    },
});
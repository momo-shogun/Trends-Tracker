import { atom, selector } from "recoil"
import { WordFrequency } from "@/components/custom/TrendBar"

export const chartData = atom<WordFrequency>({
    key: 'chartDataState',
    default: []
})



export const trendAtTop = selector({
    key: 'trendAtTop', // Unique key for this selector
    get: ({ get }) => {
        const data = get(chartData);

        return data.length > 0 ? data[0] : undefined;
    },
});
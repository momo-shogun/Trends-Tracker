"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    useQuery,
} from '@tanstack/react-query';
import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chartData, WordFrequency } from "@/store/atoms";

// Define the data type for the updated API response


const chartConfig: ChartConfig = {
    frequency: {
        label: "Frequency",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

// Fetch the data from the API
const fetchTrend = async (): Promise<WordFrequency> => {
    const response = await axios.get<WordFrequency>('https://trends-tracker.onrender.com/trending');
    return response.data;
};

export function TrendBar() {
    const trendsData = useRecoilValue(chartData)
    const setChartData = useSetRecoilState(chartData)

    const { data, isError } = useQuery<WordFrequency>({
        queryKey: ['data'],
        queryFn: fetchTrend,
        refetchInterval: 1000,
    });


    useEffect(() => {
        if (data) {
            setChartData(data);
        }
    }, [data]);

    if (isError) return <p>Error loading data.</p>;

    return (
        <>
            <ChartContainer config={chartConfig}>
                <BarChart data={trendsData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="word" // trends data which field to display
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 10)} // Truncate word if necessary
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                        dataKey="count" // trends data which field to display
                        fill="hsl(var(--chart-1))"
                        radius={8}
                        animationDuration={1000}
                        isAnimationActive={true}
                    />

                </BarChart>
            </ChartContainer>
        </>
    );
}

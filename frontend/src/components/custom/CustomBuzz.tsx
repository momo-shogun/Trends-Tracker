import { Repeat2, ThumbsUp, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TabsContent } from "../ui/tabs";
import { useRecoilState } from "recoil";
import { filterTrend, filterTrendResult } from "@/store/atoms";
import axios from "axios";
import { useDebouncer } from "@/hooks/useDebouncer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypeIcon } from "./TypeIcon";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";

const CustomBuzz = () => {
    const [filter, setFilter] = useRecoilState(filterTrend);
    const [result, setResult] = useRecoilState(filterTrendResult);
    const [error, setError] = useState<string | null>(null); // Error state

    const fetchTrend = async (searchQuery: string) => {
        try {
            setError(null); // Clear any previous errors
            const response = await axios.post('http://localhost:3002/search', {
                search: searchQuery,
            });
            setResult(response.data);

            if (!response.data.word) {
                setError("No results found for your search query.");
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError("Failed to fetch search results. Please try again.");
        }
    };

    // Use useDebouncer to debounce the fetchTrend function
    const debouncedFetch = useDebouncer(fetchTrend, 500);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setFilter(value);

        debouncedFetch(value); // Pass the value directly to debouncedFetch
    }

    function sentimalRes(value: number | undefined): string {
        let sentiment = "";

        if (value !== undefined) {
            sentiment = (value >= -1 && value < -0.5)
                ? "Negative"
                : (value >= -0.5 && value < 0)
                    ? "Slightly Negative"
                    : (value >= 0 && value < 0.5)
                        ? "Slightly Positive"
                        : "Positive";
        }
        return sentiment;
    }

    return (
        <Card className="">
            <TabsContent value="Custom Buzz" className="space-y-4">
                <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                    <div className="flex items-center justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                            <p className="text-muted-foreground">
                                Here&apos;s a list of your tasks for this month!
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1 items-center space-x-2">
                            <Input
                                placeholder="Filter trends..."
                                className="w-[250px] lg:w-[550px] bg-secondary"
                                value={filter}
                                onChange={handleInputChange}
                            />

                            {filter && (
                                <Button
                                    variant="ghost"
                                    onClick={() => setFilter("")}
                                    className="h-8 px-2 lg:px-3"
                                >
                                    Reset
                                    <X />
                                </Button>
                            )}
                        </div>
                    </div>
                    {error ? (
                        <div className="text-red-500 text-lg font-semibold">{error}</div>
                    ) : result.word === "" ? (
                        <Skeleton className="w-auto h-96 rounded-md" />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {/* Cards */}
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Number of People Used
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex justify-between">
                                    <div className="text-2xl font-bold">{result?.word}</div>
                                    <div className="text-2xl font-bold">{result?.count}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Peoples Sentiment
                                    </CardTitle>
                                    {<div className="">{result?.averageSentiment?.toFixed(2)}</div>}
                                </CardHeader>
                                <CardContent className="flex justify-between">
                                    {<div className="text-2xl font-bold">{sentimalRes(result?.averageSentiment)}</div>}
                                    {<TypeIcon type={sentimalRes(result?.averageSentiment)} />}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Average Likes</CardTitle>
                                    {<ThumbsUp size={20} />}
                                </CardHeader>
                                <CardContent className="flex justify-between">
                                    {<div className="text-2xl font-bold">{result?.word}</div>}
                                    {<div className="text-2xl font-bold">{result?.avgLikes}</div>}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Retweets
                                    </CardTitle>
                                    <Repeat2 size={20} />
                                </CardHeader>
                                <CardContent className="flex justify-between">
                                    {<div className="text-2xl font-bold">{result?.word}</div>}
                                    {<div className="text-2xl font-bold">{result?.avgRetweets}</div>}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </TabsContent>
        </Card>
    );
};

export default CustomBuzz;

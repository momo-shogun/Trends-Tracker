import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import logo from "../assets/logo.png";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/custom/mode-toggle";
import { TrendBar } from "@/components/custom/TrendBar";
import { Calculator, Github, MoveDown, TrendingUp } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { trendAtLast, trendAtTop } from "@/store/atoms";
import { TypeIcon } from "@/components/custom/TypeIcon";
import Footer from "@/components/custom/Footer";
import CustomBuzz from "@/components/custom/CustomBuzz";

export const metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

const queryClient = new QueryClient()

export default function DashboardPage() {
  const topTrend = useRecoilValue(trendAtTop);
  const lastTrent = useRecoilValue(trendAtLast)

  function sentimalRes(value: number | undefined): string {
    let sentiment = ""

    if (value !== undefined) {
      sentiment = (value >= -1 && value < -0.5)
        ? "Negative"
        : (value >= -0.5 && value < 0)
          ? "Slightly Negative"
          : (value >= 0 && value < 0.5)
            ? "Slightly Positive"
            : "Positive";
    }
    return sentiment
  }




  return (
    <>
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={logo} />
            </Avatar>
            <div className="text-2xl font-bold text-darkBlue dark:text-white">
              T<span className=" text-lightBlue">rend</span> Tracker
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle />

              <a href="https://github.com/momo-shogun">
                <Button variant="ghost" className="flex gap-2 sm:gap-3">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Real-Time Social Media Trends</h2>

          </div>
          <Tabs defaultValue="Trending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="Trending">Trending</TabsTrigger>
              <TabsTrigger value="Custom Buzz" >
                Custom Buzz
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Trending" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Most Used Word #1
                    </CardTitle>
                    <Calculator size={20} />
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <div className="text-2xl font-bold">{topTrend?.word}</div>
                    <div className="text-2xl font-bold">{topTrend?.count}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sentimental Analysis #1
                    </CardTitle>
                    <div className="">{topTrend?.averageSentiment.toFixed(2)}</div>
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <div className="text-2xl font-bold">{sentimalRes(topTrend?.averageSentiment)}</div>
                    <TypeIcon type={sentimalRes(topTrend?.averageSentiment)} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Trend At Last #10</CardTitle>
                    <MoveDown size={20} />
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <div className="text-2xl font-bold">{lastTrent?.word}</div>
                    <div className="text-2xl font-bold">{lastTrent?.count}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Sentimental Analysis #10
                    </CardTitle>
                    <div className="">{lastTrent?.averageSentiment.toFixed(2)}</div>
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <div className="text-2xl font-bold">{sentimalRes(lastTrent?.averageSentiment)}</div>
                    <TypeIcon type={sentimalRes(lastTrent?.averageSentiment)} />
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Trending Words</CardTitle>
                    <CardDescription>Top words by frequency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QueryClientProvider client={queryClient}>
                      <TrendBar />
                    </QueryClientProvider>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      Trending <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing the most frequently used words
                    </div>
                  </CardFooter>
                </Card>
              </div>

            </TabsContent>
            <CustomBuzz />
          </Tabs>
        </div>
      </div >
      <Footer />
    </>
  );
}

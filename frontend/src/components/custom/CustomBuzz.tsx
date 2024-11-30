import { X } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TabsContent } from "../ui/tabs"

const CustomBuzz = () => {
    return (
        <TabsContent value="Custom Buzz" className="space-y-4">
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
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
                            className="h-8 w-[150px] lg:w-[250px]"
                        />


                        <Button
                            variant="ghost"
                            onClick={() => { }}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <X />
                        </Button>

                    </div>
                </div>
            </div>
        </TabsContent>
    )
}


export default CustomBuzz
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Pie} from "@/components/Pie.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {CardBody, CardContainer, CardItem} from "@/components/3d-card.tsx";
import {Chart} from "@/components/Chart.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@radix-ui/react-dropdown-menu";
import {Textarea} from "@/components/ui/textarea.tsx";

export function Dashboard() {
    return (
        <div className="min-h-screen w-full flex-col py-8"
             style={{
                 background: 'rgb(252,250,251)',
             }}>
            <div className="sm:gap-4 sm:py-4 sm:pl-14">
                <main className="grid grid-cols-12 gap-4">
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h2 className={'text-3xl'}>Intake Overview</h2>
                            <p className={'text-black/50'}>
                                Supplement Stats
                            </p>
                        </div>

                        <Card className={'text-xl rounded-3xl'}
                              style={{
                                  background: 'rgb(243,240,239)',
                              }}>
                            <div className={'space-y-12 p-8'}>
                                <div className={'flex flex-wrap items-center'}>
                                    <div>
                                        <h3 className={'font-bold'}>Breakfast</h3>
                                    </div>

                                    <div className={'ml-auto'}>
                                        325 kcal
                                    </div>
                                </div>

                                <div className={'flex flex-wrap items-center'}>
                                    <div>
                                        <h3 className={'font-bold'}>Lunch</h3>
                                    </div>

                                    <div className={'ml-auto'}>
                                        280 kcal
                                    </div>
                                </div>

                                <div className={'flex flex-wrap items-center'}>
                                    <div>
                                        <h3 className={'font-bold'}>Dinner</h3>
                                    </div>

                                    <div className={'ml-auto'}>
                                        360 kcal
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Dialog>
                            <DialogTrigger className={'w-full'}>
                                <Button size="lg"
                                        className="w-full">
                                    Add Your Intake
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Your Intake</DialogTitle>
                                    <DialogDescription>
                                        Add your daily intake to keep track of your diet
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label
                                            className="text-right">
                                            Breakfast
                                        </Label>
                                        <Textarea className="col-span-3"/>

                                        <Label className="text-right">
                                            Lunch
                                        </Label>
                                        <Textarea className="col-span-3"/>

                                        <Label className="text-right">
                                            Dinner
                                        </Label>
                                        <Textarea className="col-span-3"/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Submit</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <CardContainer className="inter-var w-full">
                            <CardBody className="bg-gray-50 w-full relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl   ">
                                <CardItem
                                    translateZ="50"
                                    className="text-xl w-full font-bold text-neutral-600 dark:text-white"
                                >
                                    <div className={'p-8 w-full space-y-4 rounded-3xl'}
                                         style={{
                                             background: 'rgb(243,240,239)',
                                         }}>
                                        <div className={'text-center flex justify-center'}>
                                            <Pie/>
                                        </div>

                                        <div className={'grid grid-cols-2 gap-4 '}>
                                            <div className={'border p-4 rounded bg-slate-50'}>
                                                <div className={'text-teal-700 text-sm font-bold'}>
                                                    Consumed
                                                </div>

                                                <div className={'text-2xl'}>
                                                    605 kcal
                                                </div>
                                            </div>

                                            <div className={'border p-4 rounded bg-slate-50'}>
                                                <div className={'text-rose-700 text-sm font-bold'}>
                                                    Burned
                                                </div>

                                                <div className={'text-2xl'}>
                                                    980 kcal
                                                </div>
                                            </div>
                                        </div>

                                        <div className={'border p-4 rounded bg-slate-50'}>
                                            <div className={'grid grid-cols-3 gap-3'}>
                                                <div className={'space-y-2'}>
                                                    <div className={''}>
                                                        Carbs
                                                    </div>
                                                    <Progress value={33}
                                                              className={'h-1 bg-rose-200'}/>

                                                    <div className={'text-'}>
                                                        24g left
                                                    </div>
                                                </div>

                                                <div className={'space-y-2'}>
                                                    <div className={'text-'}>
                                                        Protein
                                                    </div>
                                                    <Progress value={33}
                                                              className={'h-1 bg-rose-200'}/>
                                                    <div className={'text-'}>
                                                        15g left
                                                    </div>
                                                </div>

                                                <div className={'space-y-2'}>
                                                    <div className={'text- '}>
                                                        Fat
                                                    </div>
                                                    <Progress value={33}
                                                              className={'h-1 bg-rose-200'}/>
                                                    <div className={'text-'}>
                                                        8g left
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardItem>
                            </CardBody>
                        </CardContainer>

                    </div>
                    <div className={'col-span-8 min-h-full rounded-3xl'}
                         style={{
                             background: 'rgb(242,243,238)',
                         }}>
                        <div className={'grid grid-cols-12'}>
                            <div className={'col-span-8'}
                            >
                                <div
                                    className="overflow-hidden"
                                    x-chunk="dashboard-05-chunk-4">
                                    <CardHeader className="flex flex-row items-start bg-muted/50">
                                        <div className="grid gap-0.5">
                                            <CardTitle className="group flex items-center gap-2 text-2xl">
                                                Activity Tracking
                                            </CardTitle>
                                            <CardDescription>
                                                Exercise analytics data
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 text-sm  bg-white mx-4">
                                        <div>
                                            <h1 className={'text-xl'}>
                                                Workout Statics
                                            </h1>

                                            <p>
                                                22 Aug - 28 Aug 2023
                                            </p>
                                        </div>

                                        <Chart/>
                                    </CardContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

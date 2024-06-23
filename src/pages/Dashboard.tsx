import {ChangeEvent, useState} from "react";
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
import {Input} from "@/components/ui/input.tsx";
import axios from 'axios';

type FileUploadEvent = ChangeEvent<HTMLInputElement>;
type TextInputEvent = ChangeEvent<HTMLInputElement>;

export function Dashboard() {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        height: "",
        weight: "",
        breakfast: "",
        lunch: "",
        dinner: ""
    });

    // 处理文本输入变化
    const handleInputChange = (event: TextInputEvent): void => {
        const {id, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    // 处理文件上传
    const handleFileChange = (event: FileUploadEvent): void => {
        const fileInputId = event.target.id;
        const file = event.target.files ? event.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;  // 保留完整的 `data` URL
                setFormData((prevData) => ({
                    ...prevData,
                    [fileInputId]: base64String
                }));
                console.log(base64String);  // 打印完整的 base64 数据
            };
            reader.readAsDataURL(file);
        }
    };


    // 提交表单
    const handleSubmit = () => {
        axios.post('http://127.0.0.1:8000/todaymeal/', {
            name: formData.name,
            age: formData.age,
            height: formData.height,
            weight: formData.weight,
            breakfast: formData.breakfast,
            lunch: formData.lunch,
            dinner: formData.dinner,
            others: "N/A"
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen w-full flex-col py-8"
             style={{background: 'rgb(252,250,251)'}}>
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
                              style={{background: 'rgb(243,240,239)'}}>
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
                                        <label className="text-right">Name</label>
                                        <Input className="col-span-3"
                                               id="name"
                                               type="text"
                                               placeholder="Your Name"
                                               onChange={handleInputChange}/>

                                        <label className="text-right">Age</label>
                                        <Input className="col-span-3"
                                               id="age"
                                               type="text"
                                               placeholder="Your Age"
                                               onChange={handleInputChange}/>

                                        <label className="text-right">Height</label>
                                        <Input className="col-span-3"
                                               id="height"
                                               type="text"
                                               placeholder="Your Height"
                                               onChange={handleInputChange}/>

                                        <label className="text-right">Weight</label>
                                        <Input className="col-span-3"
                                               id="weight"
                                               type="text"
                                               placeholder="Your Weight"
                                               onChange={handleInputChange}/>

                                        <Label className="text-right">Breakfast</Label>
                                        <Input className="col-span-3"
                                               id="breakfast"
                                               type="file"
                                               onChange={handleFileChange}/>

                                        <Label className="text-right">Lunch</Label>
                                        <Input className="col-span-3"
                                               id="lunch"
                                               type="file"
                                               onChange={handleFileChange}/>

                                        <Label className="text-right">Dinner</Label>
                                        <Input className="col-span-3"
                                               id="dinner"
                                               type="file"
                                               onChange={handleFileChange}/>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button"
                                            onClick={handleSubmit}>Submit</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <CardContainer className="inter-var w-full">
                            <CardBody className="bg-gray-50 w-full relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl">
                                <CardItem translateZ="50"
                                          className="text-xl w-full font-bold text-neutral-600 dark:text-white">
                                    <div className={'p-8 w-full space-y-4 rounded-3xl'}
                                         style={{background: 'rgb(243,240,239)'}}>
                                        <div className={'text-center flex justify-center'}>
                                            <Pie/>
                                        </div>

                                        <div className={'grid grid-cols-2 gap-4'}>
                                            <div className={'border p-4 rounded bg-slate-50'}>
                                                <div className={'text-teal-700 text-sm font-bold'}>Consumed</div>
                                                <div className={'text-2xl'}>605 kcal</div>
                                            </div>

                                            <div className={'border p-4 rounded bg-slate-50'}>
                                                <div className={'text-rose-700 text-sm font-bold'}>Burned</div>
                                                <div className={'text-2xl'}>980 kcal</div>
                                            </div>
                                        </div>

                                        <div className={'border p-4 rounded bg-slate-50'}>
                                            <div className={'grid grid-cols-3 gap-3'}>
                                                <div className={'space-y-2'}>
                                                    <div>Carbs</div>
                                                    <Progress value={33}
                                                              className={'h-1 bg-rose-200'}/>
                                                    <div>24g left</div>
                                                </div>

                                                <div className={'space-y-2'}>
                                                    <div>Protein</div>
                                                    <Progress value={33}
                                                              className={'h-1 bg-rose-200'}/>
                                                    <div>15g left</div>
                                                </div>

                                                <div className={'space-y-2'}>
                                                    <div>Fat</div>
                                                    <Progress value={33}
                                                              className={'h-1 bg-rose-200'}/>
                                                    <div>8g left</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardItem>
                            </CardBody>
                        </CardContainer>
                    </div>
                    <div className={'col-span-8 min-h-full rounded-3xl'}
                         style={{background: 'rgb(242,243,238)'}}>
                        <div className={'grid grid-cols-12'}>
                            <div className={'col-span-8'}>
                                <div className="overflow-hidden"
                                     x-chunk="dashboard-05-chunk-4">
                                    <CardHeader className="flex flex-row items-start bg-muted/50">
                                        <div className="grid gap-0.5">
                                            <CardTitle className="group flex items-center gap-2 text-2xl">Activity
                                                                                                          Tracking</CardTitle>
                                            <CardDescription>Exercise analytics data</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 text-sm bg-white mx-4">
                                        <div>
                                            <h1 className={'text-xl'}>Workout Statics</h1>
                                            <p>22 Aug - 28 Aug 2023</p>
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
    );
}

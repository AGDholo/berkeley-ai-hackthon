import {EChart} from "@kbox-labs/react-echarts";
import {mealData} from "@/chart.ts";

export const Chart = () => {

    const extractCaloriesAndImages = (data: any[]) => {
        return data.map((day) => ({
            breakfast: {
                calories: day.breakfast.calories,
                imgurl: day.breakfast.imgurl
            },
            lunch: {
                calories: day.lunch.calories,
                imgurl: day.lunch.imgurl
            },
            dinner: {
                calories: day.dinner.calories,
                imgurl: day.dinner.imgurl
            },
        }));
    };

    const formatChartData = (mealInfo: any[]) => {
        return {
            xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // x 轴数据
            seriesData: {
                breakfast: mealInfo.map((day) => day.breakfast.calories),
                lunch: mealInfo.map((day) => day.lunch.calories),
                dinner: mealInfo.map((day) => day.dinner.calories),
            },
            imageUrls: {
                breakfast: mealInfo.map((day) => day.breakfast.imgurl),
                lunch: mealInfo.map((day) => day.lunch.imgurl),
                dinner: mealInfo.map((day) => day.dinner.imgurl),
            }
        };
    };

    const mealInfo = extractCaloriesAndImages(mealData);

    const chartData = formatChartData(mealInfo);


    return (
        <>
            <EChart
                style={{
                    height: '400px',
                    width: '100%'
                }}
                xAxis={{
                    type: 'category',
                    boundaryGap: false,
                    data: chartData.xAxisData
                }}
                // @ts-ignore
                tooltip={{
                    trigger: 'axis',
                    formatter: function (params: any[]) {
                        let content = '';
                        params.forEach(param => {
                            let imgUrl = '';
                            if (param.seriesName === 'Breakfast') {
                                imgUrl = chartData.imageUrls.breakfast[param.dataIndex];
                            } else if (param.seriesName === 'Lunch') {
                                imgUrl = chartData.imageUrls.lunch[param.dataIndex];
                            } else if (param.seriesName === 'Dinner') {
                                imgUrl = chartData.imageUrls.dinner[param.dataIndex];
                            }
                            content += `<div>${param.seriesName}: ${param.value} kcal</div>`;
                            if (imgUrl) {
                                content += `<img src="${imgUrl}" style="width:50px;height:50px;"/>`;
                            }
                        });
                        return content;
                    }
                }}
                yAxis={{
                    type: 'value'
                }}
                series={[
                    {
                        name: 'Breakfast',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        data: chartData.seriesData.breakfast,
                        lineStyle: {
                            width: 4,
                            color: '#ff7f50'
                        },
                    },
                    {
                        name: 'Lunch',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        data: chartData.seriesData.lunch,
                        lineStyle: {
                            width: 4,
                            color: '#87cefa'
                        },
                    },
                    {
                        name: 'Dinner',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        data: chartData.seriesData.dinner,
                        lineStyle: {
                            width: 4,
                            color: '#32cd32'
                        },
                    },
                ]}
            />

            <div className={'text-center container max-w-md justify-center my-3 grid grid-cols-3'}>
                <div>
                    <div className={'h-1 bg-[#ff7f50] w-full'}></div>
                    Breakfast
                </div>

                <div>
                    <div className={'h-1 bg-[#87cefa] w-full'}></div>
                    Afternoon
                </div>

                <div>
                    <div className={'h-1 bg-[#32cd32] w-full'}></div>
                    Daily Total

                </div>
            </div>
        </>
    )
}
import {EChart} from "@kbox-labs/react-echarts";

// 计算百分比函数
const calculatePercentage = ({total, current}: { total: any, current: any }) => {
    return (current / total) * 100;
};

// @ts-ignore
const Pie = ({data}) => {
    const {nutrition_needing, meal_nutrition, showBars} = data;
    // 计算每个营养素的摄入百分比
    const waterPercentage = calculatePercentage({
        total: nutrition_needing.water,
        current: (meal_nutrition.breakfast?.water ?? 0) + (meal_nutrition.lunch?.water ?? 0) + (meal_nutrition.dinner?.water ?? 0)
    });
    const proteinPercentage = calculatePercentage({
        total: nutrition_needing.protein,
        current: meal_nutrition.breakfast.protein + meal_nutrition.lunch.protein + meal_nutrition.dinner.protein
    });
    const carbsPercentage = calculatePercentage({
        total: nutrition_needing.carbohydrates,
        current: meal_nutrition.breakfast.carbohydrates + meal_nutrition.lunch.carbohydrates + meal_nutrition.dinner.carbohydrates
    });
    const cholesterolPercentage = calculatePercentage({
        total: nutrition_needing.cholesterol,
        current: meal_nutrition.breakfast.cholesterol + meal_nutrition.lunch.cholesterol + meal_nutrition.dinner.cholesterol
    });

    const gaugeData = [
        {
            value: waterPercentage.toFixed(2),
            name: 'Water',
            title: {
                offsetCenter: ['0%', '-30%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '-20%']
            }
        },
        {
            value: proteinPercentage.toFixed(2),
            name: 'Protein',
            title: {
                offsetCenter: ['0%', '0%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '10%']
            }
        },
        {
            value: carbsPercentage.toFixed(2),
            name: 'Carbohydrates',
            title: {
                offsetCenter: ['0%', '30%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '40%']
            }
        },
        {
            value: cholesterolPercentage.toFixed(2),
            name: 'Cholesterol',
            title: {
                offsetCenter: ['0%', '60%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '70%']
            }
        }
    ];

    // 计算进度条数据
    const nutrients = ["fibroid", "Sodium", "Zinc", "Copper", "Manganese", "Selenium", "VitaminA", "VitaminC", "VitaminD", "VitaminE", "VitaminK", "Thiamin", "VitamnB12"];

    const progressBars = nutrients.map((nutrient) => {
        const totalNeeded = nutrition_needing[nutrient];
        const breakfastAmount = meal_nutrition.breakfast?.[nutrient] ?? 0;
        const lunchAmount = meal_nutrition.lunch?.[nutrient] ?? 0;
        const dinnerAmount = meal_nutrition.dinner?.[nutrient] ?? 0;

        const totalConsumed = breakfastAmount + lunchAmount + dinnerAmount;

        const breakfastPercentage = (breakfastAmount / totalNeeded) * 100;
        const lunchPercentage = (lunchAmount / totalNeeded) * 100;
        const dinnerPercentage = (dinnerAmount / totalNeeded) * 100;

        return (
            <div key={nutrient}
                 className={'border p-4 rounded bg-slate-50'}>
                <div className={'space-y-2'}>
                    <div>{
                        nutrient.charAt(0).toUpperCase() + nutrient.slice(1) === 'Fibroid' ? 'Fiber' : nutrient
                    }</div>

                    <div className="mb-4 flex h-1 overflow-hidden rounded bg-gray-100 text-xs">
                        <div style={{
                            width: `${breakfastPercentage}%`
                        }}
                             className="bg-green-500 transition-all duration-500 ease-out"></div>
                        <div style={{
                            width: `${lunchPercentage}%`
                        }}
                             className="bg-yellow-500 transition-all duration-500 ease-out"></div>
                        <div style={{
                            width: `${dinnerPercentage}%`
                        }}
                             className="bg-red-500 transition-all duration-500 ease-out"></div>
                    </div>

                    <div>{(totalNeeded - totalConsumed).toFixed(2)}g left</div>
                </div>
            </div>
        );
    });

    return (
        <>
            <EChart
                renderer={'svg'}
                style={{
                    height: '350px',
                    width: '100%'
                }}
                series={[
                    {
                        type: 'gauge',
                        startAngle: 90,
                        endAngle: -270,
                        pointer: {
                            show: false
                        },
                        progress: {
                            show: true,
                            overlap: false,
                            roundCap: true,
                            clip: false,
                            itemStyle: {
                                borderWidth: 1,
                                borderColor: '#464646'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                width: 40
                            }
                        },
                        splitLine: {
                            show: false,
                            distance: 0,
                            length: 10
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            distance: 50
                        },
                        data: gaugeData,
                        title: {
                            fontSize: 12
                        },
                        detail: {
                            width: 50,
                            height: 1,
                            fontSize: 10,
                            color: 'inherit',
                            borderColor: 'inherit',
                            borderRadius: 20,
                            borderWidth: 1,
                            formatter: '{value}%',
                        }
                    }
                ]}
            />

            <div className={' max-h-[200px] overflow-y-auto gap-2 space-y-2'}>
                <div className={'grid grid-cols-2 gap-4 '}>
                    <div className={'border p-4 rounded bg-slate-50'}>
                        <div className={'text-teal-700 text-sm font-bold'}>Consumed</div>
                        <div className={'text-2xl'}>
                            {meal_nutrition.breakfast?.calories +
                                meal_nutrition.lunch?.calories +
                                meal_nutrition.dinner?.calories
                                ?? 0} kcal
                        </div>
                    </div>

                    <div className={'border p-4 rounded bg-slate-50'}>
                        <div className={'text-rose-700 text-sm font-bold'}>
                            Needed
                        </div>
                        <div className={'text-2xl'}>
                            {nutrition_needing.calorie} kcal
                        </div>
                    </div>
                </div>


                {showBars && <div className={'grid grid-cols-3 gap-2'}>
                    {progressBars}
                </div>}
            </div>
        </>
    )
        ;
};

export default Pie;

import {EChart} from "@kbox-labs/react-echarts";

const gaugeData = [
    {
        value: 20,
        name: 'Perfect',
        title: {
            offsetCenter: ['0%', '-30%']
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%']
        }
    },
    {
        value: 40,
        name: 'Good',
        title: {
            offsetCenter: ['0%', '0%']
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%']
        }
    },
    {
        value: 60,
        name: 'Commonly',
        title: {
            offsetCenter: ['0%', '30%']
        },
        detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '40%']
        }
    }
];

export const Pie = () => {

    return (
        <EChart
            renderer={'svg'}
            onClick={() => console.log('clicked!')}
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
                        formatter: '{value}%'
                    }
                }
            ]}
        />
    );
}
import {EChart} from "@kbox-labs/react-echarts";

export const Chart = () => {
    return (
        <EChart
            style={{
                height: '600px',
                width: '100%'
            }}
            xAxis={{
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }}
            tooltip={{
                trigger: 'axis'
            }}
            yAxis={{
                type: 'value'
            }}
            series={[
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    data: [120, 132, 101, 134, 90, 230, 210],
                    lineStyle: {
                        width: 4,
                    },
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    data: [220, 182, 191, 234, 290, 330, 310],
                    lineStyle: {
                        width: 4,
                    },
                },
            ]}
        />
    )
}
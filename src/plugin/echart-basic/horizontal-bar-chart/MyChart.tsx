import { use } from "echarts/core";
import { LegendComponent, SingleAxisComponent, TooltipComponent } from "echarts/components";
import { BarChart } from "echarts/charts";
import { ChartComponentProps } from "./type";

use([LegendComponent, SingleAxisComponent, TooltipComponent, BarChart]);

const MyChart = (props: ChartComponentProps) => {
    const { echartOptions, width, height } = props;

    return (
        <div>
            <h4>"chart name"</h4>
        </div>
    );
};
export default MyChart;

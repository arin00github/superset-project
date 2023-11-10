import MyChart from "./plugin/echart-basic/horizontal-bar-chart/MyChart";
import TransformProps from "./plugin/echart-basic/horizontal-bar-chart/transformProps";
import { NumberFormatterRegistry } from "@superset-ui/core";

const registry = new NumberFormatterRegistry();
console.log(registry);

function App() {
    const transformData = TransformProps();
    const { echartOptions } = transformData;
    return (
        <div>
            <MyChart echartOptions={echartOptions} width={500} height={450} />
        </div>
    );
}

export default App;

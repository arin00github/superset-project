import ControlPanelsContainer from "./ControlPanelsContainer";
import ExploreChartPanel from "./ExploreChartPanel";

/**
 * @component ExploreViewContainer
 * @description 전반적인 화면 레이아웃 영역을 담당하는 컴포넌트입니다.
 * @returns {JSX.Element} ExploreViewContainer 컴포넌트
 */
const ExploreViewContainer = () => {
    return (
        <div>
            <div>title box</div>
            <div>
                <ControlPanelsContainer sections={[]} />
            </div>
            <div>
                <ExploreChartPanel />
            </div>
        </div>
    );
};

export default ExploreViewContainer;

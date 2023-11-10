import { ControlPanelSectionConfig } from "src/interfaces/explore.interface";

interface ControlPanelsContainerProps {
    sections: ControlPanelSectionConfig[];
}

const ControlPanelsContainer = (props: ControlPanelsContainerProps) => {
    const { sections } = props;

    /**
     * @function renderControlSecton
     * @description section을 렌더링하는 함수
     * @param section 여러개의 control아 한 그룹으로 묶인 section
     * @returns {JSX.Element} section을 렌더링한 JSX.Element
     */
    const renderControlSecton = (section: ControlPanelSectionConfig) => {
        return (
            <div key={section.name}>
                {section.controlRows.map((controlRow) => {
                    if (controlRow.length > 0) {
                        const firstControl = controlRow[0];
                        return (
                            <div key={firstControl.name}>
                                {firstControl.name || "no label Name"}
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    return <div>{sections.map(renderControlSecton)}</div>;
};

export default ControlPanelsContainer;

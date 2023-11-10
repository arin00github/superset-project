import { ControlSetItem } from "src/interfaces/explore.interface";

interface ControlProps {
    control: ControlSetItem;
}

/**
 * @component Control
 * @param props Control 컴포넌트의 props
 * @description Control 컴포넌트는 ExplorePage에서 컨트롤을 렌더링하는 최소단위 컴포넌트입니다.
 * @returns {JSX.Element} Control 컴포넌트
 */
const Control = (props: ControlProps) => {
    const { control } = props;

    return (
        <div>
            <div>{control.config.label}</div>
        </div>
    );
};

export default Control;

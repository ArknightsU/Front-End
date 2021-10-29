import { MaterialCalculation } from "@components/common";
interface ShowMaterialProps {
    open: boolean;
    focus: MaterialCalculation;
    char: any;
    type: "total" | "upgrade" | "skill";
}

export function ShowMaterial(props: ShowMaterialProps): JSX.Element {
    console.log(props.focus);
    console.log(props.char);
    return (
        <div
            className="w-full bg-gray-200 rounded-3xl transition-all duration-700 origin-top"
            style={{
                marginTop: props.open ? "8px" : "0px",
                height: props.open ? "120px" : "0px",
                transform: `scale(${props.open ? 1 : 0})`,
            }}
        ></div>
    );
}
/*
function Total():JSX.Element{
    return(<div></div>)
}

function Upgrade():JSX.Element{
    return(<div></div>);
}

function Skill():JSX.Element{
    return(<div></div>);
}*/

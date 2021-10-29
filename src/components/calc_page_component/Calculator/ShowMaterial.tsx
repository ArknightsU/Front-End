interface ShowMaterialProps {
    open: boolean;
}

export function ShowMaterial(props: ShowMaterialProps): JSX.Element {
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

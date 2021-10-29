interface ShowMaterialProps {
    open: boolean;
}

export function ShowMaterial(props: ShowMaterialProps): JSX.Element {
    return (
        <div
            className="w-full bg-gray-200 rounded-3xl transition-all duration-700 origin-top mt-2"
            style={{
                height: "120px",
                transform: `scale(${props.open ? 1 : 0})`,
            }}
        ></div>
    );
}

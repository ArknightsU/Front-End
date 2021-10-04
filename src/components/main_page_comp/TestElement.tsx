import React from "react";

interface TestElementProps {
    text?: string | undefined;
}

export function TestElement(props: TestElementProps): JSX.Element {
    return <div>{props.text}</div>;
}

import { Switch } from "@headlessui/react";
import { SetStateAction } from "react";

interface SwitchProps {
    checked: boolean;
    setChecked: React.Dispatch<SetStateAction<boolean>>;
}
export function ToggleSwitch(props: SwitchProps): JSX.Element {
    return (
        <Switch
            checked={props.checked}
            onChange={props.setChecked}
            className={`${props.checked ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex flex-shrink-0 h-8 w-16 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`${props.checked ? "translate-x-8" : "translate-x-0"}
            pointer-events-none inline-block h-7 w-7 h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
        </Switch>
    );
}

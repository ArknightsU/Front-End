import { SetStateAction } from "react";
import { useWindowSize } from "..";
import DisplayText from "./DisplayValues";
import { Account, Calc, DB, Gacha, Info, Lang, Music } from "./icons";
import { PageAccount } from "./SettingsPages/PageAccount";
import { PageCalc } from "./SettingsPages/PageCalc";
import { PageDB } from "./SettingsPages/PageDB";
import { PageGacha } from "./SettingsPages/PageGacha";
import { PageInfo } from "./SettingsPages/PageInfo";
import { PageLang } from "./SettingsPages/PageLang";
import { PageMusic } from "./SettingsPages/PageMusic";

interface BodyProps {
    current: number;
    setCurrent: React.Dispatch<SetStateAction<number>>;
}
export function SettingsBody(props: BodyProps): JSX.Element {
    const window_size = useWindowSize();
    const bodySetter = () => {
        switch (props.current) {
            case 0:
                return <PageDB />;
            case 1:
                return <PageGacha />;
            case 2:
                return <PageCalc />;
            case 3:
                return <PageMusic />;
            case 4:
                return <PageLang />;
            case 5:
                return <PageAccount />;
            case 6:
                return <PageInfo />;
            default:
                return;
        }
    };
    return (
        <div className="w-full h-full bg-gray-100 rounded-lg shadow-br flex flex-row justify-start items-center">
            <div className="w-20 md:w-1/5 h-full bg-white flex flex-row justify-start items-center relative overflow-y-auto">
                <div className="absolute w-3 h-full flex-shrink-0 flex flex-col justify-start items-center ">
                    {Object.keys(DisplayText.menus).map((v, i) => (
                        <Indicator key={i} index={i} current={props.current} />
                    ))}
                </div>
                <div className="w-full h-full flex flex-col justify-start items-end">
                    {Object.keys(DisplayText.menus).map((v, i) => (
                        <LeftMenuItem
                            key={i}
                            index={i}
                            title={v}
                            current={props.current}
                            setCurrent={props.setCurrent}
                        />
                    ))}
                </div>
            </div>
            <div
                className="h-full flex flex-col justify-start items-start p-2 md:p-6 overflow-y-auto"
                style={{
                    width:
                        window_size.width > 768 ? "80%" : "calc(100% - 80px)",
                }}
            >
                <div className="w-full h-auto">{bodySetter()}</div>
            </div>
        </div>
    );
}

interface IndicatorProps {
    current: number;
    index: number;
}
function Indicator(props: IndicatorProps): JSX.Element {
    return (
        <div
            className={`w-full h-14 rounded-r-lg transition-colors duration-700 flex-shrink-0 ${
                props.current === props.index ? "bg-red-600" : ""
            }`}
        ></div>
    );
}

interface LeftMenuProps {
    current: number;
    setCurrent: React.Dispatch<SetStateAction<number>>;
    index: number;
    title: string;
}
function LeftMenuItem(props: LeftMenuProps): JSX.Element {
    const IconSetter = () => {
        switch (props.title) {
            case "db":
                return DB();
            case "gacha":
                return Gacha();
            case "calc":
                return Calc();
            case "music":
                return Music();
            case "lang":
                return Lang();
            case "account":
                return Account();
            case "info":
                return Info();
            default:
                return;
        }
    };
    const window_size = useWindowSize();
    return (
        <div
            className={`h-14 flex justify-center items-center rounded-l-lg transition-all duration-700 ${
                props.current === props.index
                    ? "bg-gray-100"
                    : "bg-white hover:bg-gray-300"
            }`}
            style={{
                width:
                    props.current === props.index
                        ? "calc(100% - 12px)"
                        : "100%",
            }}
            onClick={() => {
                props.setCurrent(props.index);
            }}
        >
            <div className="p-3 w-14 h-14">{IconSetter()}</div>
            {window_size.width > 768 ? (
                <div className="w-0 md:w-auto text-base font-bold">
                    <p>{DisplayText.menus[props.title]}</p>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

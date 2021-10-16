import React from "react";
import { Transition } from "@headlessui/react";
import { useLoginPopUp } from "@recoil/hooks";
import { useClickAway } from "react-use";
import GoogleLogin from "react-google-login";
import { isLoggedIn } from "react-google-oauth2";
import useEffect from "react";
import { useGoogleLogin } from "react-google-login";

export function GoogleLoginPopUp(): JSX.Element {
    const [login, { toggleLoginPopUp }] = useLoginPopUp();
    const [isEntered, setIsEntered] = React.useState(false);
    const bgBlur = isEntered ? "backdrop-filter backdrop-blur-xl" : "";
    const ref = React.useRef(null);
    useClickAway(ref, () => {
        toggleLoginPopUp();
    });
    const responseGoogle = (response: unknown) => {
        console.log(response);
    };
    React.useEffect(() => {
        if (isLoggedIn()) {
            console.log("logged in!");
        }
    });
    return (
        <Transition
            show={login}
            enter="transition-transform transform duration-500"
            enterFrom="transform scale-0"
            enterTo="transform scale-100"
            leave="transition-transform duration-500"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-0"
            afterEnter={() => {
                setIsEntered(true);
            }}
            beforeLeave={() => {
                setIsEntered(false);
            }}
        >
            <div
                className={`absolute top-0 left-0 h-full w-full bg-transparent flex justify-center items-center ${bgBlur}`}
            >
                <div
                    ref={ref}
                    className="h-1/2 w-1/3 p-4 box-border bg-white dark:bg-gray-700 rounded-lg"
                >
                    <GoogleLogin
                        clientId="995739344727-jcl6298reb0703kevu4j550mugnusmu9.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={true}
                    />
                </div>
            </div>
        </Transition>
    );
}

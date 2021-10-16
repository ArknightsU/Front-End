import React, { Fragment } from "react";
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
            afterEnter={() => {
                setIsEntered(true);
            }}
            beforeLeave={() => {
                setIsEntered(false);
            }}
        >
            <div
                onClick={toggleLoginPopUp}
                className={`absolute top-0 left-0 h-full w-full bg-transparent flex justify-center items-center ${bgBlur}`}
            >
                <Transition.Child
                    as={React.Fragment}
                    enter="transition transform duration-500 "
                    enterFrom="scale-0 opacity-0 "
                    enterTo="scale-100 opacity-1 "
                    leave="transition transform duration-500"
                    leaveFrom="scale-100 "
                    leaveTo="scale-0"
                >
                    <div
                        ref={ref}
                        className="relative h-1/2 w-1/3 p-4 box-border bg-white dark:bg-gray-700 rounded-lg"
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
                </Transition.Child>
            </div>
        </Transition>
    );
}

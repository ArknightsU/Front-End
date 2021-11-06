import { Dialog, Transition } from "@headlessui/react";
import { Fragment, SetStateAction } from "react";

interface ErrorProps {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    title?: string;
    description?: string;
}
export function ApiError(props: ErrorProps): JSX.Element {
    return (
        <Transition appear show={props.open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-apiloading overflow-y-auto"
                onClose={() => {
                    props.setOpen(false);
                }}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium font-ibm-korean leading-6 text-gray-900"
                            >
                                {props.title ? props.title : "심각한 에러 발생"}
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 font-ibm-korean">
                                    {props.description
                                        ? props.description
                                        : "클라이언트에서 제어할 수 없는 심각한 에러가 발생했습니다. 다시 시도하거나 개발자에게 연락해주세요."}
                                </p>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="font-ibm-korean inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={() => {
                                        props.setOpen(false);
                                    }}
                                >
                                    {"알겠습니다."}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

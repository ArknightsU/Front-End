import { CustomImage } from "@components";

export function NoSettings(): JSX.Element {
    return (
        <>
            <div className="w-full h-48 flex justify-center items-center">
                <CustomImage src="/ui/error_not_found.webp" />
            </div>
            <div className="w-full h-auto justify-center items-center">
                <p className="font-bold text-lg whitespace-pre-wrap text-center">
                    {
                        "현재 사용가능한 설정이 없습니다. \n업데이트를 기다려주세요."
                    }
                </p>
            </div>
        </>
    );
}

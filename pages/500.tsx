export default function RES500() {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <h1>{"서버에서 페이지를 만드는 데 실패했습니다."}</h1>
            <h3>
                {
                    "경로를 알 수 없는 페이지에 접속하였을 가능성이 있습니다.\n경로가 올바르다면 관리자에게 문의해주세요."
                }
            </h3>
        </div>
    );
}

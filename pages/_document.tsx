import Document, {
    DocumentContext,
    DocumentInitialProps,
    NextScript,
    Html,
    Head,
    Main,
} from "next/document";

class CustomDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                </Head>
                <head>
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                    ></script>
                    <meta property="og:title" content="ARKNIGHTS ONE" />
                    <meta property="og:image" content="/icon.png" />
                    <meta
                        property="og:description"
                        lang="ko"
                        content="Arknights One - 게임 명일방주에 필요한 몇 가지 편의 기능과 부가 기능을 가진 웹 어플리케이션. 가챠 시뮬레이터, 육성 재료 계산, 음악 플레이어 등 수많은 기능을 포함."
                    />
                    <meta
                        property="og:description"
                        lang="en-US"
                        content="Arknights One - Web Application Service for convenient in game Arknights. Including Arknights Gacha Simulator, Material Calculation, Music Player and others. English services are coming soon"
                    />
                    <meta
                        property="og:description"
                        lang="ja"
                        content="Arknights One - ゲームアークナイツに必要ないくつかの機能と、色んなサブ機能を持つウェブアプリケーション。ガチャシミュレーター、育成材料計算、BGMプレイヤーや色々。日本語サービスは間もなく開始します。"
                    />
                    <meta name="author" content="admin@arknights.one" />
                    <meta
                        name="description"
                        lang="ko"
                        content="Arknights One - 게임 명일방주에 필요한 몇 가지 편의 기능과 부가 기능을 가진 웹 어플리케이션. 가챠 시뮬레이터, 육성 재료 계산, 음악 플레이어 등 수많은 기능을 포함."
                    />
                    <meta
                        name="description"
                        lang="en-US"
                        content="Arknights One - Web Application Service for convenient in game Arknights. Including Arknights Gacha Simulator, Material Calculation, Music Player and others. English services are coming soon"
                    />
                    <meta
                        name="description"
                        lang="ja"
                        content="Arknights One - ゲームアークナイツに必要ないくつかの機能と、色んなサブ機能を持つウェブアプリケーション。ガチャシミュレーター、育成材料計算、BGMプレイヤーや色々。日本語サービスは間もなく開始します。"
                    />
                </head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;

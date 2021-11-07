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

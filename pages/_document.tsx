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
                    <script
                        async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6003201576759916"
                        crossOrigin="anonymous"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-6003201576759916",
                   enable_page_level_ads: true
              });
                `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;

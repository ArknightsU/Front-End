import ChatMain from "@components/chat_page_component/ChatMain";
import NeedLogIn from "@components/chat_page_component/NeedLogIn";
import { Container } from "@components/Container";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
const Chat: NextPage = () => {
    const { data: session, status } = useSession();

    return (
        <>
            <Head>
                <title>{"Arknights One 채팅"}</title>
                <meta
                    name="description"
                    lang="ko"
                    content="Arknights One 채팅 페이지."
                />
            </Head>
            <Container>
                {!session && <NeedLogIn />}
                {session && <ChatMain />}
            </Container>
        </>
    );
};

export default Chat;

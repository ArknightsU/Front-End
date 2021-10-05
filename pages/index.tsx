import React from "react";
import { ResponsiveGrid } from "@components";
import { Operator, Gacha, Music, Calculation } from "@components";
import { Container } from "@components/Container";
import { ResponsiveGridLib } from "@components/main_page_with_library/ResponsiveGridLib";

const Home: React.FC = () => {
    /*
    return (
        <Container>
            <ResponsiveGrid>
                <Operator />
                <Gacha />
                <Music />
                <Calculation />
            </ResponsiveGrid>
        </Container>
    );*/
    return (
        <Container>
            <ResponsiveGridLib>
                <div key="test1" className="bg-white"></div>
                <div key="test2" className="bg-white"></div>
                <div key="test3" className="bg-white"></div>
                <div key="test4" className="bg-white"></div>
            </ResponsiveGridLib>
        </Container>
    );
};

export default Home;

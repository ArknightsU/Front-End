import React from "react";
import { ResponsiveGrid } from "@components";
import { Operator, Gacha, Music, Calculation } from "@components";
import { Container } from "@components/Container";

const Home: React.FC = () => {
    return (
        <Container>
            <ResponsiveGrid>
                <Operator />
                <Gacha />
                <Music />
                <Calculation />
            </ResponsiveGrid>
        </Container>
    );
};

export default Home;

import React from "react";
import { ResponsiveGrid, TestElement } from "@components";

const Home: React.FC = () => {
    return (
        <ResponsiveGrid>
            <TestElement text={"hello"} />
        </ResponsiveGrid>
    );
};

export default Home;

import { Box, HStack } from "@chakra-ui/react";
import BottomNavBar from "./BottomNavBar";
import CardType from "./CardType";
import TopNavBar from "./TopNavBar";

export default function Layout({children}) {
    return (
        <Box minW="100vw" minH="100vh" display="grid" gridTemplateRows="7fr 88fr 5fr">
            <TopNavBar />
                {children}
            <BottomNavBar />
        </Box>
    )

};

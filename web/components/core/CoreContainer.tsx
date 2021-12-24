import { Flex } from "@chakra-ui/react";

export const CoreContainer: React.FC = ({ children }) => (
    <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100%"}
        backgroundColor={"#283593"}
    >
        {children}
    </Flex>
)
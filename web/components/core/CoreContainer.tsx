import { Center, Flex } from "@chakra-ui/react";

export const CoreContainer: React.FC = ({ children }) => (
    <Center
        flexDirection={"column"}
        height={"100%"}
        backgroundColor={"#283593"}
    >
        {children}
    </Center>
)
import { HamburgerIcon } from "@chakra-ui/icons"
import { Avatar, CloseButton, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"

import { useUser } from "../../contexts/UserContext"

export function HomeHeader() {
	const { user, logout } = useUser()

    return (
        <Flex
            as="header"
            gap={20}
        >
            <Flex
                alignItems={"center"}
                gap={4}
            >
                <Avatar src={user?.team ? user?.team.imageUrl : ""} />
                <Text
                    color={"white"}
                    fontSize={20}
                >{user?.team?.name}</Text>
            </Flex>

            <Flex
                alignItems={"center"}
                gap={4}
            >
                <Text
                    color={"white"}
                    fontSize={20}
                >{user?.username}</Text>
                <Menu>
                    <MenuButton
                        as={Avatar}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant='solid'
                        cursor={"pointer"}
                        src={user?.avatarUrl} 
                    />
                    <MenuList>
                        <MenuItem 
                            icon={<CloseButton />}
                            onClick={() => {
                                logout()
                            }}
                            >
                        Sair
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

        </Flex>
    )
}
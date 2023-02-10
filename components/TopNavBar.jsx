import { BellIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Text, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";


export default function TopNavBar(params) {

    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Flex bg="#F05454" alignItems="center" justifyContent="space-between" paddingX="4">
            <Button onClick={()=>window.location.href="/"} color="white" colorScheme='whiteAlpha' variant='link'>
                Parking
            </Button>
            <Flex alignItems="center" gap="2">
                <Box>
                    <IconButton
                        aria-label="toggle theme"
                        rounded="full"
                        colorScheme="red"
                        size="lg"
                        position="absolute"
                        bottom={"16"}
                        right={4}
                        onClick={toggleColorMode} icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
                    />
                </Box>
                <Box display="flex" gap="2">
                    <Box position="relative">
                        <Box zIndex="2" display="flex" justifyContent="center" bg="green.400" position="absolute" left={5} bottom={5} rounded="md" minW="15px" p="1px">
                            <Text color="white" fontSize="x-small">1</Text>
                        </Box>
                        <IconButton variant="outline" colorScheme="whiteAlpha" icon={<BellIcon color="white" fontSize="3xl" />} />
                    </Box>
                    <Menu>
                        <MenuButton as={Button} colorScheme="whiteAlpha" variant="outline">
                            <Flex alignItems="center" gap="2">
                                <Avatar size="sm" />
                                <Text color="white">Profile</Text>
                            </Flex>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title='Profile'>
                                <MenuItem>My Account</MenuItem>
                                <MenuItem>Payments </MenuItem>
                            </MenuGroup>
                            <MenuDivider />
                            <MenuGroup title='Help'>
                                <MenuItem>Docs</MenuItem>
                                <MenuItem>FAQ</MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Flex>
    )
};

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { BsGearFill } from "react-icons/bs";
import { FaRss } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { HiCollection } from "react-icons/hi";
import { MdHome } from "react-icons/md";

export default function AppShell({ user, children }) {
  const sidebar = useDisclosure();
  const router = useRouter();

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align='center'
        px='4'
        pl='4'
        py='3'
        onClick={() => {
          router.push(props.route);
        }}
        cursor='pointer'
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role='group'
        fontWeight='semibold'
        transition='.15s ease'
        {...rest}
      >
        {icon && (
          <Icon
            mr='2'
            boxSize='4'
            _groupHover={{
              color: useColorModeValue("gray.600", "gray.300"),
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as='nav'
      pos='fixed'
      top='0'
      left='0'
      zIndex='sticky'
      h='full'
      pb='10'
      overflowX='hidden'
      overflowY='auto'
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth='1px'
      w='60'
      {...props}
    >
      <Flex px='4' py='5' align='center'>
        <Text
          fontSize='2xl'
          ml='2'
          color={useColorModeValue("brand.500", "white")}
          fontWeight='semibold'
        >
          Fantasy Bets{" "}
        </Text>
      </Flex>
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
      >
        <NavItem icon={MdHome} route={"/app/home"}>
          Home
        </NavItem>
        <NavItem icon={FaRss} route={"/app/bets"}>
          Bets
        </NavItem>
        <NavItem icon={HiCollection} route={"/app/leaderboard"}>
          Leaderboard
        </NavItem>
        <NavItem icon={BsGearFill} route={"/app/settings"}>
          Settings
        </NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box
      as='section'
      bg={useColorModeValue("gray.50", "gray.700")}
      minH='100vh'
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement='left'
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w='full' borderRight='none' />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition='.3s ease'>
        <Flex
          as='header'
          align='center'
          justify='space-between'
          w='full'
          px='4'
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth='1px'
          borderColor={useColorModeValue("inherit", "gray.700")}
          h='14'
        >
          <IconButton
            aria-label='Menu'
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size='sm'
          />
          <Box flexGrow='1'></Box>
          <Flex align='center'>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                <Avatar size={"sm"} src={user.picture} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    router.push("/api/auth/logout");
                  }}
                >
                  Logout{" "}
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Box as='main' p='4' overflow='scroll'>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

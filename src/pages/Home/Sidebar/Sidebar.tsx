import { CalendarIcon, Icon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { signOut, auth } from "../../../../services/firebase"
import { useDispatch } from "react-redux"
import { logout } from "../../../app/userSlice"
import { customToast, ToastStatus } from "../../../../utils/Toast"
import {
  Box,
  Heading,
  Image,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiBookmark,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSearch,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { useSelector } from "react-redux";
// import { Logo } from "./Logo";
import Logo from "./logo.png"
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";
import { selectSidebar, sidebarState } from "../../../app/sidebarSlice";
import { selectUser } from "../../../app/userSlice";

export const Sidebar = () => {
  const currentTab = useSelector(selectSidebar);
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const toast = useToast()

  useEffect(() => {
    console.log(currentTab)
  }, [])

  return (
    <Flex as="section" minH="100vh" bg="bg-canvas">
      <Flex
        flex="1"
        bg="bg-accent"
        color="on-accent"
        maxW={{ base: "full", sm: "xs" }}
        py={{ base: "6", sm: "8" }}
        px={{ base: "4", sm: "6" }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
            {/* <Logo /> */}
            <HStack>
              <Image w="50px" src={Logo} />
              <Heading fontFamily={"body"} as="h4" size="sm">NicuGrowth</Heading>
            </HStack>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color="on-accent" boxSize="5" />
              </InputLeftElement>
              <Input placeholder="Search" variant="filled" colorScheme="teal" />
            </InputGroup>
            <Stack spacing="1">
              <NavButton
                label="Home"
                tab={sidebarState.home}
                icon={FiHome}
                aria-current={currentTab === sidebarState.home && "page"}
              />
              <NavButton
                label="Calendar"
                tab={sidebarState.calendar}
                icon={CalendarIcon}
                aria-current={currentTab === sidebarState.calendar && "page"}
              />
              <NavButton
                label="Settings"
                tab={sidebarState.settings}
                icon={FiSettings}
                aria-current={currentTab === sidebarState.settings && "page"}
              />
            </Stack>
          </Stack>
          <Stack spacing={{ base: "5", sm: "6" }}>
            <Divider borderColor="bg-accent-subtle" />
            <Button
              onClick={() => {
                signOut(auth);
                dispatch(logout());
                customToast(toast, "Signed out", `You're successfully logged out!`, ToastStatus.success)
              }}
              colorScheme="red"
            >
              Log Out
            </Button>
            <UserProfile name={user?.displayName} email={user?.email} />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

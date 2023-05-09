import { customToast, ToastStatus } from "../../../utils/Toast"
import { mapAuthCodeToMessage } from "../../../services/authHelper"
import { isValidPassword } from "../../../utils/passwordValidation"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux"

import { login } from "../../app/userSlice"

import { auth, updateProfile, createUserWithEmailAndPassword } from "../../../services/firebase"

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch()

  const toast = useToast()


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");


  const handleNewSignup = () => {

    if (firstName === "" || lastName === "" || email === "" || password === "") {
      customToast(toast, "Error creating account", "Please fill out all fields", ToastStatus.error)
      return
    } else if (password.localeCompare(reenterPassword) !== 0) {
      customToast(toast, "Error creating account", "Please enter the same password in both fields", ToastStatus.error)
      return
    } else if (!isValidPassword(password)) {
      customToast(toast, "Error creating account", "Please enter a strong password with a minimum of 8 characters, one uppercase letter, one lowercase letter, one digit and one special character.", ToastStatus.error)
      return
    }
    
    // ensure first name and last name have first capitalized
    const firstNameCapitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    const lastNameCapitalized = lastName.charAt(0).toUpperCase() + lastName.slice(1)

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // update user name


        updateProfile(user, {
          displayName: `${firstNameCapitalized} ${lastNameCapitalized}`
        })
          .then(() => {
            // Update successful
            dispatch(
              login({
                email: user.email,
                uid: user.uid,
                displayName: `${firstNameCapitalized} ${lastNameCapitalized}`,
                photoUrl: user.photoURL,
              })
            );
            console.log(`welcome ${firstNameCapitalized}!`)
            customToast(toast, "Account created", `Welcome ${firstNameCapitalized}!`, ToastStatus.success)

            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
          })

      }).catch((error) => {
        const errorMessage = mapAuthCodeToMessage(error.code)
        customToast(toast, "Error creating account", errorMessage, ToastStatus.error)
      })



  }


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Stack >
            <Text color="muted" fontSize={"lg"} align={'center'}>
              Already a user? {" "}
              <Button fontSize={"lg"} onClick={() => navigate("/login")} variant="link" colorScheme={"teal"}>
                Login
              </Button>
            </Text>
          </Stack>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="reenterPassword" isRequired>
              <FormLabel>Re-enter Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setReenterPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleNewSignup}
                loadingText="Submitting"
                size="lg"
                bg={'teal.400'}
                color={'white'}
                _hover={{
                  bg: 'teal.500',
                }}>
                Create New Account
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

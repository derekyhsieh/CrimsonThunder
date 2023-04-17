import { useState } from "react"
import { Box, Flex, FormControl, FormLabel, Input, useColorModeValue, Checkbox, Link, Button, Text, Heading, HStack, Stack, useToast } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail, auth } from "../../../services/firebase"
import { customToast, ToastStatus } from "../../../utils/Toast";
import { mapAuthCodeToMessage } from "../../../services/authHelper"

const Login = () => {
  const navigate = useNavigate()

  const toast = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlePasswordReset = () => {
    if (email === "") {
      customToast(toast, "Error sending password reset email", "Please enter your email", ToastStatus.error)
      return
    }
    sendPasswordResetEmail(auth, email).then(() => {
      customToast(toast, "Password reset email sent", "Check your email for a link to reset your password", ToastStatus.success)
    })
      .catch((error) => {
        const errorCode = error.code

        customToast(toast, "Error sending password reset email", mapAuthCodeToMessage(errorCode), ToastStatus.error)

      })

  }

  const handleSignIn = () => {

    if (email === "" || password === "") {
      customToast(toast, "Error logging in", "Please fill out all fields", ToastStatus.error)
      return

    }

    signInWithEmailAndPassword(auth, email, password).then(() => {
      setEmail("")
      setPassword("")

      customToast(toast, "Logged in", "You are now logged in", ToastStatus.success)
    }).catch((error) => {
      console.log(error.code)
      customToast(toast, "Error logging in", mapAuthCodeToMessage(error.code), ToastStatus.error)
    })


  }


  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack spacing="6">
          {/* <Logo /> */}
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading as="h1" size={{ base: 'md', md: 'lg' }}>Log in to your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted" fontSize={"lg"}>Don't have an account?</Text>
              <Button fontSize="lg" onClick={() => navigate("/create")} variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={"center"}
                justify={'space-evenly'}>
                <Button onClick={handlePasswordReset} variant="link" color={'blue.400'}>Forgot password?</Button>
              </Stack>
              <Button
                onClick={handleSignIn}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login

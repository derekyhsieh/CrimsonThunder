import { Button, VStack, Text, Center } from '@chakra-ui/react'
import { signOut, auth } from '../../../services/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../app/userSlice'

const Home = () => {

  const user = useSelector(selectUser)
  const handleLogout = () => {

    signOut(auth)

  }

  return (
    <Center h="100vh">
      <VStack>
        <Text align={"center"}>{user?.displayName}</Text>
        <Button onClick={handleLogout} colorScheme="red">Logout</Button>
      </VStack>
    </Center>
  )
}

export default Home

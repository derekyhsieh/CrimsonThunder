import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiDownloadCloud } from 'react-icons/fi'
import HomeContent from './Contents/HomeContent'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar/Sidebar'

export const Home = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Flex
      as="section"
      direction={{ base: 'column', lg: 'row' }}
      height="100vh"
      bg="bg-canvas"
      overflowY="auto"
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <Box bg="bg-accent" pt={{ base: '0', lg: '3' }} flex="1">
        <Box bg="bg-canvas" borderTopLeftRadius={{ base: 'none', lg: '2rem' }} height="full">
          <Container py="8" height="full">
            <HomeContent />
          </Container>
        </Box>
      </Box>
    </Flex>
  )
}

export default Home

import React, { useEffect } from 'react'
import { Stack, Heading, Button, Box, Text, useDisclosure, CloseButton, HStack } from '@chakra-ui/react'
import { BabyList } from './BabyList'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentBaby, setCurrentBaby } from '../../../app/homeContentSlice'
import { useNavigate } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'

const HomeContent = () => {
  const currentBaby = useSelector(selectCurrentBaby)
  const dispatch = useDispatch()

  const flexSettings = {
    flex: "1",
    minW: "300px",
    textAlign: "center",
    color: "white",
    mx: "6",
    mb: "6"
  };
  const gridSettings = {
    w: "100%",
    textAlign: "center",
    color: "white",
  };

  useEffect(() => {

    console.log(currentBaby)
  }, [currentBaby])


  return (
    <Stack spacing={{ base: '8', lg: '6' }} height="full">
      <Stack
        spacing="4"
        direction={{ base: 'row', lg: 'row' }}
        justify="space-between"
        align={{ base: 'start', lg: 'center' }}
      >
        <Stack spacing="1">
          <HStack align={"center"}>
            <Heading size={{ base: 'sm', lg: 'md' }} fontWeight="bold">
              {currentBaby ? currentBaby.name : "Home"}
            </Heading>
            <Text color="muted">{currentBaby?.id}</Text>
          </HStack>
          <Text color="muted">
            {
              currentBaby ?
                `GA (Weeks): ${currentBaby.gaw} / GA (Days): ${currentBaby.gad}` :
                "All your babies at a glance"
            }
          </Text>
        </Stack>
        {
          currentBaby ? (

            <CloseButton size="lg" color={"red"} onClick={() => dispatch(setCurrentBaby(null))} />
          ) : (

            <Button variant="primary">Add New Baby</Button>
          )
        }
      </Stack>
      <Box bg="bg-surface" borderRadius="lg" borderWidth="1px" height="full">

        <BabyList />

      </Box>
    </Stack >
  )
}

export default HomeContent

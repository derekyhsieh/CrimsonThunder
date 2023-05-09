import React, { useEffect } from 'react'
import { Stack, Heading, Button, Box, Text, useDisclosure, CloseButton, HStack, Card } from '@chakra-ui/react'
import { BabyList } from './BabyList'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentBaby, setCurrentBaby } from '../../../app/homeContentSlice'
import { useNavigate } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'
import AddBabyModal from '../AddBabyModal'
import { StatCard } from './Card'
import { IconGenderFemale, IconGenderMale } from '@tabler/icons'
import head from "./Head Circumference.png"
import length from "./Head Circumference.png"
import table from "./Table.png"
import weight from "./Weight.png"

const HomeContent = () => {
  const currentBaby = useSelector(selectCurrentBaby)
  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {

    console.log(currentBaby)
  }, [currentBaby])

  const babySexIcon = () => {
    if (currentBaby) {
      return (
        currentBaby.sex == "male" ? (
          <IconGenderMale color='#74c0fc' size={"30px"} />
        ) : (
          <IconGenderFemale color="#f783ac" size="30px" />
        )
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <Stack spacing={{ base: '8', lg: '6' }} height="full">
      <AddBabyModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Stack
        spacing="4"
        direction={{ base: 'row', lg: 'row' }}
        justify="space-between"
        align={{ base: 'start', lg: 'center' }}
      >
        <Stack spacing="1">
          <HStack align={"center"} spacing="5">
            <HStack spacing={3}>
              {babySexIcon()}
              <Heading size={{ base: 'sm', lg: 'md' }} fontWeight="bold">
                {currentBaby ? currentBaby.name : "Home"}
              </Heading>
            </HStack>
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

            <Button onClick={onOpen} variant="primary">Add New Baby</Button>
          )
        }
      </Stack>
      <Box bg="bg-surface" borderRadius="lg" borderWidth="1px" height="full" maxH={"full"} overflowY={"auto"}>

        {
          currentBaby ? (
            <>
              {/* <StatCard source={table} title={"Table"} /> */}
              <StatCard source={head} title={"Head Circumference"} />
              {/* <StatCard source={length} title={"Length"} /> */}
              {/* <StatCard source={weight} title={"Weight"} /> */}
            </>
          ) : (
            <BabyList />

          )

        }


      </Box>
    </Stack >
  )
}

export default HomeContent

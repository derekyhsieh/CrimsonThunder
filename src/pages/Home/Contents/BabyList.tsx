import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  HStack,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { members } from './data'
import { AiOutlineUser } from "react-icons/ai"
import { IconChevronRight } from '@tabler/icons'
import { setCurrentBaby } from '../../../app/homeContentSlice'
import { useDispatch } from 'react-redux'

export const BabyList = () => {

  const dispatch = useDispatch()

  const handleUpdateCurrentBaby = (currentBaby: any) => {

    dispatch(setCurrentBaby(currentBaby))

  }



  return (
    <Center mx="auto" py={{ base: '4', md: '8' }} w="100%">
      <Box bg="bg-surface" py="4" w="90%">
        <Stack divider={<StackDivider />} spacing="4">
          {members.map((baby) => (
            <Stack onClick={() => handleUpdateCurrentBaby(baby)} key={baby.id} fontSize="sm" px="4" spacing="4">
              <Stack direction="row" justify="space-between" spacing="4">
                <HStack spacing="3">
                  <Avatar size="md" bg='teal.400' icon={<AiOutlineUser fontSize='1.5rem' />} />
                  <Box>
                    <Text fontWeight="medium" color="emphasized">
                      {baby.name}
                    </Text>
                  </Box>
                </HStack>
                <IconChevronRight />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Center>
  )
}

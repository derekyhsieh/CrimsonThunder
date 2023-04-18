import { Avatar, Box, HStack, Text } from '@chakra-ui/react'

interface UserProfileProps {
  name: string
  email: string
}

export const UserProfile = (props: UserProfileProps) => {
  const { name, email } = props
  return (
    <HStack spacing="3" ps="2">
      <Avatar boxSize="8" />
      <Box>
        <Text color="on-accent" fontWeight="medium" fontSize="sm">
          {name}
        </Text>
        <Text color="on-accent-muted" fontSize="sm">
          {email}
        </Text>
      </Box>
    </HStack>
  )
}

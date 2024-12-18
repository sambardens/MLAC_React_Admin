import { Box, Flex, Text } from '@chakra-ui/react';

export const AuthImage = () => (
  <Flex
    position={'fixed'}
    right="0"
    justifyContent={'end'}
    w={{ base: '100%', md: '49%' }}
    h="100vh"
    minH="700px"
    p="12px"
    background="url(/assets/images/auth.png) center center no-repeat"
    backgroundSize="cover"
    color={'brand.500'}
  >
    <Flex>
      <Text color={'brand.500'}>Artist:</Text>
      <Text ml="4px" color={'main.white'}>
        Porcelain
      </Text>
    </Flex>
  </Flex>
);

export default AuthImage;

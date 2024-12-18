import { Box, Heading } from '@chakra-ui/react';

import SignIn from './SignIn';

export const AuthSection = ({}) => {
  return (
    <>
      <Box w={{ base: '100%', sm: '454px' }} mx="auto">
        <Box w="308px" mx="auto" mb="40px">
          <Heading
            fontWeight="600"
            fontSize="46px"
            color="black"
            textAlign="center"
            mb="16px"
          >
            Welcome
          </Heading>
        </Box>
        <SignIn />
      </Box>
    </>
  );
};

export default AuthSection;

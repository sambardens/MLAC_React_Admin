import { Box, Flex } from '@chakra-ui/react';

import AuthImage from '../auth/AuthImage';
import Logo from '../logo/Logo';

// import FullPageLoader from '../Loaders/FullPageLoader';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Box>
        {/* {loading && <FullPageLoader />} */}
        <Flex
          flexDir={{ base: 'column', xl: 'row' }}
          w="100vw"
          h="100vh"
          fontFamily={'Poppins-Medium, sans-serif'}
          letterSpacing={'1px'}
          // opacity={loading ? '0.7' : '1'}
          opacity={'1'}
          bg="bg.auth"
        >
          <Flex
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            px="16px"
            // py="48px"
            pt={'48px'}
            w={{ base: '100%', md: '51%' }}
            overflow="auto"
          >
            <Box>
              <Logo />
              {children}
            </Box>
          </Flex>
          <AuthImage />
        </Flex>
      </Box>
    </>
  );
};

export default AuthLayout;

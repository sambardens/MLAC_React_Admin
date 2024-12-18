import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import Header from './components/Header';
import NavMenu from './components/NavMenu';

export const MainLayout = ({ children, setIsStartPage, back = false }) => {
  return (
    <Flex justifyContent={'space-between'} w="100vw" minH={'100vh'}>
      <Box width={'320px'}>
        <Flex position={'fixed'}>
          <NavMenu setIsStartPage={setIsStartPage} />
        </Flex>
      </Box>

      <Flex
        flexDir={'column'}
        w={`calc(100vw - 320px)`}
        bgColor="bg.main"
        transition="width 0.3s ease-out"
      >
        <Header back={back} />

        <Box minH="calc(100vh - 80px)" p="16px" bgColor="main.mainGray">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

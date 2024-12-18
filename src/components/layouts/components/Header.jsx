import { useRouter } from 'next/router';

// import UserProfile from '@/components/Modals/UserProfileModal';
import { Box, Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import ArrowLeftIcon from '@/assets/icons/base/arrowLeft.svg';

import { Logout } from '@/components/logout/Logout';
import { getCurrentMenuName } from '@/utils/getCurrentMenuName';

const Header = ({ back }) => {
  const router = useRouter();
  const currentMenuName = getCurrentMenuName(router?.pathname);

  return (
    <Box position={'relative'}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        p={'24px 16px'}
        w="100%"
        h="80px"
      >
        <Flex alignItems={'center'}>
          {back && (
            <IconButton
              aria-label="back"
              icon={<ArrowLeftIcon />}
              justifyContent={'start'}
              onClick={() => router.back()}
              variant={'unstyled'}
            />
          )}
          <Text fontSize="18px" fontWeight="600" color="main.black">
            {currentMenuName}
          </Text>
        </Flex>

        {/* <Flex alignItems={'center'}>
          <Box position={'absolute'} zIndex={'2'} top="8px" right="16px">
            <DropdownMenu openProfile={() => setIsUserProfileModal(true)} />
          </Box>
        </Flex> */}
        <Logout />
      </Flex>

      {/* {isUserProfileModal && (
        <UserProfile closeModal={() => setIsUserProfileModal(false)} />
      )} */}
    </Box>
  );
};

export default Header;

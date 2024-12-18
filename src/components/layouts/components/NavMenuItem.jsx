import { useRouter } from 'next/router';

import { Box, Flex, Icon, Text, useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import { setDefaultReleaseModalMenuScreen } from 'store/slice';

const NavMenuItem = ({
  menuName,
  isAvailable,
  icon,
  title,
  setIsStartPage,
}) => {
  const { push, pathname } = useRouter();
  const isSelected = pathname.includes(menuName);
  // const selectedBapUpdated = useSelector(
  //   state => state.user.selectedBapUpdated,
  // );
  const toast = useToast();
  // const dispatch = useDispatch();
  const color = isSelected ? 'brand.500' : 'brand.200';
  const cursor = isAvailable ? 'pointer' : 'not-allowed';

  return (
    <Flex
      onClick={() => {
        // setIsStartPage(true);
        push(`${menuName}`);
      }}
      as="button"
      cursor={cursor}
      flexDir="column"
    >
      <Flex
        pt="16px"
        pb="12px"
        px="12px"
        color={color}
        w="100%"
        align="center"
        _hover={isAvailable ? { color: 'brand.500' } : {}}
        transition="0.2s linear"
      >
        <Icon as={icon} boxSize="24px" mr="12px" />
        <Text fontSize="14px" fontWeight="400">
          {title}
        </Text>
      </Flex>
      <Box
        w="100%"
        h="4px"
        background={
          isSelected
            ? 'linear-gradient(to left, transparent, #FF0151)'
            : 'transparent'
        }
      />
    </Flex>
  );
};

export default NavMenuItem;

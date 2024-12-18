import {
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import LogoutIcon from '@/assets/icons/base/logout.svg';

import { useActions } from '@/hooks/useActions';
import { poppins_500_16_24 } from '@/styles/fontStyles';

export const Logout = () => {
  const { logout } = useActions();

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu isLazy>
      <MenuButton w={'64px'}>
        <Image
          src={'/assets/mockImg/1.png'}
          alt={'User logo'}
          w={'64px'}
          h={'64px'}
          borderRadius={'10px'}
        />
      </MenuButton>
      <MenuList>
        <MenuItem
          color={'brand.500'}
          icon={<LogoutIcon />}
          onClick={handleLogout}
        >
          <Text color={'brand.200'} sx={poppins_500_16_24}>
            Log Out
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

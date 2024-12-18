import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';

import BannedIcon from '@/assets/icons/base/banned.svg';
import DotsIcon from '@/assets/icons/base/dots.svg';
import DotsVerticalIcon from '@/assets/icons/base/dotsVertical.svg';
import HideIcon from '@/assets/icons/base/hide.svg';
import TrashIcon from '@/assets/icons/base/trash.svg';

import { useActions } from '@/hooks/useActions';
import { poppins_500_16_24 } from '@/styles/fontStyles';

export const DropDown = ({
  isCard = false,
  track = false,
  isBap = false,
  isItemUser = false,
  setIsOpenDeleteModal,
  setIsOpenHideModal,
  accountStatus = false,
  itemTrack = false,
  setTrackForDelete = false,
}) => {
  const { setCurrentTrack } = useActions();

  const styleForCard = {
    position: 'absolute',
    top: '4px',
    right: '4px',
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        onClick={e => e.stopPropagation()}
        rightIcon={
          isCard ? (
            <DotsVerticalIcon style={{ marginInlineStart: '0px' }} />
          ) : (
            <DotsIcon />
          )
        }
        variant={'unstyled'}
        pt={track ? '8px' : '0px'}
        sx={isCard && styleForCard}
        _hover={{}}
        _focus={{}}
        _active={{}}
      />
      <MenuList
        w={'210px'}
        borderRadius={'10px'}
        zIndex={500}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {/* <MenuItem
          icon={isItemUser ? <BannedIcon /> : <HideIcon />}
          sx={poppins_500_16_24}
          color={'brand.200'}
          onClick={() => {
            setIsOpenHideModal(true);
          }}
        >
          {isItemUser && accountStatus === 'ACTIVE'
            ? 'Banned user'
            : isItemUser && accountStatus === 'BANNED'
            ? 'Unbanned user'
            : 'Hide from platform'}
        </MenuItem> */}
        <MenuItem
          icon={<TrashIcon />}
          sx={poppins_500_16_24}
          color={'brand.200'}
          onClick={() => {
            itemTrack && setTrackForDelete(itemTrack);
            setIsOpenDeleteModal(true);
          }}
        >
          {`Delete ${
            track ? 'track' : isItemUser ? 'user' : isBap ? 'B.A.P' : 'release'
          }`}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

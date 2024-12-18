import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import BannedIcon from '@/assets/icons/base/banned.svg';
import TrashIcon from '@/assets/icons/base/trash.svg';

import {
  useBannedUserMutation,
  useDeleteUserMutation,
  useUnBannedUserMutation,
} from '../../../../store/users/users.api';
import { Toast } from '@/components/UI/tost/Toast';
import DeleteModal from '@/components/modals/DeleteModal';
import { poppins_500_16_24, poppins_600_32_48 } from '@/styles/fontStyles';
import getFormattedDate from '@/utils/getFormattedDate';

export const ItemUserHeader = ({
  firstName,
  lastName,
  accountStatus,
  id,
  tokenData,
}) => {
  const [deleteUser, resultDelete] = useDeleteUserMutation();
  const [bannedUser, resultBanned] = useBannedUserMutation();
  const [unBannedUser, resultUnbanned] = useUnBannedUserMutation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenBannedModal, setIsOpenBannedModal] = useState(false);

  const userHandler = async () => {
    let res;
    if (accountStatus === 'ACTIVE') {
      res = await bannedUser(id);
    } else if (accountStatus === 'BANNED') {
      res = await unBannedUser(id);
    }

    if (res) {
      const message =
        accountStatus === 'ACTIVE'
          ? 'User has been banned'
          : 'User has been unbanned';
      Toast({
        status: 'success',
        message: message,
      });
      setIsOpenBannedModal(false);
    }
  };

  const deleteHandler = async () => {
    const res = await deleteUser(id);
    if (res?.status) {
      Toast({
        status: 'success',
        message: 'User deleted',
      });
      setIsOpenDeleteModal(false);
    } else {
      setIsOpenDeleteModal(false);
    }
  };

  return (
    <>
      {isOpenBannedModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenBannedModal(false);
          }}
          deleteHandler={userHandler}
          title={accountStatus === 'BANNED' ? 'Unbanned user' : 'Banned user'}
          text={
            accountStatus === 'BANNED'
              ? 'Are you sure you want unbanned this user?'
              : 'Are you sure you want banned this user?'
          }
          isItemUserComponent={true}
          accountStatus={accountStatus}
          isLoadingDelete={
            accountStatus === 'BANNED'
              ? resultUnbanned?.isLoading
              : resultBanned?.isLoading
          }
        />
      )}
      {isOpenDeleteModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenDeleteModal(false);
          }}
          deleteHandler={deleteHandler}
          title={'Delete user'}
          text={'Are you sure you want to hide this user?'}
          description={'Once deleted, it cannot be restored'}
          isLoadingDelete={resultDelete.isLoading}
        />
      )}
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text as={'h1'} sx={poppins_600_32_48} color={'textColor.black'}>
          {firstName} {lastName}
        </Text>
        <Flex alignItems={'center'} gap={'50px'}>
          {accountStatus === 'BANNED' && (
            <Text
              fontWeight="400"
              color="brand.500"
              textDecoration={'underline'}
              textUnderlineOffset={'3px'}
              pb={'2px'}
            >
              User banned
            </Text>
          )}
          <Text fontWeight="400" color="brand.200" pb={'2px'}>
            Last activity date:
            <Box as="span" color={'black'}>
              {' '}
              {getFormattedDate(tokenData?.lastSignIn)}
            </Box>
          </Text>
          <Flex alignItems={'center'} gap={'16px'}>
            {/* <Button
              leftIcon={<BannedIcon />}
              variant="unstyled"
              sx={poppins_500_16_24}
              color={'brand.200'}
              display={'flex'}
              alignItems={'center'}
              p={'12px'}
              cursor={'pointer'}
              onClick={() => setIsOpenBannedModal(true)}
            >
              {accountStatus === 'BANNED' ? 'Unbanned user' : ' Banned user'}
            </Button> */}
            <Button
              leftIcon={<TrashIcon />}
              variant="unstyled"
              sx={poppins_500_16_24}
              color={'brand.200'}
              display={'flex'}
              alignItems={'center'}
              p={'12px'}
              cursor={'pointer'}
              onClick={() => setIsOpenDeleteModal(true)}
            >
              Delete user
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

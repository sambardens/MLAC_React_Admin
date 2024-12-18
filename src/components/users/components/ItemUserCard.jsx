import { Box, Flex, Grid, Image, Text, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import {
  useBannedUserMutation,
  useDeleteUserMutation,
  useUnBannedUserMutation,
} from '../../../../store/users/users.api';
import { DropDown } from '@/components/UI/DropDown';
import { Toast } from '@/components/UI/tost/Toast';
import DeleteModal from '@/components/modals/DeleteModal';
import { poppins_400_14_21, poppins_500_18_27 } from '@/styles/fontStyles';
import { getImageSrc } from '@/utils/getImageSrc';

export const ItemUserCard = ({ user }) => {
  const [bannedUser, resultBanned] = useBannedUserMutation();
  const [deleteUser, resultDelete] = useDeleteUserMutation();
  const [unBannedUser, resultUnbanned] = useUnBannedUserMutation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenBannedModal, setIsOpenBannedModal] = useState(false);

  console.log(user, 'user');

  const userHandler = async () => {
    let res;
    if (user?.accountStatus === 'ACTIVE') {
      res = await bannedUser(user?.id);
    } else if (user?.accountStatus === 'BANNED') {
      res = await unBannedUser(user?.id);
    }

    if (res) {
      const message =
        user?.accountStatus === 'ACTIVE'
          ? 'User has been banned'
          : 'User unbanned';
      Toast({
        status: 'success',
        message: message,
      });
      setIsOpenBannedModal(false);
    }
  };

  const deleteHandler = async () => {
    const res = await deleteUser(user?.id);
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

  const getUniqueRoles = dataArray => {
    const uniqueRoles = [...new Set(dataArray?.map(item => item.role))];
    return uniqueRoles;
  };

  return (
    <>
      {isOpenBannedModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenBannedModal(false);
          }}
          deleteHandler={userHandler}
          title={
            user?.accountStatus === 'BANNED' ? 'Unbanned user' : 'Banned user'
          }
          text={
            user?.accountStatus === 'BANNED'
              ? 'Are you sure you want unbanned this user?'
              : 'Are you sure you want banned this user?'
          }
          isItemUserComponent={true}
          isLoadingDelete={
            user?.accountStatus === 'BANNED'
              ? resultUnbanned?.isLoading
              : resultBanned?.isLoading
          }
          accountStatus={user?.accountStatus}
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
      <Grid
        templateColumns="0.2fr 1fr 1fr 1fr 0.2fr"
        gap="12px"
        alignItems="center"
        p="12px"
        h="80px"
        w={'100%'}
        bgColor={user?.accountStatus === 'BANNED' ? 'main.lightRed' : 'bg.main'}
        borderRadius="10px"
        // _hover={{ bg: 'main.lightRed' }}
        cursor={'pointer'}
        position={'relative'}
      >
        {user?.accountStatus === 'BANNED' && (
          <Text
            fontWeight="400"
            color="brand.500"
            position={'absolute'}
            right={'60px'}
            top={'25px'}
            textDecoration={'underline'}
            textUnderlineOffset={'3px'}
          >
            User banned
          </Text>
        )}
        <Image
          src={getImageSrc(user?.avatar)}
          w={'56px'}
          h={'56px'}
          borderRadius={'10px'}
          alt={'User image'}
        />
        <Tooltip
          hasArrow
          label={user?.firstName?.length > 18 && user?.firstName}
          placement="auto"
          bg="bg.black"
          color="textColor.white"
          fontSize="16px"
          borderRadius={'5px'}
        >
          <Text
            sx={poppins_500_18_27}
            align="start"
            color="main.black"
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace="nowrap"
            maxWidth={'400px'}
          >
            {user.firstName} {user.lastName}
          </Text>
        </Tooltip>

        <Tooltip
          hasArrow
          label={user?.email?.length > 18 && user?.email}
          placement="auto"
          bg="bg.black"
          color="textColor.white"
          fontSize="16px"
          borderRadius={'5px'}
        >
          <Text
            fontWeight="400"
            align="start"
            color="brand.500"
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace="nowrap"
            maxWidth={'400px'}
          >
            {user?.email}
          </Text>
        </Tooltip>

        <Flex flexDir={'column'} align={'center'}>
          {user?.baps?.length !== 0 ? (
            getUniqueRoles(user?.baps)?.map(item => {
              return (
                <Text
                  key={item}
                  align="start"
                  color="main.textGray"
                  sx={poppins_400_14_21}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  whiteSpace="nowrap"
                  maxWidth={'400px'}
                >
                  {item}
                </Text>
              );
            })
          ) : (
            <Text
              align="start"
              color="main.textGray"
              sx={poppins_400_14_21}
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              whiteSpace="nowrap"
              maxWidth={'400px'}
            >
              Role not specified
            </Text>
          )}
        </Flex>

        <Box align="end">
          <DropDown
            accountStatus={user?.accountStatus}
            setIsOpenDeleteModal={setIsOpenDeleteModal}
            setIsOpenHideModal={setIsOpenBannedModal}
            isItemUser={true}
          />
        </Box>
      </Grid>
    </>
  );
};

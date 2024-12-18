import { useRouter } from 'next/router';

import { ViewOffIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, Tooltip, useToast } from '@chakra-ui/react';
import { memo, useState } from 'react';

import HideIcon from '@/assets/icons/base/hide.svg';

import {
  useDeleteBapMutation,
  useUpdateBapStatusMutation,
} from '../../../../store/bap/bap.api';
import { DropDown } from '../../UI/DropDown';
import { Toast } from '@/components/UI/tost/Toast';
import DeleteModal from '@/components/modals/DeleteModal';
import { useActions } from '@/hooks/useActions';
import { getImageSrc } from '@/utils/getImageSrc';

const BapCardContent = ({ bap, w = '247px', h = '200px' }) => {
  const [updateBapStatus, resultUpdate] = useUpdateBapStatusMutation();
  const [deleteBap, resultDelete] = useDeleteBapMutation();
  const router = useRouter();
  const { setCurrentBap } = useActions();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenHideModal, setIsOpenHideModal] = useState(false);

  const deleteHandler = async () => {
    const res = await deleteBap(bap?.id);
    if (res) {
      const message = 'Bap has been removed';
      Toast({
        status: 'success',
        message: message,
      });
      setIsOpenDeleteModal(false);
    }
  };

  const hideHandler = async () => {
    const option = {
      bapId: bap?.id,
      bapStatus: bap.bapStatus === 'ACTIVE' ? 'HIDDEN' : 'ACTIVE',
    };
    const res = await updateBapStatus(option);
    if (res) {
      const message =
        bap?.bapStatus === 'ACTIVE'
          ? 'Bap has been hide from platform'
          : 'Bap is visible on the platform';
      Toast({
        status: 'success',
        message: message,
      });
      setIsOpenHideModal(false);
    }
  };

  return (
    <Flex
      as="li"
      w={w}
      h={h}
      borderRadius="10px"
      bg="brand.500"
      pos="relative"
      bgImage={`url(${getImageSrc(bap?.avatar)})`}
      bgSize="100% 100%"
      bgPosition="center"
      onClick={() => {
        setCurrentBap(bap);
        router.push(`/bap/${bap?.id}`);
      }}
      borderColor="transparent"
      _hover={{ boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.2)' }}
      cursor="pointer"
      overflow="hidden"
      alignItems="flex-end"
      position={'relative'}
    >
      {isOpenDeleteModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenDeleteModal(false);
          }}
          deleteHandler={deleteHandler}
          title={'Delete bap'}
          text={'Are you sure you want to delete this bap?'}
          description={'Once deleted, it cannot be restored'}
          isLoadingDelete={resultDelete?.isLoading}
        />
      )}
      {isOpenHideModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenHideModal(false);
          }}
          deleteHandler={hideHandler}
          title={
            bap?.bapStatus === 'ACTIVE' ? 'Hide bap' : 'Resume on platform'
          }
          text={
            bap?.bapStatus === 'ACTIVE'
              ? 'Are you sure you want to hide this bap?'
              : 'Are you sure you want to make this bap visible?'
          }
          description={
            bap?.bapStatus === 'ACTIVE'
              ? 'This bap will be hidden from the platform'
              : 'This bap will be visible on the platform'
          }
          accountStatus={bap?.bapStatus}
          hide={true}
          isLoadingDelete={resultUpdate?.isLoading}
        />
      )}

      {bap?.bapStatus === 'HIDDEN' && (
        <Tooltip
          label={'This bap is hidden from the platform'}
          hasArrow
          bg="main.black"
          borderRadius="10px"
          fontWeight="500"
          fontSize="14px"
        >
          <Flex
            cursor={'default'}
            position={'absolute'}
            align={'center'}
            justify={'center'}
            top={'9.5px'}
            right={'42px'}
            h={'23px'}
            w={'23px'}
            bg={'rgba(40, 39, 39, 0.70)'}
            borderRadius={'50%'}
          >
            <ViewOffIcon color={'white'} />
          </Flex>
        </Tooltip>
      )}

      <DropDown
        isBap={true}
        isCard={true}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        setIsOpenHideModal={setIsOpenHideModal}
      />
      <Box bgColor="main.grayRgba" p="12px" w="100%">
        <Tooltip
          isDisabled={bap.name?.length < 24}
          label={bap?.name}
          hasArrow
          bg="brand.200"
          borderRadius="10px"
          fontWeight="500"
          fontSize="14px"
        >
          <Text
            fontWeight="500"
            fontSize="16px"
            color="main.white"
            mb="8px"
            isTruncated={true}
          >
            {bap?.name}
          </Text>
        </Tooltip>
        <Flex alignItems={'center'} gap={'8px'}>
          <Text fontWeight="400" fontSize="14px" color="main.white">
            {`${bap.countMembers} members `}
          </Text>
          <Box
            as="span"
            w={'4px'}
            h={'4px'}
            borderRadius={'50%'}
            bg={'main.white'}
          ></Box>
          <Text fontWeight="400" fontSize="14px" color="main.white">
            {`${bap.countReleases} releases `}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

const BapCard = memo(BapCardContent);

export default BapCard;

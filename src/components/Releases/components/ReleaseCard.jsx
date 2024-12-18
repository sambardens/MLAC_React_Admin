import { useRouter } from 'next/router';

import { Box, Flex, Text, Tooltip, useToast } from '@chakra-ui/react';
import { useState } from 'react';

import { useDeleteReleaseMutation } from '../../../../store/releases/releases.api';
import { DropDown } from '../../UI/DropDown';
import { Toast } from '@/components/UI/tost/Toast';
import DeleteModal from '@/components/modals/DeleteModal';
import { useActions } from '@/hooks/useActions';
import { getImageSrc } from '@/utils/getImageSrc';

const ReleaseCard = ({ release, w = '247px', h = '200px' }) => {
  const router = useRouter();
  const { setCurrentRelease } = useActions();
  const [deleteRelease, resultDelete] = useDeleteReleaseMutation();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenHideModal, setIsOpenHideModal] = useState(false);

  const deleteHandler = async () => {
    const res = await deleteRelease(release?.id);
    if (res?.error !== 'Request failed with status code 500') {
      Toast({
        status: 'success',
        message: 'Track deleted',
      });
      setIsOpenDeleteModal(false);
      router?.push('/releases');
    } else {
      setIsOpenDeleteModal(false);
    }
  };

  const hideHandler = () => {};

  return (
    <Flex
      as="li"
      w={w}
      h={h}
      borderRadius="10px"
      bg="brand.500"
      pos="relative"
      bgImage={`url(${getImageSrc(release?.logo)})`}
      bgSize="100% 100%"
      bgPosition="center"
      onClick={() => {
        setCurrentRelease(release);
        router.push(`/releases/${release?.id}`);
      }}
      borderColor="transparent"
      _hover={{ boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.2)' }}
      cursor="pointer"
      overflow="hidden"
      alignItems="flex-end"
    >
      {isOpenDeleteModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenDeleteModal(false);
          }}
          deleteHandler={deleteHandler}
          title={'Delete release'}
          text={'Are you sure you want to delete this release?'}
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
          title={'Hide release'}
          text={'Are you sure you want to hide this release?'}
          description={'This release will be hidden from the platform'}
          hide={true}
          // isLoadingDelete={isLoadingDelete}
        />
      )}
      <DropDown
        isCard={true}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        setIsOpenHideModal={setIsOpenHideModal}
      />
      <Box bgColor="main.grayRgba" p="12px" w="100%">
        <Tooltip
          isDisabled={release?.name?.length < 24}
          label={release?.name}
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
            {release?.name}
          </Text>
        </Tooltip>
        <Tooltip
          isDisabled={release?.type?.length < 24}
          label={release?.type}
          hasArrow
          bg="brand.200"
          borderRadius="10px"
          fontWeight="500"
          fontSize="14px"
        >
          <Text fontWeight="400" fontSize="14px" color="main.white">
            {release?.type}
          </Text>
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default ReleaseCard;

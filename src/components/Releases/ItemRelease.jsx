import { useRouter } from 'next/router';

import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { useSelector } from 'react-redux';

import { currentSelectors } from '../../../store/current';
import {
  useDeleteReleaseMutation,
  useLazyGetItemReleaseQuery,
} from '../../../store/releases/releases.api';
import { CurrentRelease } from '../../../store/releases/releases.selectors';
import { DropDown } from '../UI/DropDown';
import { Toast } from '../UI/tost/Toast';
import DeleteModal from '../modals/DeleteModal';
import AllTracks from './components/AllTracks';
import { useActions } from '@/hooks/useActions';
import { poppins_600_18_27, poppins_600_32_48 } from '@/styles/fontStyles';
import { getImageSrc } from '@/utils/getImageSrc';

export const ItemRelease = () => {
  const router = useRouter();
  const { setCurrentTrack } = useActions();
  const [getItemRelease, resultGet] = useLazyGetItemReleaseQuery();
  const [deleteRelease, resultDelete] = useDeleteReleaseMutation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenHideModal, setIsOpenHideModal] = useState(false);
  const [filteredMusicData, setFilteredMusicData] = useState(null);

  const itemRelease = CurrentRelease();

  useLayoutEffect(() => {
    if (router?.query?.releasesId) {
      getItemRelease(router?.query?.releasesId);
    }
  }, [getItemRelease, router?.query?.releasesId]);

  useEffect(() => () => setCurrentTrack(null), [setCurrentTrack]);

  useEffect(() => {
    if (itemRelease) {
      setFilteredMusicData(itemRelease?.tracks);
    }
  }, [itemRelease]);

  const deleteHandler = async () => {
    const res = await deleteRelease(itemRelease?.id);
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
      p={'24px'}
      bg={'bg.main'}
      borderRadius={'10px'}
      position="relative"
      h={'100%'}
      overflowY={scroll}
      gap={'24px'}
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
          // isLoadingDelete={isLoadingDelete}
        />
      )}
      {!resultGet?.isLoading && (
        <>
          <Tilt>
            <Image
              w={'213px'}
              h={'183px'}
              alt={'Release image'}
              borderRadius={'20px'}
              src={getImageSrc(itemRelease?.logo)}
            />
          </Tilt>

          <Flex flexDir={'column'} w={'100%'}>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              <Text as="h1" sx={poppins_600_32_48} color={'textColor.black'}>
                {itemRelease?.name}
              </Text>
              <Flex alignItems={'center'} gap={'5px'} mr={'14px'}>
                <DropDown
                  setIsOpenDeleteModal={setIsOpenDeleteModal}
                  setIsOpenHideModal={setIsOpenHideModal}
                />
              </Flex>
            </Flex>

            <Text
              as="h1"
              sx={poppins_600_18_27}
              color={'textColor.red'}
              mt={'8px'}
            >
              {itemRelease?.bapName}
            </Text>

            {filteredMusicData?.length !== 0 ? (
              <AllTracks
                currentRelease={itemRelease}
                musicData={filteredMusicData}
                setFilteredMusicData={setFilteredMusicData}
              />
            ) : (
              <Flex
                align={'center'}
                justify={'center'}
                pt={'200px'}
                mr={'100px'}
              >
                <Text fontSize={'18px'}>This release has no added tracks</Text>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

import {
  Box,
  Flex,
  Image,
  Input,
  ListItem,
  Spinner,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { downloadTrack } from 'src/utils/downloadTrack';
import { getImageSrc } from 'src/utils/getImageSrc';
import { audioSelectors } from 'store/audio';
import {
  pausePausePlayAllTracks,
  pausePlayback,
  setCurrentTrack,
  setPlayMode,
  startPlayback,
} from 'store/audio/audio-slice';
import { downloadsSelectors } from 'store/downloads';

import SearchIcon from '@/assets/icons/base/search.svg';
import DownloadIcon from '@/assets/icons/downloads/download.svg';

import { downloadOneTrack } from '../../../../store/audio/audioDownloadActions';
import { useDeleteTrackMutation } from '../../../../store/releases/releases.api';
import { DropDown } from '../../UI/DropDown';
import AllTracksSkeleton from './AllTracksSkeleton';
import BasePlayer from './BasePlayer';
import CustomInput from '@/components/UI/customInputs/CustomInput';
import { Toast } from '@/components/UI/tost/Toast';
import DeleteModal from '@/components/modals/DeleteModal';
import { useActions } from '@/hooks/useActions';
import {
  poppins_400_14_21,
  poppins_400_16_24,
  poppins_500_18_27,
} from '@/styles/fontStyles';

const AllTracksContent = ({
  musicData,
  setFilteredMusicData,
  currentRelease,
}) => {
  const { setCurrentTrack } = useActions();
  const isPlaying = useSelector(audioSelectors.getIsPlaying);
  const currentTrack = useSelector(audioSelectors.getCurrentTrack);
  const isLoadingData = useSelector(downloadsSelectors.getIsLoading);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenHideModal, setIsOpenHideModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [deleteTrack, result] = useDeleteTrackMutation();

  const handlePlay = itemTrack => {
    setCurrentTrack(itemTrack);
  };

  const handleOnError = e => {
    e.target.src = '/assets/mockImg/rectangle_3.jpg';
  };

  const handleDownloadTrack = async track => {
    setIsDownloading(true);
    const res = await downloadOneTrack(track);
    if (res) {
      setIsDownloading(false);
      setSelectedTrack(null);
    }
  };

  const handleChange = e => {
    setSearchValue(e.target.value);
  };

  const normalizedFilterValue = searchValue?.toLowerCase().trim();
  const tracks = normalizedFilterValue
    ? musicData?.filter(track =>
        track.name.toLowerCase().includes(normalizedFilterValue),
      )
    : musicData;

  const deleteHandler = async () => {
    if (selectedTrack) {
      const res = await deleteTrack(selectedTrack?.id);

      if (res?.error !== 'Request failed with status code 500') {
        Toast({
          status: 'success',
          message: 'Track deleted',
        });
        setIsOpenDeleteModal(false);
      } else {
        setIsOpenDeleteModal(false);
      }
    }
  };

  const hideHandler = () => {};

  return (
    <Box as={'section'} pt={'5px'}>
      {isOpenDeleteModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenDeleteModal(false);
          }}
          deleteHandler={deleteHandler}
          title={'Delete track'}
          text={'Are you sure you want to delete this track?'}
          description={'Once deleted, it cannot be restored'}
          isLoadingDelete={result?.isLoading}
        />
      )}

      {isOpenHideModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenHideModal(false);
          }}
          deleteHandler={hideHandler}
          title={'Hide release'}
          text={'Are you sure you want to hide this track?'}
          description={'This track will be hidden from the platform'}
          hide={true}
          // isLoadingDelete={isLoadingDelete}
        />
      )}

      <Flex justify={'end'} w={'100%'}>
        <CustomInput
          icon={SearchIcon}
          maxW="350px"
          placeholder="Search"
          value={searchValue}
          onChange={handleChange}
        />
      </Flex>

      {isLoadingData && <AllTracksSkeleton />}

      <UnorderedList
        margin={'0px'}
        mt={'20px'}
        h={`calc(100vh - 323px)`}
        overflowY="scroll"
        display="flex"
        flexDir="column"
        gap="8px"
      >
        {tracks?.length > 0 &&
          tracks.map(itemTrack => {
            return (
              <ListItem
                key={itemTrack?.id}
                p={'8px'}
                listStyleType={'none'}
                w="calc(100% - 5px)"
                pos="relative"
                data-id="single-track"
                pl="60px"
              >
                <Flex
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  gap={'16px'}
                >
                  <Image
                    borderRadius={'10px'}
                    w={'82px'}
                    h={'82px'}
                    src={getImageSrc(currentRelease?.logo)}
                    alt={'img'}
                    onError={e => handleOnError(e)}
                  />
                  <Flex flexDir={'column'} w={'100%'}>
                    <Flex
                      alignItems={'center'}
                      justifyContent={'space-between'}
                    >
                      <Tooltip
                        hasArrow
                        label={itemTrack?.name?.length > 38 && itemTrack?.name}
                        placement="auto"
                        bg="bg.black"
                        color="textColor.white"
                        fontSize="16px"
                        borderRadius={'5px'}
                      >
                        <Text
                          width={'calc(100% - 120px)'}
                          overflow={'hidden'}
                          textOverflow={'ellipsis'}
                          whiteSpace="nowrap"
                          sx={poppins_500_18_27}
                          color={'textColor.black'}
                        >
                          {itemTrack?.name}
                        </Text>
                      </Tooltip>
                      <Flex align={'center'} gap={'10px'} zIndex={100}>
                        <Flex
                          alignItems={'center'}
                          onClick={() => {
                            setSelectedTrack(itemTrack.id);
                            handleDownloadTrack({
                              id: itemTrack.id,
                              name: itemTrack.name,
                            });
                          }}
                          cursor={'pointer'}
                          aria-label={`download track ${itemTrack.name}`}
                          _hover={{ color: 'brand.500' }}
                          transition="0.3s linear"
                        >
                          {itemTrack.id !== selectedTrack ? (
                            <DownloadIcon />
                          ) : (
                            isDownloading &&
                            itemTrack.id === selectedTrack && <Spinner />
                          )}
                        </Flex>

                        <DropDown
                          setIsOpenDeleteModal={setIsOpenDeleteModal}
                          setIsOpenHideModal={setIsOpenHideModal}
                          track={true}
                          itemTrack={itemTrack}
                          setTrackForDelete={setSelectedTrack}
                        />
                      </Flex>
                    </Flex>

                    <Tooltip
                      hasArrow
                      label={
                        currentRelease?.bapName?.length > 38 &&
                        currentRelease?.bapName
                      }
                      placement="auto"
                      bg="bg.black"
                      color="textColor.white"
                      fontSize="16px"
                      borderRadius={'5px'}
                    >
                      <Text
                        sx={poppins_400_14_21}
                        color={'textColor.gray'}
                        mt={'8px'}
                        width={'calc(100% - 120px)'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        whiteSpace="nowrap"
                      >
                        {currentRelease?.bapName}
                      </Text>
                    </Tooltip>

                    <Box mt={'4px'}>
                      <BasePlayer
                        itemTrack={itemTrack}
                        handlePlay={handlePlay}
                      />
                    </Box>
                  </Flex>
                </Flex>
              </ListItem>
            );
          })}
      </UnorderedList>
    </Box>
  );
};

const AllTracks = memo(AllTracksContent);

export default AllTracks;

import { useRouter } from 'next/router';

import { ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import TrashIcon from '@/assets/icons/base/trash.svg';

import {
  useDeleteBapMutation,
  useGetBapDetailQuery,
  useLazyGetBapDetailQuery,
} from '../../../store/bap/bap.api';
import { currentSelectors } from '../../../store/current';
import { Releases } from '../Releases/Releases';
import { Toast } from '../UI/tost/Toast';
import DeleteModal from '../modals/DeleteModal';
import { Users } from '../users/Users';
import { MainInfoTab } from './components/MainInfoTab';
import { useActions } from '@/hooks/useActions';
import { poppins_500_16_24, poppins_500_18_27 } from '@/styles/fontStyles';

const titleTabsArr = [
  { title: 'Main info', id: 1 },
  { title: 'Releases', id: 2 },
  { title: 'Members', id: 3 },
];

export const ItemBap = () => {
  const router = useRouter();
  const [getBapQuery, resultGetInfo] = useLazyGetBapDetailQuery();
  const [deleteBap, resultDelete] = useDeleteBapMutation();
  const { setCurrentTab, resetCurrent } = useActions();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const currentTab = useSelector(currentSelectors.getCurrentTab);
  const bapInfo = resultGetInfo?.data?.baps || {};

  useLayoutEffect(() => {
    if (router?.query?.bapId) {
      getBapQuery(router?.query?.bapId);
    }
  }, [getBapQuery, router?.query?.bapId]);

  //   for reset current state
  useEffect(() => () => resetCurrent(), [resetCurrent]);

  const deleteHandler = async () => {
    const res = await deleteBap(bapInfo?.id);
    if (res) {
      const message = 'Bap has been removed';
      Toast({
        status: 'success',
        message: message,
      });
      setIsOpenDeleteModal(false);
      router.push('/bap');
    }
  };

  return (
    <Box
      p={'24px'}
      bg={'bg.main'}
      borderRadius={'10px'}
      position="relative"
      h={'100%'}
    >
      {isOpenDeleteModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenDeleteModal(false);
          }}
          deleteHandler={deleteHandler}
          title={'Delete B.A.P.'}
          text={'Are you sure you want to hide this B.A.P ?'}
          description={'Once deleted, it cannot be restored'}
          isLoadingDelete={resultDelete?.isLoading}
        />
      )}

      {bapInfo?.bapStatus === 'HIDDEN' && (
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
            top={'33px'}
            right={'180px'}
            h={'23px'}
            w={'23px'}
            bg={'rgba(40, 39, 39, 0.70)'}
            borderRadius={'50%'}
          >
            <ViewOffIcon color={'white'} />
          </Flex>
        </Tooltip>
      )}

      <Button
        position={'absolute'}
        zIndex={50}
        top={'24px'}
        right={'24px'}
        leftIcon={<TrashIcon />}
        variant="unstyled"
        sx={poppins_500_16_24}
        color={'brand.500'}
        display={'flex'}
        alignItems={'center'}
        p={'12px'}
        cursor={'pointer'}
        onClick={() => setIsOpenDeleteModal(true)}
      >
        Delete B.A.P
      </Button>

      <Tabs
        position="relative"
        variant="unstyled"
        isLazy={true}
        defaultIndex={currentTab - 1}
      >
        <TabList>
          {titleTabsArr?.map(({ title, id }) => {
            return (
              <Box key={id}>
                <Tab
                  _selected={{ color: 'brand.red' }}
                  sx={poppins_500_18_27}
                  color={'textColor.gray'}
                  onClick={() => setCurrentTab(id)}
                >
                  {title}
                </Tab>
              </Box>
            );
          })}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="brand.500"
          borderRadius="1px"
        />
        <TabPanels h={'100%'} mt={'24px'}>
          <TabPanel p={'0'} h={'calc(100% - 65px)'} overflow={'auto'} pr="24px">
            <MainInfoTab
              dataInfo={bapInfo}
              isLoadingInfo={resultGetInfo?.isLoading}
            />
          </TabPanel>
          <TabPanel p={'0'} h={'calc(100% - 65px)'} overflow={'auto'} pr="24px">
            <Releases isBapPage={true} />
          </TabPanel>
          <TabPanel p={'0'} h={'calc(100% - 65px)'} overflow={'auto'} pr="24px">
            <Users isBapPage={true} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

import { UsersData } from '../../../../store/users/users.selectors';
import { DrawerComponent } from '@/components/UI/Drawer';
import { Search } from '@/components/UI/Search';
import CustomButton from '@/components/UI/buttons/CustomButton';
import CustomSelect from '@/components/UI/customInputs/CustomSelect';
import { poppins_400_16_24, poppins_500_18_27 } from '@/styles/fontStyles';
import { isEqual } from '@/utils/users/isEqualArray';

export const UsersHeader = ({
  isBapPage = false,
  arrForFilter,
  setNewFilteredArr,
  isLoading = false,
  currentItems,
  handlePageChange,
  componentType,
  bapOptions = false,
  rolesOptions = false,
  getUsersQuery = false,
  isUsersPage = false,
  activityPercentage = false,
  setFilteredUsers,
  isEqualArrays,
}) => {
  const [dataPercentage, setDataPercentage] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const usersDataLength = UsersData()?.length;

  useEffect(() => {
    const percentageDay = activityPercentage?.percentages?.day;
    const percentageWeek = activityPercentage?.percentages?.week;
    const percentageMonth = activityPercentage?.percentages?.month;
    const dataUsersDay = activityPercentage?.users?.day;
    const dataUsersWeek = activityPercentage?.users?.week;
    const dataUsersMonth = activityPercentage?.users?.month;

    setDataPercentage([
      { label: 'Day', percentage: percentageDay, data: dataUsersDay },
      { label: 'Week', percentage: percentageWeek, data: dataUsersWeek },
      { label: 'Month', percentage: percentageMonth, data: dataUsersMonth },
    ]);
  }, [activityPercentage]);

  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Flex w={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Flex align={'center'} gap={'10px'} w={'max-content'}>
          <Search
            isLoading={isLoading}
            arrForFilter={arrForFilter}
            setterNewFilteredArr={setNewFilteredArr}
            currentItems={currentItems}
            handlePageChange={handlePageChange}
          />
          {isUsersPage && (
            <Flex align={'start'} flexDir={'column'} gap={'2px'}>
              <Text w={'400px'} sx={poppins_400_16_24}>
                Total registered users:{' '}
                <Box as={'span'} sx={poppins_500_18_27}>
                  <CountUp start={0} end={usersDataLength} duration={5} />
                </Box>
              </Text>
              <Flex
                align={'center'}
                gap={'10px'}
                opacity={
                  (!isEqualArrays && !activeButton) || isOpenDrawer ? 0.3 : 1
                }
              >
                {console.log(isEqualArrays, 'isEqualArrays')}
                <Text sx={poppins_400_16_24} whiteSpace={'nowrap'}>
                  Latest users activity:
                </Text>
                {dataPercentage?.map((item, index) => {
                  return (
                    (item?.label === activeButton?.label || !activeButton) && (
                      <CustomButton
                        key={index}
                        h={'20px'}
                        w={'120px'}
                        onClickHandler={() => {
                          if (!isEqualArrays || isOpenDrawer) {
                            return;
                          }
                          setActiveButton(item);
                          setFilteredUsers(item?.data);
                        }}
                      >
                        {item?.label} {item?.percentage}
                      </CustomButton>
                    )
                  );
                })}
                {activeButton && (
                  <CustomButton
                    w={'120px'}
                    h={'30px'}
                    onClickHandler={() => {
                      getUsersQuery();
                      setActiveButton(null);
                    }}
                  >
                    Reset
                  </CustomButton>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>

        {!isBapPage && (
          <DrawerComponent
            componentType={componentType}
            bapOptions={bapOptions}
            rolesOptions={rolesOptions}
            getUsersQuery={getUsersQuery}
            isUsersPage={isUsersPage}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        )}
      </Flex>
    </Flex>
  );
};

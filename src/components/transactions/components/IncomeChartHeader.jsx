import { Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import CountUp from 'react-countup';
import { useSelector } from 'react-redux';

import ReceiptIcon from '@/assets/icons/income/receipt.svg';

import { FilteredData } from '../../../../store/transactions/transactions.selectors';
import { poppins_500_16_24, poppins_600_18_27 } from '@/styles/fontStyles';

export const IncomeChartHeader = ({ setActiveChart, activeChart }) => {
  const filteredData = FilteredData();

  const calculateTotalStats = () => {
    if (!filteredData) {
      return;
    }
    return filteredData.reduce(
      (accumulator, item) => {
        accumulator.totalFees += item.fees;
        accumulator.totalGross += item.gross;
        accumulator.totalNet += item.net;
        return accumulator;
      },
      { totalFees: 0, totalGross: 0, totalNet: 0 },
    );
  };

  const chartButtonsArr = [
    {
      title: 'Gross',
      amount: calculateTotalStats()?.totalGross,
    },
    {
      title: 'Fees',
      amount: calculateTotalStats()?.totalFees,
    },
    {
      title: 'Net',
      amount: calculateTotalStats()?.totalNet,
    },
  ];

  return (
    <Flex
      w={'100%'}
      p={'20px'}
      alignItems={'center'}
      borderRadius={'10px'}
      bg={'bg.main'}
      my={'16px'}
      gap={'40px'}
    >
      <ReceiptIcon />
      <UnorderedList
        display={'flex'}
        gap={'40px'}
        w={'100%'}
        alignSelf={'stretch'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {chartButtonsArr?.map(item => {
          return (
            <ListItem
              key={item.title}
              maxW={'250px'}
              w={'100%'}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              gap="{8px}"
              borderRadius={'10px'}
              _hover={{ bg: 'bg.light' }}
              cursor={'pointer'}
              onClick={() => setActiveChart(item.title)}
            >
              <Text
                sx={poppins_600_18_27}
                color={
                  activeChart === item.title
                    ? 'textColor.red'
                    : 'textColor.black'
                }
              >
                {item.title}
              </Text>
              <Text
                sx={poppins_500_16_24}
                color={
                  activeChart === item.title
                    ? 'textColor.red'
                    : 'textColor.black'
                }
              >
                £<CountUp start={0} end={item?.amount} duration={5} />
              </Text>
            </ListItem>
          );
        })}
      </UnorderedList>
    </Flex>
  );
};

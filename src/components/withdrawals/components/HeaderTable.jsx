import { Box, Grid, Text } from '@chakra-ui/react';
import React from 'react';

import { poppins_400_14_21, poppins_500_18_27 } from '@/styles/fontStyles';

export const HeaderTable = () => {
  const titleHeader = [
    { title: 'Status' },
    { title: 'Name' },
    { title: 'Payment email' },
    { title: 'Date' },
    { title: 'Amount' },
    { title: '' },
  ];

  return (
    <Grid
      templateColumns="0.2fr 1.5fr 1.5fr 0.4fr 0.73fr 0.4fr"
      gap="12px"
      alignItems="center"
      p="12px"
      w={'100%'}
      position={'relative'}
    >
      {titleHeader?.map((item, index) => {
        return (
          <Text
            key={index}
            sx={poppins_400_14_21}
            align="start"
            color="main.black"
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace="nowrap"
            maxWidth={'400px'}
          >
            {item.title}
          </Text>
        );
      })}
    </Grid>
  );
};

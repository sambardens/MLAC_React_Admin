import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import BapCard from './BapCard';
import { mockReleases } from '@/mockData/mockReleases';
import { poppins_500_18_27 } from '@/styles/fontStyles';

export const MemberOfBap = ({ bapsOfUser }) => {
  return (
    <Box w={'100%'} my={'24px'}>
      <Text color={'textColor.black'} sx={poppins_500_18_27}>
        {`Member of ${bapsOfUser?.length} B.A.P:`}
      </Text>
      {bapsOfUser?.length !== 0 ? (
        <Flex
          as="ul"
          alignItems="space-between"
          gap="16px"
          w="100%"
          flexWrap="wrap"
          mt={'24px'}
          // h={`calc(100vh - 595px)`}
          // overflowY={'overlay'}
        >
          {bapsOfUser?.map(bap => {
            return <BapCard key={bap.id} bap={bap} />;
          })}
        </Flex>
      ) : (
        <Flex alignItems={'center'} justifyContent={'center'} mt={'50px'}>
          <Text fontSize={'18px'}>The user is not a member of any bap</Text>
        </Flex>
      )}
    </Box>
  );
};

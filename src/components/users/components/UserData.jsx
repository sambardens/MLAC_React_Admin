import { Box, Flex, Image, Text, Tooltip } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import PayPalIcon from '@/assets/icons/base/payPalSmall.svg';

import { currentSelectors } from '../../../../store/current';
import { poppins_400_16_24 } from '@/styles/fontStyles';
import { getImageSrc } from '@/utils/getImageSrc';

export const UserData = ({ dataOfUser }) => {
  console.log(dataOfUser, 'dataOfUser');

  const userProfile = [
    {
      title: 'First Name',
      currentUserInfo: dataOfUser?.firstName,
    },
    { title: 'Last Name', currentUserInfo: dataOfUser?.lastName },
    {
      title: 'Email',
      currentUserInfo: dataOfUser?.email || 'Not specified',
    },
    {
      title: 'Address',
      currentUserInfo: dataOfUser?.address || 'Not specified',
    },
    {
      title: 'Mobile phone',
      currentUserInfo: dataOfUser?.phone || 'Not specified',
    },
    {
      title: 'Connect Paypal',
      currentUserInfo:
        dataOfUser?.paymentEmail === 'null' || !dataOfUser?.paymentEmail
          ? 'Not specified'
          : dataOfUser?.paymentEmail,
    },
    {
      title: 'Profit from this user',
      currentUserInfo: `£${dataOfUser?.incomeFees}`,
    },
    {
      title: 'Total number of requests for AudD api',
      currentUserInfo: dataOfUser?.totalAuddRequests
        ? `${dataOfUser?.totalAuddRequests}`
        : 'Not specified',
    },
    {
      title: 'Total invites',
      currentUserInfo: dataOfUser?.totalInvites
        ? `${dataOfUser?.totalInvites}`
        : 'Not specified',
    },
    {
      title: 'Total weight tracks',
      currentUserInfo: dataOfUser?.totalWeightTracks
        ? `${dataOfUser?.totalWeightTracks} mb`
        : 'Not specified',
    },
  ];

  return (
    <Flex w={'100%'} mt={'24px'} gap={'80px'}>
      <Image
        src={getImageSrc(dataOfUser?.avatar)}
        borderRadius={'14px'}
        w={'120px'}
        h={'120px'}
        alt={'User image'}
      />
      <Flex w={'100%'} gap={'24px'} flexDir={'column'}>
        {userProfile?.map(item => {
          return (
            <Flex align={'center'} key={item?.title}>
              <Flex w={'200px'} gap={'8px'}>
                <Text sx={poppins_400_16_24} color={'txtColor.black'}>
                  {item?.title}
                </Text>
                {item?.title === 'Connect Paypal' && <PayPalIcon />}
              </Flex>

              <Tooltip
                hasArrow
                label={
                  item?.currentUserInfo?.length > 25 && item?.currentUserInfo
                }
                placement="auto"
                bg="bg.black"
                color="textColor.white"
                fontSize="16px"
                borderRadius={'5px'}
              >
                <Text
                  sx={poppins_400_16_24}
                  color={'brand.200'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  whiteSpace="nowrap"
                  maxWidth={'500px'}
                >
                  {item?.currentUserInfo}
                </Text>
              </Tooltip>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

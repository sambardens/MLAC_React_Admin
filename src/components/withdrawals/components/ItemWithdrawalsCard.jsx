import { CheckIcon, CopyIcon, NotAllowedIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useUpdateWithdrawalsApproveMutation } from '../../../../store/withdrawals/withdrawals.api';
import CustomButton from '@/components/UI/buttons/CustomButton';
import { Toast } from '@/components/UI/tost/Toast';
import DeleteModal from '@/components/modals/DeleteModal';
import { poppins_400_14_21, poppins_500_18_27 } from '@/styles/fontStyles';
import { formatDate } from '@/utils/formatDate';

export const ItemWithdrawalsCard = ({ itemData }) => {
  const { onCopy, hasCopied } = useClipboard(itemData?.paymentEmail);
  const [updateApprove, resultApprove] = useUpdateWithdrawalsApproveMutation();
  const [isOpenApprovedModal, setIsOpenApprovedModal] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      Toast({
        status: 'success',
        message: 'Payment email copied',
      });
    }
  }, [hasCopied]);

  const handleApprove = async () => {
    const options = {
      withdrawalId: itemData?.id,
      isApproved: itemData?.isApproved ? false : true,
    };

    const res = await updateApprove(options);
    if (res) {
      const message = 'Status changed';
      Toast({
        status: 'success',
        message: message,
      });
    }
    setIsOpenApprovedModal(false);
  };

  return (
    <Box position={'relative'}>
      {isOpenApprovedModal && (
        <DeleteModal
          closeModal={() => {
            setIsOpenApprovedModal(false);
          }}
          deleteHandler={handleApprove}
          title={'Confirm payment'}
          text={'Are you sure you want to confirm payment?'}
          isWithdrawalsComponent={true}
          isLoadingDelete={resultApprove?.isLoading}
        />
      )}{' '}
      <Grid
        templateColumns="0.2fr 1.5fr 1.5fr 0.4fr 0.7fr 0.4fr"
        gap="12px"
        alignItems="center"
        p="12px"
        h="60px"
        w={'100%'}
        bgColor={'main.mainGray'}
        borderRadius="10px"
        position={'relative'}
      >
        <Flex alignItems={'center'} justify={'center'}>
          <Tooltip
            hasArrow
            label={!itemData?.isApproved ? 'Not approved' : 'Approved'}
            placement="top"
            bg="bg.black"
            color="textColor.white"
            fontSize="16px"
            borderRadius={'5px'}
          >
            {itemData?.isApproved ? (
              <CheckIcon boxSize={'18px'} color={'brand.500'} />
            ) : (
              <NotAllowedIcon boxSize={'18px'} color={'brand.500'} />
            )}
          </Tooltip>
        </Flex>
        <Tooltip
          hasArrow
          label={
            itemData.firstName.length + itemData.lastName.length > 30
              ? `${itemData.firstName} ${itemData.lastName}`
              : ''
          }
          placement="auto"
          bg="bg.black"
          color="textColor.white"
          fontSize="16px"
          borderRadius={'5px'}
        >
          <Text
            sx={poppins_500_18_27}
            align="start"
            color="main.black"
            overflow={'hidden'}
            textOverflow={'ellipsis'}
            whiteSpace="nowrap"
            maxWidth={'400px'}
          >
            {itemData.firstName} {itemData.lastName}
          </Text>
        </Tooltip>

        <Flex
          align={'center'}
          justify={'start'}
          onClick={onCopy}
          cursor={'pointer'}
        >
          <CopyIcon mr={'10px'} />
          <Tooltip
            hasArrow
            label={
              itemData?.paymentEmail?.length > 26 && itemData?.paymentEmail
            }
            placement="auto"
            bg="bg.black"
            color="textColor.white"
            fontSize="16px"
            borderRadius={'5px'}
          >
            <Text
              fontWeight="400"
              color="brand.500"
              overflow={'hidden'}
              textOverflow={'ellipsis'}
              whiteSpace="nowrap"
              maxWidth={'250px'}
            >
              {itemData?.paymentEmail}
            </Text>
          </Tooltip>
        </Flex>

        <Text
          align="start"
          color="main.textGray"
          sx={poppins_400_14_21}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace="nowrap"
          maxWidth={'400px'}
        >
          {formatDate(itemData?.createdAt)}
        </Text>

        <Text
          align="start"
          color="main.textGray"
          sx={poppins_400_14_21}
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace="nowrap"
          maxWidth={'400px'}
        >
          {itemData?.amount}
        </Text>

        <Box>
          {!itemData?.isApproved ? (
            <CustomButton
              w={'100px'}
              h={'30px'}
              onClickHandler={() => setIsOpenApprovedModal(true)}
              isSubmiting={resultApprove?.isLoading}
            >
              Approve
            </CustomButton>
          ) : (
            <Box w={'100px'} h={'30px'}></Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

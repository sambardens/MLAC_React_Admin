import {
  Box,
  Grid,
  IconButton,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';
import getFormattedDate from 'src/utils/getFormattedDate';

import UploadIcon from '@/assets/icons/base/upload-small.svg';

import { useLazyGetTransactionDetailsQuery } from '../../../../store/transactions/transactions.api';
import PaymentModal from '@/components/modals/PaymentModal';

const IncomeItem = ({ transaction }) => {
  const [isOpenPaymentModal, setIsOpenPaymentModal] = useState(false);
  const [getTransactionDetails, resultGet] =
    useLazyGetTransactionDetailsQuery();
  const date = getFormattedDate(transaction.createdAt);

  const downloadHandler = () => {};

  const getUniqueReleaseNames = () => {
    const uniqueReleaseNames = [];
    transaction.tracks.forEach(track => {
      const releaseName = track?.releaseName?.trim();

      if (!uniqueReleaseNames.includes(releaseName)) {
        uniqueReleaseNames.push(releaseName);
      }
    });
    return uniqueReleaseNames;
  };

  const handleDownload = async id => {
    const { data } = await getTransactionDetails(id);
    if (data?.success) {
      setIsOpenPaymentModal(true);
    }
  };

  return (
    <Grid
      templateColumns="150px 1fr 1fr 1fr 50px 50px 50px 50px 50px"
      gap="24px"
      alignItems="center"
      px="12px"
      h="56px"
      bgColor="bg.main"
      borderRadius="10px"
    >
      {isOpenPaymentModal && (
        <PaymentModal
          closeModal={() => {
            setIsOpenPaymentModal(false);
          }}
          downloadHandler={downloadHandler}
        />
      )}
      <Text
        fontWeight="400"
        color="main.textGray"
        align="center"
        fontSize="14px"
      >
        {date}
      </Text>
      <Tooltip
        hasArrow
        label={transaction?.bapName?.length > 18 && transaction?.bapName}
        placement="auto"
        bg="bg.black"
        color="textColor.white"
        fontSize="16px"
        borderRadius={'5px'}
      >
        <Text
          fontWeight="400"
          align="center"
          color={!transaction?.bapName ? 'brand.500' : 'black'}
          fontSize="14px"
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace="nowrap"
          maxWidth={'400px'}
        >
          {transaction?.bapName || 'Not specified'}
        </Text>
      </Tooltip>

      <Tooltip
        hasArrow
        label={
          getUniqueReleaseNames()?.length !== 0 && (
            <Box minW={'150px'}>
              <Text textAlign={'center'}>Names of releases:</Text>
              <UnorderedList pr={'8px'} pb={'5px'} pl={'10px'}>
                {getUniqueReleaseNames()?.map(item => {
                  return (
                    <ListItem key={item}>
                      <Text>{item}</Text>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Box>
          )
        }
        placement="right"
        bg="bg.black"
        color="textColor.white"
        fontSize="16px"
        borderRadius={'5px'}
      >
        <Text
          fontWeight="400"
          align="center"
          color="black"
          fontSize="14px"
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace="nowrap"
          maxWidth={'400px'}
        >
          {getUniqueReleaseNames()?.length}
        </Text>
      </Tooltip>

      <Tooltip
        hasArrow
        label={
          transaction?.tracks?.length !== 0 && (
            <Box minW={'150px'}>
              <Text textAlign={'center'}>Names of tracks:</Text>
              <UnorderedList pr={'8px'} pb={'5px'} pl={'10px'}>
                {transaction?.tracks?.map(item => {
                  return (
                    <ListItem key={item?.uniqueName}>
                      <Text>{item?.name}</Text>
                    </ListItem>
                  );
                })}
              </UnorderedList>
            </Box>
          )
        }
        placement="auto"
        bg="bg.black"
        color="textColor.white"
        fontSize="16px"
        borderRadius={'5px'}
      >
        <Text
          fontWeight="400"
          align="center"
          color="black"
          fontSize="14px"
          overflow={'hidden'}
          textOverflow={'ellipsis'}
          whiteSpace="nowrap"
          maxWidth={'400px'}
        >
          {transaction?.tracks?.length}
        </Text>
      </Tooltip>

      <Text
        fontWeight="400"
        color="main.textGray"
        align="center"
        fontSize="14px"
      >
        £{transaction?.gross}
      </Text>
      <Text
        fontWeight="400"
        color="main.textGray"
        align="center"
        fontSize="14px"
      >
        £{transaction?.fees || 0}
      </Text>
      <Text
        fontWeight="400"
        color="main.textGray"
        align="center"
        fontSize="14px"
      >
        £{transaction?.net || 0}
      </Text>
      <Text
        fontWeight="400"
        color="main.textGray"
        align="center"
        fontSize="14px"
      >
        £{transaction?.tips || 0}
      </Text>
      <IconButton
        icon={<UploadIcon />}
        boxSize="24px"
        onClick={() => {
          handleDownload(transaction.id);
          // setIsOpenPaymentModal(true);
        }}
        variant={'unstyled'}
        color="main.lightGray"
        _hover={{ color: 'brand.500' }}
        transition="0.3s linear"
      />
    </Grid>
    // {showDetails && (
    //   <IncomeDetails
    //     transaction={transactionDetails}
    //     closeModal={() => {
    //       setShowDetails(false);
    //     }}
    //   />
    // )}
  );
};

export default IncomeItem;

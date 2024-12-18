import { Icon } from '@chakra-ui/icons';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import UploadIcon from '@/assets/icons/base/upload-small.svg';

import { TransactionDetail } from '../../../store/transactions/transactions.selectors';
import CustomButton from '../UI/buttons/CustomButton';
import IncomeDetailsPdf from '../transactions/components/IncomeDetailsPdf';
import CustomModal from './CustomModal';
import { formatDate } from '@/utils/formatDate';

const PaymentModal = ({ closeModal, downloadHandler }) => {
  const transaction = TransactionDetail();

  const removeTrailingZeros = numberStr => {
    const [integerPart, decimalPart] = numberStr.split('.');
    if (!decimalPart || /^0+$/.test(decimalPart)) {
      return integerPart;
    }
    const trimmedDecimalPart = decimalPart.replace(/0+$/, '');
    if (trimmedDecimalPart.length > 0) {
      return `${integerPart}.${trimmedDecimalPart}`;
    }
    return integerPart;
  };

  const fees = Math.round(parseFloat(transaction.fees) * 100) / 100;

  // const fees = transaction.fees / 100 + '%';

  // const convertToPercentage = number => {
  //   if (number >= 1) {
  //     return number / 100 + '%';
  //   } else {
  //     return number * 100 + '%';
  //   }
  // };
  return (
    <CustomModal
      closeModal={closeModal}
      maxW="930px"
      maxH="800px"
      h="80vh"
      w="80vw"
      p="40px 0 40px 40px"
    >
      <Box maxH="720px" overflowY="scroll" pr="34px" h="calc(80vh - 80px)">
        <Flex align="center" justify="space-between" mb="24px">
          <Heading as="h3" lineHeight="1.5" fontWeight="600" fontSize="32px">
            Receipt of payment on Major Labl
          </Heading>
          <CustomButton w="200px">
            <Icon as={UploadIcon} mr="8px" boxSize="24px" />
            <PDFDownloadLink
              document={
                <IncomeDetailsPdf
                  transaction={transaction}
                  getUserTotalIncome={downloadHandler}
                  removeTrailingZeros={removeTrailingZeros}
                  fees={fees}
                />
              }
              fileName="transaction.pdf"
            >
              {({ blob, url, loading, error }) =>
                error ? 'Error to convert pdf' : 'Download pdf'
              }
            </PDFDownloadLink>
          </CustomButton>
        </Flex>
        <Box mb="24px">
          <Flex gap="16px" flexDir="column" mb="16px">
            <Field
              title="Invoice  ID"
              text={transaction.invoiceId || 'invoice ID is empty'}
            />
            <Field title="Payment sent by" text={transaction.paymentEmail} />
            <Field
              title="Payment sent to"
              text={transaction.bapName}
              line={true}
            />
            <Field title="Date" text={formatDate(transaction.date)} />
            <Field
              title="Amount"
              text={`£${removeTrailingZeros(transaction?.gross)}`}
            />
            {/* <Field title='Payment method' text='Visa' /> */}
            <Field title="Major Labl fee" text={'£' + fees} line={true} />
          </Flex>
        </Box>
        <Box mb="24px">
          <Flex flexDir="column" gap="4px" as="ul">
            {transaction?.tracks?.map(track => (
              <Box
                key={track?.id}
                borderBottom="1px solid"
                borderColor="stroke"
                mb="12px"
              >
                <IncomeDetailsTrackTableTitle />
                <IncomeDetailsTrackItem
                  track={track}
                  removeTrailingZeros={removeTrailingZeros}
                />
                <IncomeDetailsUserTableTitle />
                {track?.splitUsers?.map(user => (
                  <IncomeDetailsUserItem user={user} key={user.userId} />
                ))}
              </Box>
            ))}
          </Flex>
        </Box>
        {/* <Text align="end" fontWeight="600" color="black" fontSize="18px">
          Your payment: £{getUserTotalIncome()}
        </Text> */}
      </Box>
    </CustomModal>
  );
};

export default PaymentModal;

function IncomeDetailsUserTableTitle() {
  return (
    <Grid
      templateColumns=" 1fr 1fr 150px"
      gap="24px"
      alignItems="center"
      bg="transparent"
      px="12px"
      mb="4px"
    >
      <Text fontWeight="500" color="black" fontSize="18px">
        Writer name
      </Text>
      <Text fontWeight="500" color="black" fontSize="18px">
        Email
      </Text>
      <Text fontWeight="500" color="black" fontSize="18px">
        Ownership
      </Text>
    </Grid>
  );
}

function IncomeDetailsTrackTableTitle() {
  return (
    <Grid
      templateColumns=" 1fr 1fr 150px"
      gap="24px"
      alignItems="center"
      bg="transparent"
      px="12px"
      mb="4px"
    >
      <Text fontWeight="500" color="black" fontSize="18px">
        Track name
      </Text>
      <Text fontWeight="500" color="black" fontSize="18px">
        Release
      </Text>
      <Text fontWeight="500" color="black" fontSize="18px">
        Track price
      </Text>
    </Grid>
  );
}

function IncomeDetailsTrackItem({ track, removeTrailingZeros }) {
  return (
    <Grid
      as="li"
      templateColumns=" 1fr 1fr 150px"
      gap="24px"
      alignItems="center"
      px="12px"
      bgColor={'bg.light'}
      borderRadius="10px"
      height="56px"
      mb="4px"
    >
      <Text
        fontWeight="400"
        color="secondary"
        fontSize="16px"
        isTruncated={true}
      >
        {track.trackName}
      </Text>

      <Text
        fontWeight="400"
        color="secondary"
        fontSize="16px"
        isTruncated={true}
      >
        {track?.releaseName}
      </Text>

      <Text fontWeight="400" color="secondary" fontSize="16px">
        £{removeTrailingZeros(track?.price)}
      </Text>
    </Grid>
  );
}

function IncomeDetailsUserItem({ user }) {
  return (
    <Grid
      as="li"
      templateColumns=" 1fr 1fr 150px"
      gap="24px"
      alignItems="center"
      px="12px"
      bgColor={'bg.light'}
      borderRadius="10px"
      height="56px"
    >
      <Text
        fontWeight="400"
        color="secondary"
        fontSize="16px"
        isTruncated={true}
      >
        {user?.firstName || 'Anonymous'} {user?.lastName || ''}
      </Text>

      <Text
        fontWeight="400"
        color="secondary"
        fontSize="16px"
        isTruncated={true}
      >
        {user?.email}
      </Text>

      <Text fontWeight="400" color="secondary" fontSize="16px">
        {user?.ownership}%
      </Text>
    </Grid>
  );
}

function Field({ title, text, line = false }) {
  return (
    <Flex
      align="center"
      sx={{
        pb: line ? '16px' : '0',
        borderBottom: line ? '1px solid' : 'none',
        borderColor: 'stroke',
      }}
    >
      <Text w="200px" fontWeight="400" fontSize="18px" color="black" mr="24px">
        {title}
      </Text>
      <Text fontWeight="400" fontSize="16px" color="secondary">
        {text}
      </Text>
    </Flex>
  );
}

import { Grid, Text } from '@chakra-ui/react';

const TableTitle = () => {
  return (
    <Grid
      templateColumns="150px 1fr 1fr 1fr 50px 50px 50px 50px 50px"
      gap="24px"
      alignItems="center"
      bg="transparent"
      px="12px"
    >
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Payment date
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Band/Artist
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Release
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Track
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Gross
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Fees
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Net
      </Text>
      <Text fontWeight="300" color="black" fontSize="14px" align="center">
        Tips
      </Text>
      {/* <Text fontWeight='300' color='black' fontSize='14px'>
				Download
			</Text> */}
    </Grid>
  );
};

export default TableTitle;

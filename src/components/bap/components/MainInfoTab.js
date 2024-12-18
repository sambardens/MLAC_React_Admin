import { useRouter } from 'next/router';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { useGetGenresOfBapQuery } from '../../../../store/bap/bap.api';
import {
  poppins_400_14_21,
  poppins_400_16_24,
  poppins_500_18_27,
  poppins_600_18_27,
  poppins_600_32_48,
} from '@/styles/fontStyles';
import { getImageSrc } from '@/utils/getImageSrc';

export const MainInfoTab = ({ dataInfo, isLoadingInfo }) => {
  const { query } = useRouter();
  const { data: dataOfGenres, isLoading: isLoadingGenres } =
    useGetGenresOfBapQuery(query?.bapId, {
      skip: !query?.bapId,
    });
  const bapInfo = dataInfo || {};
  const genres = dataOfGenres?.genresBap || [];
  const namesOfSubGenres = genres?.sub_genres?.map(item => item.name);

  return (
    <Box>
      <Grid
        templateColumns={'minmax(100px, 1.03fr)  minmax(150px, 1fr)'}
        gap={'24px'}
      >
        <GridItem w="100%">
          <Text as={'h1'} color="textColor.black" sx={poppins_600_32_48}>
            {bapInfo.name}
          </Text>

          <Text color="textColor.black" sx={poppins_400_16_24} mt="8px">
            {bapInfo.description
              ? bapInfo.description.trim()
              : 'Description not added'}
          </Text>

          <Text
            as="h2"
            color="textColor.black"
            sx={poppins_600_18_27}
            mt={'32px'}
          >
            Artist biography
          </Text>

          <Text color="textColor.black" sx={poppins_400_16_24} mt="8px">
            {bapInfo.artistBio
              ? bapInfo.artistBio.trim()
              : 'No artist biography yet'}
          </Text>
        </GridItem>
        <GridItem w="100%">
          <Image
            src={getImageSrc(bapInfo?.avatar)}
            alt={'img'}
            width={'calc(100% - 50px + 50px)'}
            borderRadius={'10px'}
            objectFit={'cover'}
            transition="width 0.3s ease-out"
          />
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={'16px'}
          >
            <Text color={'textColor.black'} sx={poppins_500_18_27}>
              Genre
            </Text>
            <Text color={'textColor.red'} sx={poppins_500_18_27}>
              {genres?.mainGenre ? genres?.mainGenre : 'Not specified'}
            </Text>
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'space-between'}
            mt={'16px'}
          >
            <Text color={'textColor.black'} sx={poppins_500_18_27}>
              Secondary genre
            </Text>
            <Text color={'textColor.red'} sx={poppins_500_18_27}>
              {genres?.secondGeneres?.name
                ? genres?.secondGeneres?.name
                : 'Not specified'}
            </Text>
          </Flex>
          <Flex justifyContent={'space-between'} mt={'16px'}>
            <Text color={'textColor.black'} sx={poppins_400_14_21}>
              Subgenres
            </Text>

            {genres?.sub_genres?.length !== 0 ? (
              <Text
                color={'textColor.red'}
                sx={poppins_400_14_21}
                align="end"
                ml="16px"
              >
                {namesOfSubGenres?.join(', ')}
              </Text>
            ) : (
              <Text color={'textColor.red'} sx={poppins_400_14_21}>
                Not specified
              </Text>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

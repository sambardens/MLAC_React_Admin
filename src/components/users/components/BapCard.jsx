import { useRouter } from 'next/navigation';

import { Box, Flex, Text, Tooltip, useToast } from '@chakra-ui/react';

import { getImageSrc } from '@/utils/getImageSrc';

const BapCard = ({ bap, w = '247px', h = '200px' }) => {
  const router = useRouter();

  return (
    <Flex
      as="li"
      w={w}
      h={h}
      borderRadius="10px"
      bg="brand.500"
      pos="relative"
      bgImage={`url(${getImageSrc(bap?.avatar)})`}
      bgSize="100% 100%"
      bgPosition="center"
      onClick={() => {
        router?.push(`/bap/${bap?.id}`);
      }}
      borderColor="transparent"
      _hover={{ boxShadow: '0px 2px 4px 2px rgba(0, 0, 0, 0.2)' }}
      cursor="pointer"
      overflow="hidden"
      alignItems="flex-end"
    >
      <Box bgColor="main.grayRgba" p="12px" w="100%">
        <Tooltip
          isDisabled={bap?.title?.length < 24}
          label={bap?.title}
          hasArrow
          bg="brand.200"
          borderRadius="10px"
          fontWeight="500"
          fontSize="14px"
        >
          <Text
            fontWeight="500"
            fontSize="16px"
            color="main.white"
            mb="8px"
            isTruncated={true}
          >
            {bap?.name}
          </Text>
        </Tooltip>
        <Tooltip
          isDisabled={bap?.band?.length < 24}
          label={bap?.role || ''}
          hasArrow
          bg="brand.200"
          borderRadius="10px"
          fontWeight="500"
          fontSize="14px"
        >
          <Text fontWeight="400" fontSize="14px" color="main.white">
            {bap?.role || 'Role not specified'}
          </Text>
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default BapCard;

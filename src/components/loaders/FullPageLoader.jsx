import Image from 'next/image';

import { Box } from '@chakra-ui/react';
import { MutatingDots } from 'react-loader-spinner';

export default function FullPageLoader({
  color = '#db2754',
  position = 'fixed',
  left = '50%',
  top = '50%',
}) {
  return (
    <Box
      position={position}
      top={top}
      left={left}
      transform="translate(-50%, -50%)"
      zIndex="100"
    >
      {/* <MutatingDots
      height={'150'}
      width={'150'}
      color={color}
      secondaryColor={color}
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /> */}
      <Image height={'150'} width={'150'} alt={'loader'} src={'/loading.gif'} />
    </Box>
  );
}

import Image from 'next/image';
import { Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

const Logo = () => {
  return (
    <Flex justifyContent='center' mb='60px'>
      <Link as={NextLink} href='/'>
        <Image
          src='/assets/images/logo.jpg'
          alt='logo Major Labl'
          width={155}
          height={133}
        />
      </Link>
    </Flex>
  );
};

export default Logo;

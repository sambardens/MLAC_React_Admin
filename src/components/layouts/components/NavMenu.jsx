import { useRouter } from 'next/router';

// import StrokeUnderline from '@/components/Underlines/StrokeUnderline';
import { Divider, Flex, Image, Menu, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BapIcon from '@/assets/icons/navMenu/bap-info.svg';
import IncomeIcon from '@/assets/icons/navMenu/income.svg';
import ReleasesIcon from '@/assets/icons/navMenu/releases.svg';
import TransactionsIcon from '@/assets/icons/navMenu/transaction.svg';
import UsersIcon from '@/assets/icons/navMenu/users.svg';

import NavMenuItem from './NavMenuItem';

const NavMenu = ({ setIsStartPage }) => {
  const [isBapInfoAvailable, setIsBapInfoAvailable] = useState(true);
  const [isReleasesAvailable, setIsReleasesAvailable] = useState(true);
  const [isTransactionsAvailable, setIsTransactionsAvailable] = useState(true);
  const [isUsersAvailable, setIsUsersAvailable] = useState(true);
  const [isWithdrawalsAvailable, setIsWithdrawalsAvailable] = useState(true);
  const router = useRouter();

  const items = [
    {
      menuName: '/bap',
      isAvailable: isBapInfoAvailable,
      title: 'B.A.P',
      icon: BapIcon,
    },
    {
      menuName: '/releases',
      isAvailable: isReleasesAvailable,
      title: 'Releases',
      icon: ReleasesIcon,
    },
    {
      menuName: '/transactions',
      isAvailable: isTransactionsAvailable,
      title: 'Transactions',
      icon: TransactionsIcon,
    },
    {
      menuName: '/withdrawals',
      isAvailable: isWithdrawalsAvailable,
      title: 'Withdrawals',
      icon: IncomeIcon,
    },
    {
      menuName: '/users',
      isAvailable: isUsersAvailable,
      title: 'Users',
      icon: UsersIcon,
    },
  ];

  return (
    <Flex flexDir={'column'} w="320px" h="100vh" p="24px">
      <Image
        src="/assets/images/logo.jpg"
        w="60px"
        h="51px"
        alt="Major Labl logo"
      />

      <Text
        mt="30.5px"
        p="0px 8px"
        fontSize={'18px'}
        fontWeight={'600'}
        color={'main.black'}
      >
        Admin
      </Text>

      <Divider color={'main.lightGray'} mt={'8px'} />

      <Flex as="ul" flexDir="column" mt="16px">
        {items.map(({ menuName, isAvailable, title, icon }) => (
          <NavMenuItem
            key={title}
            menuName={menuName}
            isAvailable={isAvailable}
            title={title}
            icon={icon}
            setIsStartPage={setIsStartPage}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default NavMenu;

import { useRouter } from 'next/router';

import { Box } from '@chakra-ui/react';

import { useGetUsersBuIdQuery } from '../../../store/users/users.api';
import { ItemUserHeader } from './components/ItemUserHeader';
import { MemberOfBap } from './components/MemberOfBap';
import { UserData } from './components/UserData';

export const ItemUser = () => {
  const { query } = useRouter();
  const { data, isLoading } = useGetUsersBuIdQuery(query.userId, {
    skip: !query.userId,
  });

  const dataOfUser = data?.user || [];
  console.log(dataOfUser, 'dataOfUser');

  return (
    <Box
      p={'24px'}
      bg={'bg.main'}
      borderRadius={'10px'}
      position="relative"
      h={'100%'}
      //   overflowY={scroll}
      //   gap={'24px'}
    >
      <ItemUserHeader
        firstName={dataOfUser?.firstName}
        lastName={dataOfUser?.LastName}
        accountStatus={dataOfUser?.accountStatus}
        tokenData={dataOfUser?.token}
        id={dataOfUser?.id}
      />
      <UserData dataOfUser={dataOfUser} />
      <MemberOfBap bapsOfUser={dataOfUser?.baps} />
    </Box>
  );
};

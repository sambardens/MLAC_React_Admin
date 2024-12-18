import { MainLayout } from '@/components/layouts/MainLayout';
import { Users } from '@/components/users/Users';

const UsersPage = () => {
  return (
    <MainLayout title={'Users'}>
      <Users />
    </MainLayout>
  );
};

export default UsersPage;

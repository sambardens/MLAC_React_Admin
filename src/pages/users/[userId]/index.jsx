import { MainLayout } from '@/components/layouts/MainLayout';
import { ItemUser } from '@/components/users/ItemUser';

const ItemUserPage = () => {
  return (
    <MainLayout title={'Current user'} back={true}>
      <ItemUser />
    </MainLayout>
  );
};

export default ItemUserPage;

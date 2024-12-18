import { ItemBap } from '@/components/bap/ItemBap';
import { MainLayout } from '@/components/layouts/MainLayout';

const CurrentBap = () => {
  return (
    <MainLayout back={true}>
      <ItemBap />
    </MainLayout>
  );
};

export default CurrentBap;

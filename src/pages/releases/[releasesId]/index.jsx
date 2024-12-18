import { ItemRelease } from '@/components/Releases/ItemRelease';
import { MainLayout } from '@/components/layouts/MainLayout';

const ReleaseItemPage = () => {
  return (
    <MainLayout back={true}>
      <ItemRelease />
    </MainLayout>
  );
};

export default ReleaseItemPage;

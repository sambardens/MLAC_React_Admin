import { Releases } from '@/components/Releases/Releases';
import { MainLayout } from '@/components/layouts/MainLayout';

const ReleasesPage = () => {
  return (
    <MainLayout title={'Releases'}>
      <Releases />
    </MainLayout>
  );
};

export default ReleasesPage;

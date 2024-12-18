import { MainLayout } from '@/components/layouts/MainLayout';
import { Withdrawals } from '@/components/withdrawals/Withdrawals';

const WithdrawalsPage = () => {
  return (
    <MainLayout title={'Withdrawals'}>
      <Withdrawals />
    </MainLayout>
  );
};

export default WithdrawalsPage;

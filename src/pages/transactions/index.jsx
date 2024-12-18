import { MainLayout } from '@/components/layouts/MainLayout';
import Transactions from '@/components/transactions/Transactions';

const TransactionsPage = () => {
  return (
    <MainLayout title={'Transactions'}>
      <Transactions />
    </MainLayout>
  );
};

export default TransactionsPage;

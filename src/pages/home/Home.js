import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Home.module.css';

// components
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection({
    collectionName: 'transactions',
    _query: ['uid', '==', user.uid],
    _orderBy: ['createdAt', 'desc'],
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Transaction History</h2>
        {error && <p className={styles.error}>{error}</p>}
        {documents && <TransactionList transactions={documents}/>}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
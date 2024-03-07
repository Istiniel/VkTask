import { Outlet, useNavigation } from 'react-router-dom';

import Wrapper from '../../shared/ui/Wrapper';
import Header from '../../widgets/Header';
import styles from './SharedLayout.module.scss';

const SharedLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Header />
      {navigation.state === 'loading' && 'loading'}
      <main className={styles.main}>
        <Wrapper>
          <div className={styles.container}>
            <Outlet />
          </div>
        </Wrapper>
      </main>
    </>
  );
};

export default SharedLayout;

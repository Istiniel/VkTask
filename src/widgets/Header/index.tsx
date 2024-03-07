import Wrapper from '../../shared/ui/Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
          VK - тестовое задание
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;

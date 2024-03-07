import { SplitLayout, classNames } from '@vkontakte/vkui';
import { useCallback } from 'react';
import styles from './Main.module.scss';
import Button from '../../shared/ui/Button';
import { useAppDispatch } from '../../app/redux/hooks';
import { openModal } from '../../app/redux/features/MainSlice/MainSlice';
import { ModalsList } from '../../shared/types';

const Main = () => {
  const dispatch = useAppDispatch();

  const onOpenGetFactModal = useCallback(
    (modal: ModalsList | null) => {
      dispatch(openModal(modal));
    },
    [dispatch],
  );

  return (
    <section className={classNames(styles.section, styles.sectionPromo)}>
      <SplitLayout
        style={{
          flexDirection: 'column',
          maxWidth: '200px',
          gap: '15px',
        }}
      >
        <Button onClick={() => onOpenGetFactModal(ModalsList.FactCheck)}>получить факт</Button>
        <Button onClick={() => onOpenGetFactModal(ModalsList.FetchAgeByName)}>узнать возраст</Button>
      </SplitLayout>
    </section>
  );
};

export default Main;

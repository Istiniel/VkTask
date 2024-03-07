import * as React from 'react';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  ModalPage,
  ModalRoot,
  SplitLayout
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { openModal, selectActiveModal } from '../redux/features/MainSlice/MainSlice';
import { ModalsList } from '../../shared/types';
import { GetFactMenu } from '../../features/GetFactMenu';
import { GetAgeMenu } from '../../features/GetAgeMenu';

function VKUIProvider({ children }: { children?: React.ReactNode }) {
  const activeModal = useAppSelector(selectActiveModal)
  const dispatch = useAppDispatch()
  const onModalClose = () => {
    dispatch(openModal(null))
  }

  const modal = (
    <ModalRoot onClose={onModalClose} activeModal={activeModal}>
      <ModalPage id={String(ModalsList.FactCheck)} dynamicContentHeight>
        <GetFactMenu  />
      </ModalPage>
      <ModalPage id={String(ModalsList.FetchAgeByName)} dynamicContentHeight>
        <GetAgeMenu  />
      </ModalPage>
    </ModalRoot>
  );

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
            {children}
          <SplitLayout modal={modal} />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default VKUIProvider;

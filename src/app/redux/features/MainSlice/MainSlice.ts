import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { ModalsList } from '../../../../shared/types';

type MainSliceState = {
  activeModal: string | null
  status: 'loading' | 'idle' | 'error';
  error: string | undefined;
  isLimit: boolean;
};

const initialState: MainSliceState = {
  activeModal: null,
  status: 'idle',
  error: undefined,
  isLimit: false,
};

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalsList | null>) {
      const { payload: modal } = action
      state.activeModal = modal !== null ? String(action.payload) : null
    }
  },
});

export default mainSlice.reducer;
export const { openModal } = mainSlice.actions

export const selectLoadingStatus = (state: RootState) => state.mainSlice.status;
export const selectIsLimit = (state: RootState) => state.mainSlice.isLimit;
export const selectActiveModal = (state: RootState) => state.mainSlice.activeModal;

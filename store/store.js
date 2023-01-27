import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import modalSlice from './slices/modalSlice';
import rightDrawerSlice from './slices/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';
import { createWrapper } from 'next-redux-wrapper';

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice
};

// export default configureStore({
//   reducer: combinedReducer
// });

const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
    devTools: true
  });

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore["getState"]>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   AppState,
//   unknown,
//   Action
// >;

export const wrapper = createWrapper(makeStore);

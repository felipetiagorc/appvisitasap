import { configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import modalSlice from './slices/modalSlice';
import rightDrawerSlice from './slices/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice
};

export default configureStore({
  reducer: combinedReducer
});

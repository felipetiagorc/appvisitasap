import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerSlice from './slices/headerSlice';
import modalSlice from './slices/modalSlice';
import rightDrawerSlice from './slices/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

// https://www.youtube.com/watch?v=bpbLq6NxIm8

//antes
// const combinedReducer = ({
//   header: headerSlice,
//   rightDrawer: rightDrawerSlice,
//   modal: modalSlice,
//   lead: leadsSlice
// });

const combinedReducer = combineReducers({
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice
});

//antes do next-wraper
// export default configureStore({
//   reducer: combinedReducer
// });

// estado de entrada para esse master redux terá todos os valores prévios...

const materReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      // aqui passa o que esta vindo no payload
      // para cada slice ...
      headerSlice: {
        pageTitle: state.header.pageTitle,
        isOpen: state.header.isOpen,
        bodyType: state.header.bodyType,
        size: state.header.size,
        extraObject: state.header.extraObject
      },
      modalSlice: {
        title: state.modal.title
      }
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

const makeStore = () =>
  configureStore({
    reducer: materReducer,
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

export const wrapper = createWrapper(makeStore, { debug: true });

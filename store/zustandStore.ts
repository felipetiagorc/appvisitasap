import { create } from 'zustand';

type Store = {
  pageTitle: string;
};

type Actions = {
  setPageTitle: (title: string) => void;
};

export const useStore = create<Store & Actions>(set => ({
  pageTitle: 'Home',
  setPageTitle: () => set(state => ({ pageTitle: state.pageTitle }))
}));

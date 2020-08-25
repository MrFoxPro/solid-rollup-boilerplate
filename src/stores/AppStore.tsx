import { createState, createContext, useContext } from 'solid-js';

type AppStore = [{ isAuthorized: boolean }, { authorize: () => void }];
const initialState: AppStore = [
  { isAuthorized: false },
  {
    authorize: () => {},
  },
];
const AppContext = createContext(initialState);

type AppProviderProps = {
  children: JSX.Element[] | JSX.Element;
};
export function AppProvider(props: AppProviderProps) {
  const [state, setState] = createState(initialState[0]);
  const store: AppStore = [
    state,
    {
      authorize() {
        setState('isAuthorized', true);
        console.log('authorizing...');
        localStorage.setItem('authed', JSON.stringify(Date.now()));
      },
    },
  ];
  const stored = localStorage.getItem('authed') as string;
  if (stored) {
    const lastAuthed = JSON.parse(stored) as number;
    if (new Date(Date.now() - lastAuthed).getMinutes() > -1) {
      setState('isAuthorized', true);
      console.log(
        'You are already authed',
        new Date(Date.now() - lastAuthed).getMinutes(),
        'minutes ago'
      );
    }
  }
  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
}

export function useAppStore() {
  return useContext(AppContext);
}

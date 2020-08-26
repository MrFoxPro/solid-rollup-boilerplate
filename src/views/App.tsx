import '@/assets/styles/global.scss';
import '@/assets/styles/fonts.scss';
import AppRoutes from '@/router/AppRoutes';
import { AppProvider } from '@/stores/AppStore';
export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

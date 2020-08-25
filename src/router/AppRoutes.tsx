import { createEffect } from 'solid-js';
import { Provider, router, Router } from '../router';
import Landing from '@/views/Landing';
import Workspace from '@/views/Workspace';
import NotFound from '@/views/NotFound';
import { useAppStore } from '@/stores/AppStore';

export default function AppRoutes() {
  const [store] = useAppStore();
  createEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      if (!store.isAuthorized) {
        router.router5.navigate('landing');
      }
    });
  });
  return (
    <Provider>
      <Router>
        {{
          fallback: NotFound,
          landing: {
            render: Landing,
          },
          workspace: {
            render: Workspace,
          },
        }}
      </Router>
    </Provider>
  );
}

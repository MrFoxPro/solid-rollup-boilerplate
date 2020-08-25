import { router } from '@/router';
import s from './Landing.module.scss';
import { useAppStore } from '@/stores/AppStore';

let email = '';
let password = '';
export default function Landing() {
  const [, { authorize }] = useAppStore();
  return (
    <div>
      Here landing
      <button
        onClick={() => {
          authorize();
          router.router5.navigate('workspace');
        }}
      >
        Login
      </button>
      Email
      <input type="text" onInput={(e) => (email = e.currentTarget.value)} class={s.email} />
      Password
      <input type="text" onInput={(e) => (password = e.currentTarget.value)} class={s.password} />
    </div>
  );
}

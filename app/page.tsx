import { DEFAULT_PROTECTED_PATH } from '@/constants/path';
import { redirect } from 'next/navigation';

const Home = () => {
  return redirect(DEFAULT_PROTECTED_PATH);
};

export default Home;

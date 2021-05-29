import SignIn from './SignIn';
import { useUser } from './User';

export default function PleaseSignIn({ children }) {
  const user = useUser();
  if (!user) return <SignIn />;
  return children;
}

import PleaseSignIn from '../components/PleaseSignIn';
import { useUser } from '../components/User';

export default function AccountPage() {
  const user = useUser();

  if (!user)
    return (
      <PleaseSignIn>
        <p>Not User Logged In</p>
      </PleaseSignIn>
    );
  return (
    <div>
      <div className="user">Name: {user.name}</div>
      <div className="role">Role: {user.role.name}</div>
      <div className="email">Email: {user.email}</div>
    </div>
  );
}

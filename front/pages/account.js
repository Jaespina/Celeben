import { useUser } from '../components/User';

export default function AccountPage() {
  const user = useUser();
  return (
    <div>
      <div className="user">Username: {user.name}</div>
    </div>
  );
}

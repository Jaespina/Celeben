import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import { useRouter } from 'next/router';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut({ children }) {
  const router = useRouter();
  const [singout, { data, error, loading }] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit() {
    singout();
    router.push({
      pathname: '/',
    });
  }
  return (
    <button type="submit" onClick={handleSubmit}>
      Sign Out
    </button>
  );
}

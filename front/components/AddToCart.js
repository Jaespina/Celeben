import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productID: $id) {
      id
    }
  }
`;
export default function AddToCart({ id }) {
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  function handleClick() {
    addToCart();
    openCart();
  }
  return (
    <button disabled={loading} type="button" onClick={handleClick}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}

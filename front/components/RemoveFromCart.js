import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';

const BigButton = styled.button`
  font-size: 5rem;
  background: none;
  border: 0;
  &:hover {
    color: blue;
    cursor: pointer;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
    update,
  });
  return (
    <BigButton
      title="Remove this item from the cart"
      type="button"
      onClick={removeFromCart}
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

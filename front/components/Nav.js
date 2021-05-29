import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';
import SignOut from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

const GET_ROLE = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        role {
          id
          name
        }
      }
    }
  }
`;

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  const { data } = useQuery(GET_ROLE);
  const role = data?.authenticatedItem?.role.name;
  return (
    <NavStyles>
      <Link href="/products">Products </Link>
      {user && (
        <>
          {role === 'Admin' ? <Link href="/sell">Sells </Link> : ''}
          {role === 'Comercial' ? <Link href="/sell">Sells </Link> : ''}
          <Link href="/orders">Orders </Link>
          <Link href="/account">Account </Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart
            <CartCount
              count={user.cart.reduce(
                (accumulator, cartItem) => accumulator + cartItem.quantity,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}

import Link from 'next/link';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      item {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

export default function OrdersPage() {
  const { data, error, loading } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;
  return (
    <div>
      <h2>You have {allOrders.length} orders</h2>

      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link key={`order-${order.id}`} href={`/order/${order.id}`}>
              <a>
                <div className="images">
                  {order.item.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
                <div className="order-meta">
                  <p>
                    {order.item.reduce(
                      (tally, item) => tally + item.quantity,
                      0
                    )}{' '}
                    {order.item.reduce(
                      (tally, item) => tally + item.quantity,
                      0
                    ) > 1
                      ? `items`
                      : `item`}
                  </p>
                  <p>
                    {order.item.length}{' '}
                    {order.item.length > 1 ? 'products' : 'product'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}

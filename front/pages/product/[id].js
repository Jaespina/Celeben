import SingleProduct from '../../components/SingleProduct';

// eslint-disable-next-line react/prop-types
export default function SingleProductPage({ query }) {
  // eslint-disable-next-line react/prop-types
  return <SingleProduct id={query.id} />;
}

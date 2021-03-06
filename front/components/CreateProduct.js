import Router from 'next/router';
import gql from 'graphql-tag';
import DefaultErrorPage from 'next/error';
import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import { PAGINATION_QUERY } from './Pagination';
import { useUser } from './User';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # variables
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const user = useUser();

  if (user?.role.name !== ('Admin' || 'ContentEditor' || 'Comercial')) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Initial',
    price: 32000,
    description: 'Initial Description',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [
        { query: ALL_PRODUCTS_QUERY },
        { query: PAGINATION_QUERY },
      ],
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createProduct();
        clearForm();
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
          query: { new: 'new' },
        });
      }}
    >
      <p>Sell a Product</p>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <textarea
          htmlFor="description"
          type="text"
          id="description"
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={handleChange}
        />
        <button type="submit">+ Add Product</button>
        <button type="button" onClick={clearForm}>
          Clear Form
        </button>
        <button type="button" onClick={resetForm}>
          Reset Form
        </button>
      </fieldset>
    </Form>
  );
}

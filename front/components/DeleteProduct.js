import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
      price
    }
  }
`;

function update(cache, payload) {
  console.log(payload);
  console.log("Running update function after delete");
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { data, loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}

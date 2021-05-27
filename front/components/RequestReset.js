import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });
  const [signupc, { data, error, loading }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    await signupc().catch(console.error);
    console.log(error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <h2>Request a Password Reset</h2>
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email to change your password</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

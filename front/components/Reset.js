import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    token: "",
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const successFullerror = data?.redeemUserPasswordResetToken.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    console.log(error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error || successFullerror} />
      <h2>Reset your password</h2>
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in!</p>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}

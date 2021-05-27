import Form from "./styles/Form";
import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import ErrorMessage from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
  });
  const [signupc, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    await signupc().catch(console.error);
    console.log(error);
    resetForm();
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <h2>Sign Up for an Account</h2>
      <fieldset>
        {data?.createUser && (
          <p>Signed Up with {data?.createUser.email} Check your email!</p>
        )}
        <label htmlFor="name">
          Name
          <input
            type="name"
            name="name"
            placeholder="Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
}

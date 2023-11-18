import styled from 'styled-components';
import Wrapper from '../ui/wrapper';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Form = styled.form`
  width: 50%;
  background-color: #bdbde0;
  border-radius: 10px;
  padding: 5px;
  color: #000;
  font-weight: bold;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.8);
  padding: 3rem 0;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const FormField = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Input = styled.input`
  font-weight: normal;
  width: 70%;
  border: 2px solid #000;
  border-radius: 5px;
  transition: 0.2s all;
  padding: 0.5rem 1rem;

  &:focus {
    outline: none;
    transform: scaleX(1.1);
  }

  &:placeholder-shown {
    font-style: italic;
  }
`;

const Button = styled.button`
  margin: 0 auto;
  border-radius: 2rem;
  font-weight: bold;
  background-color: var(--color-main-bg);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    background-color: green;
  }

  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.8);
    transform: scale(1.1) translateY(-2px);
  }
`;

const Error = styled.p`
  color: red;
  text-align: center;
`;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [error, setError] = useState('');
  const { auth } = useLogin();

  const inputHandler = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setFormData({ ...formData, [input.id]: input.value });
    setError('');
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.pass) {
      setError('Invalid credentials');
      return;
    }
    if (!formData.email.includes('@gmail.com')) {
      setError('Invalid email');
      return;
    }
    auth(formData, {
      onError: () => {
        setFormData({email: '', pass: ''});
        setError('Invalid credentials');
      }
    });
  };
  return (
    <Wrapper>
      <Form onSubmit={formHandler}>
        <Title>Login</Title>
        <FormField>
          <label htmlFor="email">Email:</label>
          <Input
            type="text"
            value={formData.email}
            id="email"
            placeholder="example@gmail.com"
            onChange={inputHandler}
          />
        </FormField>
        <FormField>
          <label htmlFor="pass">Password:</label>
          <Input
            type="password"
            id="pass"
            value={formData.pass}
            onChange={inputHandler}
          />
        </FormField>
        <FormField>
          <Button>Login</Button>
        </FormField>
        {error && <Error>{error}</Error>}
      </Form>
    </Wrapper>
  );
}

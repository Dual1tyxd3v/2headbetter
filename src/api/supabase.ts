import supabase from '../services/supabase';
import { LoginForm } from '../types';

export const getUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error('Cant get user');

  return data.user;
};

export const login = async ({ email, pass }: LoginForm) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) throw new Error(error.message);

  return data;
};

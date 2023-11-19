import supabase, { supabaseStorage } from '../services/supabase';
import { LoginForm, UploadType } from '../types';

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

export const getData = async () => {
  const { data, error } = await supabase.from('columns').select('*');

  if (error) throw new Error(`Cant get own table\n${error}`);

  return data;
};

export const uploadImage = async ({
  file,
  time,
  comment,
  name,
  timeframe,
  data: oldData,
}: UploadType) => {
  try {
    let fileName = '';
    if (file) {
      fileName = `${supabaseStorage}${time}_${file.name}`;
      const { error } = await supabase.storage
        .from('charts')
        .upload(`${time}_${file.name}`, file);

      if (error) throw new Error(error.message);

      if (oldData?.img) {
        const imgName = oldData.img.slice(oldData.img.lastIndexOf('/') + 1);

        const { error: deleteError } = await supabase.storage
          .from('charts')
          .remove([imgName]);
        if (deleteError) throw new Error(deleteError.message);
      }
    }

    const { data, error } = await supabase
      .from('columns')
      .update({
        [timeframe]: {
          time,
          comment,
          img: fileName || oldData?.img || '',
        },
      })
      .eq('name', name)
      .select();

    if (error) throw new Error(error.message);

    return data;
  } catch (e) {
    console.log(e);
  }
};

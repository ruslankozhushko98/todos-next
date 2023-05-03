import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
import { Category } from '@/models';

type Data = PostgrestSingleResponse<Category | null>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('categories')
      .select('*, todos(*)')
      .eq('id', req.query.categoryId)
      .single();

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(data as Data);
  }

  if (req.method === 'PUT') {
    const response = await supabase.from('categories')
      .update(req.body)
      .eq('id', req.query.categoryId)
      .single();

    return res.status(200).json(response);
  }

  if (req.method === 'DELETE') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const removedTodo = await supabase.from('todos')
      .delete()
      .eq('id', req.query.categoryId);

    const response = await supabase.from('categories')
      .delete()
      .eq('id', req.query.categoryId)
      .single();

    return res.status(200).json(response);
  }
}

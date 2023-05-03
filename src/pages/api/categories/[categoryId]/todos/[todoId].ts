import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
import { Todo } from '@/models';

type Data = PostgrestSingleResponse<Todo | null>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    const response = await supabase.from('todos')
      .select()
      .eq('id', req.query.todoId)
      .single();

    return res.status(200).json(response as Data);
  }

  if (req.method === 'POST') {
    const response = await supabase.from('todos')
      .insert(req.body)
      .single();

    return res.status(201).json(response);
  }

  if (req.method === 'PUT') {
    const response = await supabase.from('todos')
      .update(req.body)
      .eq('id', req.query.todoId)
      .single();

    return res.status(200).json(response);
  }

  if (req.method === 'DELETE') {
    const response = await supabase.from('todos')
      .delete()
      .eq('id', req.query.todoId)
      .single();

    return res.status(200).json(response);
  }
}

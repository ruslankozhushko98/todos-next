import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
import { Todo } from '@/models';

type Data = PostgrestSingleResponse<Array<Todo>>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const response = await supabase.from('todos')
      .insert(req.body)
      .single();

    return res.status(201).json(response);
  }
}

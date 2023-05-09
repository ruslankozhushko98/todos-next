import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestError } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
import { Category } from '@/models';

type Data = Array<Category> | PostgrestError | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('categories')
      .select()
      .order('created_at', {
        ascending: true,
      });

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(data as Data);
  }

  if (req.method === 'POST') {
    const response = await supabase.from('categories')
      .insert(req.body)
      .single();

    return res.status(201).json(response);
  }
}

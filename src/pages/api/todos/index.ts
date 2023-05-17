import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
import { Category, Todo } from '@/models';

type Data = PostgrestSingleResponse<Todo | null> | PostgrestError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const todoCreated = await supabase.from('todos')
      .insert(req.body)
      .select()
      .single<Todo>();

    const categoryDetails = await supabase.from('categories')
      .select('*, todos(*)')
      .eq('id', todoCreated.data?.category_id)
      .single<Category>();

    const progress = Number(
      (
        (Number(
          categoryDetails.data?.todos?.reduce(
            (accumulator, current) => accumulator + Number(current.isDone),
            0,
          ),
        ) / Number(categoryDetails.data?.todos?.length)) * 100
      ).toFixed(0),
    );

    const updatedCategory = await supabase.from('categories')
      .update({
        ...categoryDetails.data,
        progress,
        todos: undefined,
      })
      .eq('id', categoryDetails.data?.id)
      .select()
      .single<Category>();

    const error = todoCreated.error
      || categoryDetails.error
      || updatedCategory.error;

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(201).json(todoCreated);
  }
}

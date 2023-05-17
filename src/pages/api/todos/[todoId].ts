import { NextApiRequest, NextApiResponse } from 'next';
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js';

import { supabase } from '@/libs/config/supabase';
import { Category, Todo } from '@/models';

type Data = PostgrestSingleResponse<Todo | null>;
type ErrorData = PostgrestError | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>,
) {
  if (req.method === 'GET') {
    const response = await supabase.from('todos')
      .select()
      .eq('id', req.query.todoId)
      .single<Todo>();

    return res.status(200).json(response as Data);
  }

  if (req.method === 'PUT') {
    const todoUpdated = await supabase.from('todos')
      .update(req.body)
      .eq('id', req.query.todoId)
      .select()
      .single<Todo>();

    const categoryDetails = await supabase.from('categories')
      .select('*, todos(*)')
      .eq('id', todoUpdated.data?.category_id)
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

    const error = todoUpdated.error
      || categoryDetails.error
      || updatedCategory.error;

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(todoUpdated);
  }

  if (req.method === 'DELETE') {
    const response = await supabase.from('todos')
      .delete()
      .eq('id', req.query.todoId)
      .single<Todo>();

    return res.status(200).json(response);
  }
}

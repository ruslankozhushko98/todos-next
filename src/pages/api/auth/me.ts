import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/libs/config/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(data);
  }
}

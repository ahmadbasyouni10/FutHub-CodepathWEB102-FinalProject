import { supabase } from "@/client";

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('keep-alive')
      .select('name')
      .limit(1);

    if (error) {
      throw new Error('Failed to keep alive');
    }

    res.status(200).json({ message: 'Keep-alive successful' });
  } catch (error) {
    res.status(500).json({ error: 'Keep-alive failed' });
  }
}
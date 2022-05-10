// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  ok: boolean,
  msg: string,
  method: string,
}

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json(
    {
      ok: true,
      msg: 'Todo correcto',
      method: req.method || 'not method',
    })
}

export default handler;
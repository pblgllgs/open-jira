
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '../../database'
import { Entry } from '../../models'

type Data = {
    message: string,
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    if (process.env.NODE_ENV === 'production') {
        return res.status(400).json({
            message: 'No tiene acceso a producción',
        })
    }
    await db.connect();
    await Entry.deleteMany({});
    await Entry.insertMany(seedData.entries);
    await db.disconnect();
    res.status(200).json(
        {
            message: 'Todo correcto',
        }
    );
}

export default handler;
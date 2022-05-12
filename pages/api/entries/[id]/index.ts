import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Entry, IEntry } from '../../../../models';
import { db } from '../../../../database';

type Data =
    | { message: string }
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntry(req, res)
        case 'PUT':
            return updateEntry(req, res)
        default:
            return res.status(400).json({
                message: 'El id no es valido ',
            })
    }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    try {
        await db.connect();
        const entryToUpdate = await Entry.findById(id);
        if (!entryToUpdate) {
            await db.disconnect();
            return res.status(400).json({
                message: 'El id no existe ' + id,
            })
        }
        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status,
        } = req.body;
        const updatedEntry = await Entry.findByIdAndUpdate(id, {
            description,
            status,
        }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(400).json({
            message: 'Error al actualizar entrada, revisar consola',
        })
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    try {
        await db.connect();
        const entryById = await Entry.findById(id);
        if (!entryById) {
            await db.disconnect();
            return res.status(400).json({
                message: 'El id no existe ' + id,
            })
        }
        res.status(200).json(entryById!);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(400).json({
            message: 'Error al buscar la entrada',
        })
    }
}



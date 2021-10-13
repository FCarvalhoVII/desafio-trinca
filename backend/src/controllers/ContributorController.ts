import Contributor from '../models/Contributor';
import { Request, Response } from 'express';
import mongoose from '../database/connection';

interface IContributor extends mongoose.Document {
    value?: number;
    paid?: boolean;
}

export default class ContributorController {

    public static async create(req: Request, res: Response) {
        const { name, value, withDrink, paid } = req.body;
        const { barbecueId } = req.params;

        try {
            if (!name) {
                return res.status(400).send({ error: 'Name empty or nulls' });
            }

            if (typeof value !== 'number') {
                return res.status(400).send({ error: 'Value must be of type Number' });
            }

            if (typeof withDrink !== 'boolean') {
                return res.status(400).send({ error: 'Missing or incorrect withDrink field' });
            }

            if (typeof paid !== 'boolean') {
                return res.status(400).send({ error: 'Missing or incorrect paid field' });
            }

            const contributor = await Contributor.create({
                barbecue: barbecueId,
                name,
                value,
                with_drink: withDrink,
                paid
            });

            return res.send({ contributor });

        } catch(err) {
            return res.status(400).send({ error: 'Contributor creation failed' });
        }
    }

    public static async update(req: Request, res: Response) {
        const { paid } = req.body;
        const { contributorId } = req.params;

        try {
            if (typeof paid !== 'boolean') {
                return res.status(400).send({ error: 'Missing or incorrect paid field' });
            }

            const contributorUpdated = await Contributor.findByIdAndUpdate(contributorId, {
                paid,
                updated_at: Date.now()
            }, { new: true });

            return res.send({ contributorUpdated });

        } catch(err) {
            return res.status(400).send({ error: 'Update contributor failed' });
        }
    }

    public static async listContributors(req: Request, res: Response) {
        const { barbecueId } = req.params;

        try {
            const contributorsList = await Contributor.find({ barbecue: barbecueId });

            const values = contributorsList.map((contributor: IContributor) => contributor.value);
            const amount = values.reduce((acc, cur) => acc! + cur!);

            const paidValuesFiltered = contributorsList.filter(
                (contributor: IContributor) => contributor.paid === true
            );

            const paidValues = paidValuesFiltered.map((contributor: IContributor) => contributor.value);

            if (paidValues.length > 0) {
                const paidAmount = paidValues.reduce((acc, cur) => acc! + cur!);

                return res.send({ contributorsList, amount, paidAmount });
            }

            return res.send({ contributorsList, amount, paidAmount: 0 });

        } catch(err) {
            return res.status(400).send({ error: 'Search error' });
        }
    }

    public static async delete(req: Request, res: Response) {
        const { contributorId } = req.params;

        try {
            await Contributor.findByIdAndRemove(contributorId);

            return res.send();

        } catch(err) {
            return res.status(400).send({ error: 'Error deleting contributor' });
        }
    }
}
import Barbecue from '../models/Barbecue';
import moment from 'moment';
import { Request, Response } from 'express';
import Contributor from '../models/Contributor';

export default class BarbecueController {

    public static async create(req: Request, res: Response) {
        const { description, notes, date, value } = req.body;
        const id = req.userId;

        try {
            const newDate = moment(date, "YYYY-MM-DD");

            if (!newDate.isValid()) {
                return res.status(400).send({ error: 'Invalid date, try yyyy-mm-dd' });
            }

            if (!description) {
                return res.status(400).send({ error: 'Field are empty or nulls' });
            }

            if (typeof value !== 'number') {
                return res.status(400).send({ error: 'Value must be of type Number' });
            }

            if (value < 0) {
                return res.status(400).send({ error: 'Invalid value' });
            }

            const barbecue = await Barbecue.create({
                created_by: id,
                description,
                additional_notes: notes,
                date: newDate,
                suggested_value: value
            });

            return res.send({ barbecue });

        } catch(err) {
            return res.status(400).send({ error: 'Barbecue creation failed' });
        }
    }

    public static async listBarbecues(req: Request, res: Response) {
        try {
            const barbecues = await Barbecue.find();

            return res.send({ barbecues });

        } catch(err) {
            return res.status(400).send({ error: 'Search error' });
        }
    }

    public static async listBarbecue(req: Request, res: Response) {
        const { barbecueId } = req.params;

        try {
            const barbecue = await Barbecue.findById(barbecueId);

            return res.send({ barbecue });

        } catch(err) {
            return res.status(400).send({ error: 'Search error' });
        }
    }

    public static async delete(req: Request, res: Response) {
        const barbecueId = req.params.barbecueId;

        try {
            await Contributor.find({ barbecue: barbecueId })!.deleteMany();

            await Barbecue.findByIdAndRemove(barbecueId);

            return res.send();

        } catch(err) {
            return res.status(400).send({ error: 'Error deleting barbecue' });
        }
    }
}
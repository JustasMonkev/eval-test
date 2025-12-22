import businesses from '../data/business-profiles.json' with {type: 'json'};
import type {Business} from './types.ts';

const typedBusinesses = businesses as Business[];
const businessMap = new Map(typedBusinesses.map(b => [b.id, b]));

export function getBusinessById(id: string): Business {
    const business = businessMap.get(id);
    if (!business) {
        throw new Error(`Business with ID ${id} not found`);
    }
    return business;
}

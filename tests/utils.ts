import businesses from '../data/business-profiles.json' with {type: 'json'};
import type {Business} from './types.ts';

const typedBusinesses = businesses as Business[];
const businessMap = new Map(typedBusinesses.map(business => [business.id, business]));

// Pre-compute JSON strings for all businesses to avoid repeated JSON.stringify calls
const businessJsonMap = new Map(typedBusinesses.map(business => [business.id, JSON.stringify(business)]));

export function getBusinessById(id: string): Business {
    const business = businessMap.get(id);
    if (!business) {
        throw new Error(`Business with ID ${id} not found`);
    }
    return business;
}

export function getBusinessJSON(id: string): string {
    const businessJson = businessJsonMap.get(id);
    if (!businessJson) {
        throw new Error(`Business JSON with ID ${id} not found`);
    }
    return businessJson;
}

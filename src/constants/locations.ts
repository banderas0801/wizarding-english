/**
 * Location Constants
 * Single source of truth for all Hogwarts locations
 * Used by routes, navigation, HogwartsMap, LocationDetail, etc.
 */

export type LocationKey = 'library' | 'potions_classroom' | 'arithmancy_classroom' | 'herbology_greenhouse' | 'great_hall';

export interface LocationConfig {
  key: LocationKey;
  title: string;
  icon: string;
  description: string;
  color: string;
  route: string;
  subject: string;
}

/**
 * All Hogwarts locations
 * Keys match HogwartsMap lesson grouping and routes
 */
export const LOCATIONS: Record<LocationKey, LocationConfig> = {
  library: {
    key: 'library',
    title: 'Library',
    icon: 'menu_book',
    description: 'The endless knowledge of ancient texts and reading comprehension lessons',
    color: '#3b6848',
    route: '/location/library',
    subject: 'reading'
  },
  potions_classroom: {
    key: 'potions_classroom',
    title: 'Potions Classroom',
    icon: 'science',
    description: 'Master the art of writing and composition through potion-brewing metaphors',
    color: '#510003',
    route: '/location/potions_classroom',
    subject: 'writing'
  },
  arithmancy_classroom: {
    key: 'arithmancy_classroom',
    title: 'Arithmancy Classroom',
    icon: 'calculate',
    description: 'Explore mathematical mysteries and numerical magic',
    color: '#162147',
    route: '/location/arithmancy_classroom',
    subject: 'math'
  },
  herbology_greenhouse: {
    key: 'herbology_greenhouse',
    title: 'Herbology Greenhouse',
    icon: 'local_florist',
    description: 'Discover the wonders of nature and scientific principles',
    color: '#a83730',
    route: '/location/herbology_greenhouse',
    subject: 'science'
  },
  great_hall: {
    key: 'great_hall',
    title: 'Great Hall',
    icon: 'castle',
    description: 'Gather to learn vocabulary, grammar, and languages of magic',
    color: '#741010',
    route: '/location/great_hall',
    subject: 'vocabulary'
  }
};

/**
 * Get location by key
 */
export function getLocation(key: LocationKey | string): LocationConfig | undefined {
  return LOCATIONS[key as LocationKey];
}

/**
 * Get all locations as array
 */
export function getAllLocations(): LocationConfig[] {
  return Object.values(LOCATIONS);
}

/**
 * Get location key from route
 * Extracts key from /location/:key routes
 */
export function getLocationKeyFromRoute(route: string): LocationKey | undefined {
  const match = route.match(/\/location\/([^/?]+)/);
  if (match && match[1]) {
    return match[1] as LocationKey;
  }
  return undefined;
}

/**
 * Navigation helper
 */
export function getLocationRoute(key: LocationKey): string {
  return LOCATIONS[key]?.route || '/';
}

/**
 * Validate location key
 */
export function isValidLocationKey(key: any): key is LocationKey {
  return key in LOCATIONS;
}

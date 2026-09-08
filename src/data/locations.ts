/**
 * Office locations.
 *
 * Single source for the addresses, which previously sat hardcoded in the
 * footer, the contact page copy, two map-link handlers and a map embed — five
 * places to keep in step. The map URLs are built from the address string here,
 * so an address change cannot leave a map pointing somewhere else.
 */

export interface Location {
  /** Short label, used as the heading for each office. */
  city: string;
  street: string;
  region: string;
}

export const locations: Location[] = [
  {
    city: "Ajax",
    street: "190 Harwood Avenue S",
    region: "Ajax, Ontario L1S 2H6",
  },
  {
    city: "Scarborough",
    street: "627 Warden Avenue",
    region: "Scarborough, ON",
  },
];

const query = (l: Location) => encodeURIComponent(`${l.street}, ${l.region}`);

export const googleMapsUrl = (l: Location) =>
  `https://www.google.com/maps/search/?api=1&query=${query(l)}`;

export const appleMapsUrl = (l: Location) =>
  `https://maps.apple.com/?q=${query(l)}`;

/**
 * Keyless embed built from the address rather than from an opaque coordinate
 * blob, so it stays correct for any address without hand-generating a new one.
 */
export const mapEmbedUrl = (l: Location) =>
  `https://maps.google.com/maps?q=${query(l)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

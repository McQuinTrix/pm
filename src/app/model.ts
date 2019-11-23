export interface IFSVenueDetails {
  categories: {
    icon: {
      prefix: string
      suffix: string
    }
    id: string,
    name: string,
    pluralName: string,
    shortName: string,
    primary: boolean
  }[];
  id: string;
  location: {
    address: string,
    cc: string,
    city: string,
    country: string,
    crossStreet: string
  };
  formattedAddress: string[];
  labeledLatLngs: {
    label: string,
    lat: number,
    lng: number
  };
  lat: number;
  lng: number;
  postalCode: string;
  state: string;
  name: string;

}

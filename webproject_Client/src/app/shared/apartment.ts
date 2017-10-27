import { Image } from '../shared/image';
import { IUser } from '../shared/user';

export interface IApartment {
    Id: number;
    Address: string;
    Price: number;
    Description: string;
    Lat: number;
    Lng: number;
    RoomsNumber: number;
    apartmentSize: number;
    hasParking: boolean;
    hasAirConditining: boolean;
    hasFurniture: boolean;
    Images: Image[];
    User?: IUser;
}

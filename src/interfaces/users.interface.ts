type Address = {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
};

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

export interface UsersAPI{
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string; 
  address: Address;
  company: Company;
  picture?: string; // This property not exist in the API JSONPLACEHOLDER, It's a property aditional added.
}

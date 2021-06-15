export interface CreateContactData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdateContactData extends CreateContactData {
  id: number;
}

export interface ContactData {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  accountId: number;
  createdAt: number;
  updatedAt: number;
  youOwe: number;
  owesYou: number;
}

export interface FetchContactsResponse {
  contacts: ContactData[];
}
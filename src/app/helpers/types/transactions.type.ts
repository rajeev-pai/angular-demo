export enum TransactionTypeCode {
  YOU_OWE, // 0
  OWES_YOU, // 1
}

export interface Transaction {
  id: number;
  accountId: number;
  contactId: number;
  type: TransactionTypeCode;
  amount: number;
  dateTime: number;
  note: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface ContactTransactionsResponse {
  transactions: Transaction[];
}

export interface TransactionSummary {
  youOwe: number;
  owesYou: number;
}

export interface CreateOrUpdateTransactionData {
  contactId: number;
	type: number;
	amount: number;
	dateTime: number;
	note: string;
	description: string;
}
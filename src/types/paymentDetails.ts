export interface PaymentDetail {
  ntsId: number | null;
  ntsTaxNum: string;
  supplyAmount: number;
  issueDate: string;
  totalAmount: number;
}

export interface PaymentData {
  name: string;
  paymentRecipient: string;
  recipientBusinessNumber: string;
  totalPaymentAmount: number;
  paymentMethod: string;
  paymentAccount: string;
  paymentPrincipal: string;
  principalBusinessNumber: string;
  approver: string | null;
  scheduledPaymentDate: string | null;
  createdAt: string;
  paymentDetails: PaymentDetail[];
  totalSupplyAmount: number;
  totalAllAmount: number;
}

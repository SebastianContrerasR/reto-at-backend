export interface PaymentServiceInterface {
  processPayment(ticketId: string, amount: number): Promise<boolean>;
  cancelPayment(ticketId: string): Promise<void>;
}

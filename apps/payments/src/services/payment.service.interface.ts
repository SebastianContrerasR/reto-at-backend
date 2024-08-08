export interface PaymentServiceInterface {
  processPayment(ticketId: string, amount: number): Promise<void>;
  cancelPayment(ticketId: string): Promise<void>;
}

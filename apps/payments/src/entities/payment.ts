import { Column, Entity, PrimaryColumn } from 'typeorm';
export const enum PaymentStatus {
  AUTHORIZED = 'authorized',
  CANCELED = 'canceled',
}


@Entity()
export class Payment {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  ticketId: string;

  @Column()
  amount: number;

  @Column()
  paymentDate: Date;

  @Column()
  status: PaymentStatus;

  authorize() {
    this.status = PaymentStatus.AUTHORIZED;
  }
  cancel() {
    this.status = PaymentStatus.CANCELED;
  }
}
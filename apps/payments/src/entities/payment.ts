import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export const enum PaymentStatus {
  AUTHORIZED,
  CANCELED,
}


@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
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
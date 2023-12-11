import { Appointment } from "src/appointments/entities/appointment.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('nurses')
export class Nurse {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @OneToMany(() => Appointment, (appointment) => appointment.nurse)
  appointments: Appointment[];
}
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('equipments')
export class Equipement {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @OneToMany(() => Appointment, (appointment) => appointment.equipement)
    appointments: Appointment[];
}

import { Nurse } from "src/nurses/entities/nurse.entity";
import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Equipement } from '../../equipements/entities/equipement.entity';
import { Patient } from "src/patients/entities/patient.entity";

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date")
  date: Date;

  @ManyToOne(() => Nurse, (nurse) => nurse.appointments,{eager:true})
  @JoinColumn({ name: "nurse_id" })
  nurse: Nurse;
  
  @ManyToOne(() => Equipement, (equipement) => equipement.appointments,{eager:true})
  @JoinColumn({ name: "equipement_id" })
  equipement: Equipement;

  @ManyToOne(() => Patient, (patient) => patient.appointments,{eager:true})
  @JoinColumn({ name: "patient_id" })
  patient: Patient;
}

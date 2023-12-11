import {PartialType} from "@nestjs/mapped-types";
import {CreateAppointmentDto} from "./create-appointment.dto";

export class CheckPatientDto extends PartialType(CreateAppointmentDto) {}

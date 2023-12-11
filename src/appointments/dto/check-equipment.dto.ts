import {CreateAppointmentDto} from "./create-appointment.dto";
import {PartialType} from "@nestjs/mapped-types";

export class CheckEquipmentDto extends PartialType(CreateAppointmentDto) {}

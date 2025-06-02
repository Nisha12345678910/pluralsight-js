import { Access, ClientStatus, DigitalMentalHealthTherapy, EAPEmployerProvided, HRISSystem, Insurer, PayrollCalendar, PayrollProcessingFrequency, Product, User, VirtualCare } from "./IClientInfo";
export interface IClientInfoDropDown{
    clientStatuses: ClientStatus[];
    products: Product[] ;
    accesses: Access[] ;
    hrisSystems: HRISSystem[] ; 
    virtualCares: VirtualCare[] ; 
    digitalMentalHealthTherapies: DigitalMentalHealthTherapy[] ;
    eapEmployerProvideds: EAPEmployerProvided[] ;
    payrollProcessingFrequencies: PayrollProcessingFrequency[] ; 
    payrollCalendars: PayrollCalendar[] ;
    insurers: Insurer[] ;
    users: User[] ;
}
export interface ClientStatus {
  clientStatusId: number; 
  status: string;
}

export interface Product {
  productId: number; 
  productName: string;
}

export interface Access {
  accessId: number; 
  accessType: string;
}

export interface HRISSystem {
  hrisSystemId: number; 
  systemName: string;
}

export interface VirtualCare {
  virtualCareId: number; 
  careProvider: string;
}

export interface DigitalMentalHealthTherapy {
  digitalMentalHealthTherapyId: number; 
  providerName: string;
}

export interface EAPEmployerProvided {
  eapEmployerProvidedId: number; 
  providerName: string;
}

export interface PayrollProcessingFrequency {
  payrollProcessingFrequencyId: number; 
  frequency: string;
}

export interface PayrollCalendar {
  payrollCalendarId: number; 
  calendarName: string;
}

export interface Insurer {
  insurerId: number;
  name?: string; 
}

export interface User {
  userId: number;
  firstName?: string; 
  lastName?: string; 
  userName?:string;
}
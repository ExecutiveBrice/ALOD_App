export * from './adherent-controller.service';
import { AdherentControllerApi } from './adherent-controller.service';
export * from './adherent-controller.serviceInterface';
export * from './auth-controller.service';
import { AuthControllerApi } from './auth-controller.service';
export * from './auth-controller.serviceInterface';
export const APIS = [AdherentControllerApi, AuthControllerApi];

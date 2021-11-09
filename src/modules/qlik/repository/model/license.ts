import { LicenseQlik } from '.prisma/client'

export type LicenseQlikModel ={
  subject:string;
  type:LicenseQlik;
  userId:string;
  name:string;
  excess: boolean
  created: string
}

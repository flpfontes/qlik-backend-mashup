import { LicenseQlik } from '.prisma/client'

export type UserQlikModel = {
  id:string;
  status:string;
  name:string;
  subject:string;
  roles:string[]
  email:string;
  license?:LicenseQlik
}

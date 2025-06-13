export interface User {
  groups: any[]; // You can define a more specific type if you know the structure
  language: string;
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  configuration: Record<string, any>;
  picture: string;
  organisation_id: number;
  country_code: string;
  phone_number: string;
  role_id: number;
  job_title: string;
  usage_location: string;
  meta: Record<string, any>;
  role?: string; // Keep role from JWT for access control
}

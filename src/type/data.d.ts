
export interface Tenant {
    id: string;
    name: string;
    address: string;
    picture: string | null;
    tenant_id: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface User {
    id: string;
    name: string;
    phone_number: string;
    address: string;
    picture: string | null;
    role: string;
    tenant_id: string;
    created_at: string;
    updated_at: string;
  }
  
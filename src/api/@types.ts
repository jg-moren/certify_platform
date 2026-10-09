
export type status = "pending" | "available" | "expired";

/**
 * =========================================
 * Auth
 * =========================================
 */

export interface AuthSignUp {
  fullname: string;
  email: string;
  password: string;
  cpf?: string;
  phone?: string;
  role: string;
}

export interface CompanySignUp extends AuthSignUp {
  razao_social: string;
  cnpj: string;
}

export interface AuthUserReponse {
  _id: string;
  fullname?: string;
  email: string;
  razao_social?: string;
  role: "user" | "admin" | "empresa";
  created_at?: string;
  updated_at?: string;
  status?: status;
}

/**
 * =========================================
 * Certificate
 * =========================================
 */

export interface CertificateInDb {
  id: string;
  user_id: string;
  access_key: string;
  status: status;
  participant_name: string;
  participant_email: string;
  institution_name: string;
  event_id: string;
  event_name: string;
  description: string;
  workload: string;
  event_start?: Date | null;
  event_end?: Date | null;
  event_date?: Date | null;
  issued_at?: Date | null;
  valid_until: Date;
}

export interface CertificateRequest {
  fullname: string;
  access_key?: string | undefined;
  event_id: string | number;
  status: status;
  email: string;
}

export interface CertificateResponse extends BaseResponse{
  data: {
    certificate: CertificateInDb;
  };
}

export interface CertificateListResponse extends BaseResponse{
  data: {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    items: CertificateInDb[];
  };
}

/**
 * =========================================
 * Event
 * =========================================
 */

export interface EventInDb {
  id: string;
  name: string;
  institution: string;
  workload: number;
  description: string;
  start_date: Date;
  end_date: Date;
  created_at?: Date | null;
}

export interface EventRequest {
  name: string;
  institution: string;
  workload: number;
  description: string;
  start_date: Date;
  end_date: Date;
  created_at?: Date | null;
}

export interface EventUpdateRequest {
  name?: string | null;
  workload?: number | null;
  description?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
}

export interface EventResponse extends BaseResponse{
  data: {
    event: EventInDb;
  };
}


/**
 * =========================================
 * Base Response
 * =========================================
 */

export interface BaseResponse {
  success : boolean,
  message : string,
  details : string | null
}

export interface SucessResponse extends BaseResponse{
  data : {
    auth : AuthUserReponse,
    access_token?: string,
    refresh_token?: string,
    token_type?: string
  }
}

export interface ErrorResponse extends BaseResponse {
  error_code ?: string | null
}




export type ApiAuthResponse = SucessResponse | ErrorResponse | CertificateResponse

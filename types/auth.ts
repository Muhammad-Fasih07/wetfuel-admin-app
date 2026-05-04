export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "manager";
  avatar?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface AuthSession {
  user: AdminUser;
  token: string;
  expires: string;
}

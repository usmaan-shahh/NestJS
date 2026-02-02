export interface UpdateProfilePayload {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UpdateProfileResult {
  message: string;
}

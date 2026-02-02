export interface UpdateProfilePayload {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

/** Shape returned by updateProfile: success message describing what was updated. */
export interface UpdateProfileResult {
  message: string;
}

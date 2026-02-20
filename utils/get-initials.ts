export const getInitials = (fullName: string | null | undefined) => {
  if (!fullName || typeof fullName !== "string") {
    return "";
  }

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) {
    return "";
  }

  const firstNameInitial = parts[0].charAt(0);

  const lastNameInitial =
    parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";

  return `${lastNameInitial}${firstNameInitial}`.toUpperCase();
};

// Function to get user initials
export default function getUserInitials(legalName) {
  if (!legalName) {
    return '';
  }

  const firstNameInitial = legalName.firstName ? legalName.firstName[0] : '';
  const lastNameInitial = legalName.lastName ? legalName.lastName[0] : '';

  return `${firstNameInitial}${lastNameInitial}`;
}

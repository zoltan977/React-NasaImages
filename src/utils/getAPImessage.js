export default function getAPImessage(error) {
  return (
    error.response?.data?.msg ||
    error.response?.data?.error?.message ||
    error.message ||
    "Valami hiba történt"
  );
}

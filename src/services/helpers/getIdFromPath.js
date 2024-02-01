export default function getIdFromPath(path) {
  const parts = path.split('/');
  const userId = parts[parts.length - 1];

  return userId;
}

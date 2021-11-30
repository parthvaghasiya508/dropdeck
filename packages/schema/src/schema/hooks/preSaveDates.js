export function preSaveDates(doc, next) {
  const now = new Date();
  doc.updated = now;
  if (!doc.created) {
    doc.created = now;
  }
  if (next) next();
}

const VISITOR_KEY = 'rp_visitor_id';

export function getOrCreateVisitorId() {
  if (typeof window === 'undefined') return '';

  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing && existing.length >= 8) return existing;

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  window.localStorage.setItem(VISITOR_KEY, id);
  return id;
}

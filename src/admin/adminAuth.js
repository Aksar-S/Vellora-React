const ADMIN_SESSION_KEY = 'velora_admin_session';

const ADMIN_CREDENTIALS = Object.freeze({
  username: 'admin',
  password: 'admin@123'
});

export const adminLoginCopy = {
  title: 'Admin access',
  subtitle: 'Enter the fixed admin credentials to open the back office.',
  note: 'The username and password are hardcoded in the app and are not editable from the UI.'
};

export function authenticateAdmin(username, password) {
  const normalizedUsername = String(username || '').trim().toLowerCase();
  const normalizedPassword = String(password || '');

  if (normalizedUsername === ADMIN_CREDENTIALS.username && normalizedPassword === ADMIN_CREDENTIALS.password) {
    try {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } catch {
      // ignore persistence failures
    }
    return true;
  }

  return false;
}

export function isAdminAuthenticated() {
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // ignore persistence failures
  }
}
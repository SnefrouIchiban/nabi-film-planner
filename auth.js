// api/auth.js — Vercel serverless function
// Redirects to Google OAuth

export default function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI; // e.g. https://your-app.vercel.app/api/callback

  const scope = encodeURIComponent([
    'https://www.googleapis.com/auth/documents',
    'https://www.googleapis.com/auth/drive.file'
  ].join(' '));

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth`
    + `?client_id=${clientId}`
    + `&redirect_uri=${encodeURIComponent(redirectUri)}`
    + `&response_type=token`
    + `&scope=${scope}`
    + `&prompt=consent`;

  res.redirect(authUrl);
}

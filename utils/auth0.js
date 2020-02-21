import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  audience: process.env.API_AUDIENCE,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: process.env.AUTH0_SCOPE,
  domain: process.env.AUTH0_DOMAIN,
  redirectUri: process.env.REDIRECT_URI,
  postLogoutRedirectUri: process.env.POST_LOGOUT_REDIRECT_URI,
  allowSignUp: false,
  session: {
    cookieSecret: process.env.SESSION_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8,
    // cookieSameSite: "none",
    // cookieDomain: process.env.BASE_URI,
    // Store the id_token in the session. Defaults to false.
    storeIdToken: true,
    // Store the access_token in the session. Defaults to false.
    storeAccessToken: true,
    // Store the refresh_token in the session. Defaults to false.
    storeRefreshToken: true
  }
});

const dotenv = require("dotenv");
dotenv.config();
const withSass = require("@zeit/next-sass");
module.exports = withSass({
  target: "serverless",
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
    API_AUDIENCE: process.env.API_AUDIENCE,
    GRAPHQL_URI: process.env.GRAPHQL_URI,
    REDIRECT_URI: process.env.REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI,
    BASE_URI: process.env.BASE_URI,
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: 7200 // 2 hours
  }
});

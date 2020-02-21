import auth0 from "../../utils/auth0";

export default async function token(req, res) {
  try {
    const tokenCache = await auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    // console.log("accessToken", accessToken, " at ", new Date().toISOString());
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ accessToken }));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

import auth0 from "../../utils/auth0";

export default async function token(req, res) {
  try {
    const session = await auth0.getSession(req);
    // const { accessToken } = await tokenCache.getAccessToken();
    // console.log("accessToken", accessToken, " at ", new Date().toISOString());
    // console.log(session);
    // console.log("Session? ", session);
    if (session) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({ session, now: new Date().toISOString() });
    } else {
      // console.log("no user");
      res.json({ session: {} });
    }
    // res.end(JSON.stringify({ accessToken }));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

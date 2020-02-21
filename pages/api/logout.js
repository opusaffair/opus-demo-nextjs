import auth0 from "../../utils/auth0";
import initApollo from "../../utils/init-apollo";

async function logout(req, res) {
  const apollo = initApollo();
  apollo.cache.reset();
  try {
    await auth0.handleLogout(req, res);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

export default logout;

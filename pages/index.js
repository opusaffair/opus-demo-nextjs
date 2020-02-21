import Link from "next/link";
import Layout from "../components/Layout";
import { useFetchUser } from "../utils/user";

function Index() {
  const { user, userLoading } = useFetchUser();

  return (
    <Layout user={user} userLoading={userLoading}>
      <br />
      <Link href="/explore">
        <a>{`Welcome!`}</a>
      </Link>
    </Layout>
  );
}

export default Index;

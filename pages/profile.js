import Layout from "../components/Layout";

import { useFetchUser } from "../utils/user";

const ProfileView = props => {
  const { user, userLoading } = useFetchUser();
  console.log(user);
  return (
    <Layout user={user} userLoading={userLoading}>
      <div>
        <h1>Profile</h1>
      </div>
      {userLoading && <p>Loading...</p>}
      {!userLoading && user && <p>{user.email}</p>}
      {!userLoading && !user && <p>No user loaded</p>}
    </Layout>
  );
};

export default ProfileView;

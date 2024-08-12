/* eslint-disable react/prop-types */
const UserProfile = ({ profile, accessToken, logOut }) => {
  return (
    <div>
      <img src={profile?.picture} alt="user image" />
      <h3>User Logged in</h3>
      <p>Name: {profile?.name}</p>
      <p>Email Address: {profile?.email}</p>
      <p>AccessToken: {accessToken}</p>
      <br />
      <br />
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default UserProfile;

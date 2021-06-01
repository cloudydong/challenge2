import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router";
import { isLoggedInVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { useMe } from "../../hook/useMe";

export const MyProfile = () => {
  const { data, loading } = useMe();
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    isLoggedInVar(false);
    history.push({
      pathname: "/",
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
        <title>My Profile | Challenge</title>
      </Helmet>
      <h4 className="font-semibold text-3xl mb-3">My Profile</h4>
      {!loading && (
        <div className="bg-white w-3/4 py-8 max-w-screen-xl flex flex-col justify-center items-center">
          <h4 className="text-2xl font-light mb-2">id: {data?.me.id}</h4>
          <h6 className="text-2xl font-light mb-2">
            createAt: {data?.me.createAt}
          </h6>
          <h6 className="text-2xl font-light mb-2">
            updateAt: {data?.me.updateAt}
          </h6>
          <h6 className="text-2xl font-light mb-2">email: {data?.me.email}</h6>
          <h6 className="text-2xl font-light mb-2">role: {data?.me.role}</h6>
        </div>
      )}
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
};

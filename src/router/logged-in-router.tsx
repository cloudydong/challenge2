import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMe } from "../hook/useMe";
import { NotFound } from "../page/404";
import { PodcastDetail } from "../page/podcast/podcast-detail";
import { PodcastList } from "../page/podcast/podcast-list";
import { MyProfile } from "../page/user/my-profile";

const HostRoute = [
  <Route key={1} path="/" exact component={PodcastList} />,
  <Route key={2} path="/profile" exact component={MyProfile} />,
  <Route key={3} path="/podcast/:id" exact component={PodcastDetail} />,
];
const ListenerRoute = [
  <Route key={1} path="/" exact component={PodcastList} />,
  <Route key={2} path="/profile" exact component={MyProfile} />,
  <Route key={3} path="/podcast/:id" exact component={PodcastDetail} />,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        {data.me.role === "Host" && HostRoute}
        {data.me.role === "Listener" && ListenerRoute}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

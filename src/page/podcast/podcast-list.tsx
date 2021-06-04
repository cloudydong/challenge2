import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { podcastList } from "../../__generated__/podcastList";

export const PODCAST_LIST_QUERY = gql`
  query podcastList {
    getAllPodcasts {
      podcasts {
        id
        updateAt
        title
        category
        rating
      }
    }
  }
`;

export const PodcastList = () => {
  const { data, loading } = useQuery<podcastList>(PODCAST_LIST_QUERY);
  return (
    <div className="h-screen flex flex-col items-center bg-blueGray">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 mt-8 lg:mt-28">
        <Helmet>
          <title>Podcast List | Challenge</title>
        </Helmet>
        <div className="w-full flex flex-col items-center bg-blueGray-light">
          <div className="w-full flex items-center border-b border-rallyGreen-light">
            <h1 className="font-medium text-white text-xl mx-2 pb-2">
              My Podcasts
            </h1>
            <h1 className="font-medium text-white text-xl mx-2 pb-2">코미디</h1>
          </div>
          {!loading && (
            <div className="w-full flex flex-col items-center text-white">
              {data?.getAllPodcasts.podcasts?.map((podcast) => (
                <Link
                  key={podcast.id}
                  to={`/podcast/${podcast.id}`}
                  className="w-full flex flex-col p-4 border-b border-blueGray-dark"
                >
                  <h1>{podcast.title}</h1>
                  <h1>장르: {podcast.category}</h1>
                  <h1>rating: {podcast.rating}</h1>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

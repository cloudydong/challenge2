import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  getPodcast,
  getPodcastVariables,
} from "../../__generated__/getPodcast";

export const GET_PODCAST_QUERY = gql`
  query getPodcast($input: FindPodcastInput!) {
    getPodcast(input: $input) {
      podcast {
        id
        title
        category
        episodes {
          id
          title
          category
        }
      }
    }
  }
`;

interface IParams {
  id: string;
}

export const PodcastDetail = () => {
  const params = useParams<IParams>();
  const { loading, data } = useQuery<getPodcast, getPodcastVariables>(
    GET_PODCAST_QUERY,
    {
      variables: {
        input: {
          id: +params.id,
        },
      },
    }
  );
  return (
    <div className="h-screen flex flex-col items-center bg-blueGray">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 mt-8 lg:mt-28">
        <Helmet>
          <title>Podcast Detail | Challenge</title>
        </Helmet>
        <div className="w-full flex flex-col items-center">
          <Link
            to="/"
            className="w-full font-black text-rallyGreen text-6xl text-left"
          >
            Challenge
          </Link>
        </div>
        <div className="w-full flex flex-col items-center bg-blueGray-light">
          {!loading && (
            <div className="w-full flex flex-col text-white">
              {data?.getPodcast.podcast?.episodes.map((episode, index) => (
                <div key={index} className="w-full flex flex-col">
                  <Link
                    key={episode.id}
                    to={`/episode/${episode.id}`}
                    className="w-full flex flex-col p-4 border-b border-blueGray-dark"
                  >
                    <h5>{episode.title}</h5>
                    <h5>
                      {String(episode.category).length <= 160
                        ? episode.category
                        : String(episode.category).substring(0, 160) + "..."}
                    </h5>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcast
// ====================================================

export interface getPodcast_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  category: string;
}

export interface getPodcast_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  episodes: getPodcast_getPodcast_podcast_episodes[];
}

export interface getPodcast_getPodcast {
  __typename: "FindPodcastOutput";
  podcast: getPodcast_getPodcast_podcast | null;
}

export interface getPodcast {
  getPodcast: getPodcast_getPodcast;
}

export interface getPodcastVariables {
  input: FindPodcastInput;
}

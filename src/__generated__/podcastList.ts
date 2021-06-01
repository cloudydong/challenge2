/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: podcastList
// ====================================================

export interface podcastList_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  updateAt: any;
  title: string;
  category: string;
  rating: number;
}

export interface podcastList_getAllPodcasts {
  __typename: "FindPodcastsOutput";
  podcasts: podcastList_getAllPodcasts_podcasts[] | null;
}

export interface podcastList {
  getAllPodcasts: podcastList_getAllPodcasts;
}

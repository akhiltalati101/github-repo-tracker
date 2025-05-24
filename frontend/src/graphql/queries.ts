import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      id
      name
      owner
      full_name
      description
      url
      has_unseen_releases
      latest_release {
        id
        tag_name
        name
        body
        published_at
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      name
      owner
      full_name
      description
      url
      has_unseen_releases
      latest_release {
        id
        tag_name
        name
        body
        published_at
      }
    }
  }
`;

export const ADD_REPOSITORY = gql`
  mutation AddRepository($url: String!) {
    addRepository(url: $url) {
      id
      name
      owner
      full_name
      description
      url
      has_unseen_releases
      latest_release {
        id
        tag_name
        name
        body
        published_at
      }
    }
  }
`;

export const MARK_RELEASE_AS_SEEN = gql`
  mutation MarkReleaseAsSeen($releaseId: ID!) {
    markReleaseAsSeen(releaseId: $releaseId) {
      id
      tag_name
      name
      body
      published_at
    }
  }
`;

export const REFRESH_REPOSITORY = gql`
  mutation RefreshRepository($repositoryId: ID!) {
    refreshRepository(repositoryId: $repositoryId) {
      id
      name
      owner
      full_name
      description
      url
      has_unseen_releases
      latest_release {
        id
        tag_name
        name
        body
        published_at
      }
    }
  }
`;

export const REFRESH_ALL_REPOSITORIES = gql`
  mutation RefreshAllRepositories {
    refreshAllRepositories {
      id
      name
      owner
      full_name
      description
      url
      has_unseen_releases
      latest_release {
        id
        tag_name
        name
        body
        published_at
        is_seen
      }
    }
  }
`;

export const DELETE_REPOSITORY = gql`
  mutation DeleteRepository($id: ID!) {
    deleteRepository(id: $id)
  }
`;

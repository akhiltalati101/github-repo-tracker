import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Repository {
    id: ID!
    githubId: Int!
    name: String!
    owner: String!
    full_name: String!
    description: String
    url: String!
    latest_release: Release
    has_unseen_releases: Boolean!
    createdAt: String!
  }

  type Release {
    id: ID!
    repositoryId: Int!
    githubReleaseId: Int!
    tag_name: String!
    name: String
    body: String
    published_at: String
    is_seen: Boolean!
    createdAt: String!
  }

  type Query {
    repositories: [Repository!]!
    repository(id: ID!): Repository
  }

  type Mutation {
    addRepository(url: String!): Repository!
    deleteRepository(id: ID!): Boolean!
    markReleaseAsSeen(releaseId: ID!): Release!
    refreshRepository(repositoryId: ID!): Repository!
    refreshAllRepositories: [Repository!]!
  }
`;
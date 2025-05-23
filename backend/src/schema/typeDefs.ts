import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Repository {
    id: ID!
    githubId: Int!
    name: String!
    fullName: String!
    description: String
    url: String!
    latestRelease: Release
    hasUnseenReleases: Boolean!
    createdAt: String!
  }

  type Release {
    id: ID!
    repositoryId: Int!
    githubReleaseId: Int!
    tagName: String!
    name: String
    body: String
    publishedAt: String
    isSeen: Boolean!
    createdAt: String!
  }

  type Query {
    repositories: [Repository!]!
    repository(id: ID!): Repository
  }

  type Mutation {
    addRepository(url: String!): Repository!
    markReleaseAsSeen(releaseId: ID!): Release!
    refreshRepository(repositoryId: ID!): Repository!
    refreshAllRepositories: [Repository!]!
  }
`;
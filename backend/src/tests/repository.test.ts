import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { ADD_REPOSITORY } from '../graphql/queries';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

async function testAddRepository() {
  try {
    const testUrl = 'https://github.com/facebook/react';
    
    console.log('Testing repository addition...');
    const { data } = await client.mutate({
      mutation: ADD_REPOSITORY,
      variables: { url: testUrl }
    });

    console.log('Successfully added repository:');
    console.log('ID:', data.addRepository.id);
    console.log('Name:', data.addRepository.name);
    console.log('Owner:', data.addRepository.owner);
    console.log('Latest Release:', data.addRepository.latest_release?.tag_name || 'No releases');
    
    return data.addRepository;
  } catch (error) {
    console.error('Error adding repository:', error);
    throw error;
  }
}

// Run the test
testAddRepository()
  .then(() => console.log('Test completed'))
  .catch(console.error); 
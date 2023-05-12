import { ApolloClient, createHttpLink, InMemoryCache, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Setting up the Authentication // 
const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IkFobWVkIE11c3RhZmEiLCJpc19jYW5kaWRhdGUiOnRydWUsImlhdCI6MTY4MzY1NDI3NywiZXhwIjoxNjg0MjU5MDc3fQ.vDyPZbrb10j5BNitmH8OEIsoruOchuMe7XyqKFd2L6c',
        }
    }
});

// Linking the graphql server // 
const httpLink = createHttpLink({
    uri: 'https://api.poc.graphql.dev.vnplatform.com/graphql',
});

// Making a client Object // 
export const client = new ApolloClient({
    // link: authLink.concat(uploadLink), // Chain it with the HttpLink
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false
    }),
    connectToDevTools: true,


});
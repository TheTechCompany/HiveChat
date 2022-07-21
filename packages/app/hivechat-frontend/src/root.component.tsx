import App from './App'
import { HexHiveTheme } from '@hexhive/styles'
import { ThemeProvider } from '@mui/material'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

export default function Root(props) {

  const authServer = process.env.REACT_APP_API
  ? `${process.env.REACT_APP_API}`
  : "http://localhost:7000"

  const client = new ApolloClient({
    uri: `${authServer}/graphql`,
    cache: new InMemoryCache(),
    credentials: "include",
  });


  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={HexHiveTheme}>
        <App />;
      </ThemeProvider>
    </ApolloProvider>
  )
}

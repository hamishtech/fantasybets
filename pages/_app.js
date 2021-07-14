import { UserProvider } from "@auth0/nextjs-auth0";
import { ChakraProvider } from "@chakra-ui/react";
import { UserDBContextWrapper } from "../context/UserDBContext";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <UserDBContextWrapper>
          <Component {...pageProps} />
        </UserDBContextWrapper>
      </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;

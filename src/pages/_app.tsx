/* istanbul ignore file */
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary: #f2a756;

    --gray-1: #a0a0a0;
    --gray-3: #f2f2f2;
  }
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    color: var(--font-gray-2);
  }
`;

// staleTime    : refetch 방지
// OnWindowFocus: 화면 focus 시 refetch
// OnReconnect  : 네트워크 reconnect 시 refetch
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  }
});
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <GlobalStyles />
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

export default App

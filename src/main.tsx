import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div style={{fontSize: '2rem', color: 'white', textAlign: 'center'}}>앱 전체 로딩 중...</div>}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </StrictMode>,
)

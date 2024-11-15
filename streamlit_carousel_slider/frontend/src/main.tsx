import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Carousel from './carousel'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Carousel />
  </StrictMode>,
)

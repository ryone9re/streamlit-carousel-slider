import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import CarouselSliderComponent, { CarouselSlider } from './carousel-slider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarouselSlider images={[]} />
    <CarouselSliderComponent />
  </StrictMode>,
)

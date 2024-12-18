import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import CarouselSliderComponent from "./carousel-slider";

// biome-ignore lint/style/noNonNullAssertion: Biome default
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarouselSliderComponent />
  </StrictMode>,
);

import type { ReactNode } from "react";
import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";

type Images = Array<{ source: string }>;

type CarouselSliderProps = {
  images: Images;
};

export function CarouselSlider({ images }: CarouselSliderProps): ReactNode {
  return <h1 className="text-red-500">{images.length}</h1>;
}

type CarouselSliderComponentProps = {
  args: CarouselSliderProps;
};

class CarouselSliderComponent extends StreamlitComponentBase<CarouselSliderComponentProps> {
  public render(): ReactNode {
    const images: Images = this.props.args.images ?? [];

    return <CarouselSlider images={images} />;
  }
}

export default withStreamlitConnection(CarouselSliderComponent);

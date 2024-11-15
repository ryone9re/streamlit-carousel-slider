import { type ReactNode, useCallback } from "react";
import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";

type Images = Array<{ source: string }>;

type CarouselSliderProps = {
  images: Images;
};

export function CarouselSlider({ images }: CarouselSliderProps): ReactNode {
  const imageLength = images.length;

  const previousSlide = useCallback(
    (currentPage: number) => {
      if (currentPage === 0) {
        return imageLength - 1;
      }
      return currentPage - 1;
    },
    [imageLength],
  );

  const nextSlide = useCallback(
    (currentPage: number) => {
      if (currentPage + 1 >= imageLength) {
        return 0;
      }
      return currentPage + 1;
    },
    [imageLength],
  );

  return (
    <>
      <div className="carousel w-full">
        {images.map((image, index) => (
          <div
            key={image.source}
            id={`carousel-slide-${index}`}
            className="carousel-item relative w-full"
          >
            <img
              alt={`carousel-image-${index}`}
              src={image.source}
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#carousel-slide-${previousSlide(index)}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#carousel-slide-${nextSlide(index)}`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {images.map((image, index) => (
          <a
            key={image.source}
            href={`#carousel-slide-${index}`}
            className="btn btn-xs"
          >
            {index}
          </a>
        ))}
      </div>
    </>
  );
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

import {
  type MouseEventHandler,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";
import { indexToSerial } from "./utils";

type Images = Array<{ source: string }>;

type CarouselSliderProps = {
  images: Images;
};

export function CarouselSlider({ images }: CarouselSliderProps): ReactNode {
  const imageLength = images.length;
  const [currentSlide, setCurrentSlide] = useState(1);

  const memorizedImages = useMemo(
    () =>
      images.map((image, index) => ({ id: indexToSerial(index), ...image })),
    [images],
  );

  const previousSlide = useCallback(
    (currentPage: number) => {
      if (currentPage <= 1) {
        return imageLength;
      }
      return currentPage - 1;
    },
    [imageLength],
  );

  const nextSlide = useCallback(
    (currentPage: number) => {
      if (currentPage >= imageLength) {
        return 1;
      }
      return currentPage + 1;
    },
    [imageLength],
  );

  const handlePrevClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => previousSlide(prev));
  };

  const handleNextClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setCurrentSlide((prev) => nextSlide(prev));
  };

  const handleSlideClick =
    (slideNumber: number): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      setCurrentSlide(slideNumber);
    };

  return (
    <>
      <div className="carousel w-full">
        {memorizedImages.map((image) => (
          <div
            key={image.id}
            className={`carousel-item relative w-full ${
              currentSlide === image.id ? "" : "hidden"
            }`}
          >
            <img
              alt={`carousel-image-${image.id}`}
              src={image.source}
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button
                type="button"
                onClick={handlePrevClick}
                className="btn btn-ghost btn-circle"
              >
                ❮
              </button>
              <button
                type="button"
                onClick={handleNextClick}
                className="btn btn-ghost btn-circle"
              >
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-start items-center w-full gap-2 py-2 overflow-auto">
        {memorizedImages.map((image) => (
          <button
            key={image.id}
            type="button"
            onClick={handleSlideClick(image.id)}
            className={`btn btn-xs${currentSlide === image.id ? " btn-accent" : ""}`}
          >
            {image.id}
          </button>
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

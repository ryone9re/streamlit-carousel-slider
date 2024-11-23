import {
  type ReactNode,
  useCallback,
  useEffect,
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

const CAROUSEL_SLIDER_NUMBER_REGEX = new RegExp(/#carousel-slide-(\d+)/);

function extractSliderNumber(hash: string): number {
  const _DEFAULT = 1;
  const matched = hash.match(CAROUSEL_SLIDER_NUMBER_REGEX);
  if (matched === null) {
    return _DEFAULT;
  }
  if (matched.length !== 2) {
    return _DEFAULT;
  }
  const slideNumber = Number.parseInt(matched[1]);
  if (Number.isNaN(slideNumber)) {
    return _DEFAULT;
  }
  return slideNumber;
}

export function CarouselSlider({ images }: CarouselSliderProps): ReactNode {
  const imageLength = images.length;

  const [slideNumber, setSlideNumber] = useState(
    extractSliderNumber(location.hash),
  );

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

  useEffect(() => {
    const onHashChange = () => {
      setSlideNumber(extractSliderNumber(location.hash));
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  });

  return (
    <>
      <div className="carousel w-full">
        {memorizedImages.map((image) => (
          <div
            key={image.source}
            id={`carousel-slide-${image.id}`}
            className="carousel-item relative w-full"
          >
            <img
              alt={`carousel-image-${image.id}`}
              src={image.source}
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#carousel-slide-${previousSlide(image.id)}`}
                className="btn btn-ghost btn-circle"
              >
                ❮
              </a>
              <a
                href={`#carousel-slide-${nextSlide(image.id)}`}
                className="btn btn-ghost btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-start items-center w-full gap-2 py-2 overflow-auto">
        {memorizedImages.map((image) => (
          <a
            key={image.source}
            href={`#carousel-slide-${image.id}`}
            className={`btn btn-xs${slideNumber === image.id ? " btn-accent" : ""}`}
          >
            {image.id}
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

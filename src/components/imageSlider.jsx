import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [thumbStart, setThumbStart] = useState(0); // start index for 5-thumb window

  const VISIBLE = 5;
  const canScrollLeft = thumbStart > 0;
  const canScrollRight = images.length > VISIBLE && thumbStart < images.length - VISIBLE;

  // Move thumbnail window only
  const goToNextImages = () => {
    if (canScrollRight) setThumbStart(thumbStart + 1);
  };

  const goToPreviousImages = () => {
    if (canScrollLeft) setThumbStart(thumbStart - 1);
  };

  const thumbs = images.slice(thumbStart, thumbStart + VISIBLE);

  return (
    <div className="w-full h-full relative flex flex-col items-center lg:mt-15">
      {/* Main Image */}
      <img
        src={images[activeImageIndex]}
        className="w-full md:w-[400px] h-[400px] object-contain rounded-lg shadow-lg"
        alt={`Product Image ${activeImageIndex + 1}`}
      />

      {/* Arrow Buttons for scrolling the thumbnail window */}
      {images.length > VISIBLE && (
        <div className="w-full flex justify-center mt-4 gap-4">
          <button
            onClick={goToPreviousImages}
            className="bg-pink-950 text-white rounded-full p-3 hover:bg-pink-500 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canScrollLeft}
          >
            &lt;
          </button>
          <button
            onClick={goToNextImages}
            className="bg-pink-950 text-white rounded-full p-3 hover:bg-pink-500 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!canScrollRight}
          >
            &gt;
          </button>
        </div>
      )}

      {/* Thumbnails (windowed) */}
      <div className="w-full mt-4 flex flex-row items-center justify-center gap-[5px] overflow-hidden">
        <div className="flex flex-row gap-[10px]">
          {thumbs.map((image, idx) => {
            const globalIndex = thumbStart + idx;
            const isActive = activeImageIndex === globalIndex;
            return (
              <img
                key={globalIndex}
                src={image}
                className={`w-[90px] h-[90px] object-contain cursor-pointer rounded-lg shadow-sm ${
                  isActive ? "border-[5px] border-pink-950" : ""
                }`}
                onClick={() => setActiveImageIndex(globalIndex)}
                alt={`Thumbnail ${globalIndex + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

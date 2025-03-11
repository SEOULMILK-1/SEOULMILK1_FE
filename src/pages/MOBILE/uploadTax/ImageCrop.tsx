import { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Rotation1 from '../../../../public/Icon/Rotation1';
import Rotation2 from '../../../../public/Icon/Rotation2';
import Horizontal from '../../../../public/Icon/Horizontal';
import ResetIcon from '../../../../public/Icon/ResetIcon';

interface ImageCropProps {
  initialImage?: string;
  onCropComplete: (croppedImg: string) => void;
}

const ImageCrop = ({ initialImage }: ImageCropProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });
  const [_, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialImage) {
      setSelectedImage(initialImage);
      const img = new Image();
      img.onload = () => {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      };
      img.src = initialImage;
    }
  }, [initialImage]);

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
    setAspectRatio((prev) => 1 / prev);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
    setAspectRatio((prev) => 1 / prev);
  };

  const handleFlipX = () => setFlipX((prev) => prev * -1);
  const handleFlipY = () => setFlipY((prev) => prev * -1);
  const handleReset = () => {
    setRotation(0);
    setFlipX(1);
    setFlipY(1);
    setAspectRatio(1);
    setCompletedCrop(null);
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-black overflow-hidden">
      <div
        ref={cropContainerRef}
        className="relative flex-grow flex justify-center items-center"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        {selectedImage && (
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspectRatio}
          >
            <img
              ref={imgRef}
              src={selectedImage}
              alt="Uploaded"
              className="max-w-full max-h-[70vh] object-contain"
              style={{
                transform: `scaleX(${flipX}) scaleY(${flipY})`,
                transition: 'transform 0.3s ease-in-out'
              }}
            />
          </ReactCrop>
        )}
      </div>

      <button
        className="absolute bottom-[92px] w-[110px] h-[45px] whitespace-nowrap font-sm-semibold bg-warning-50 text-warning-300 px-3  rounded-[16px] flex items-center gap-2"
        onClick={handleReset}
      >
        <ResetIcon color="#FF433C" />
        원본으로
      </button>

      <div className="absolute bottom-0 w-[208px] h-[56px] bg-white px-4 py-3 rounded-[24px] flex justify-around items-center mb-[24px] gap-6">
        <button
          onClick={handleRotateLeft}
          className="flex flex-col items-center"
        >
          <Rotation1 size={24} />
        </button>
        <button
          onClick={handleRotateRight}
          className="flex flex-col items-center"
        >
          <Rotation2 size={24} />
        </button>
        <button onClick={handleFlipX} className="flex flex-col items-center">
          <Horizontal />
        </button>
        <button onClick={handleFlipY} className="flex flex-col items-center">
          <Horizontal rotate={90} />
        </button>
      </div>
    </div>
  );
};

export default ImageCrop;

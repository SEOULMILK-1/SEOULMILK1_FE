import { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ResetIcon from '../../../public/Icon/ResetIcon';
import Horizontal from '../../../public/Icon/Horizontal';
import Rotation2 from '../../../public/Icon/Rotation2';
import Rotation1 from '../../../public/Icon/Rotation1';

interface ImageCropProps {
  initialImage?: string;
  onCropComplete: (croppedImg: string) => void;
}

const ImageCrop = ({ initialImage, onCropComplete }: ImageCropProps) => {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });

  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 이미지 회전
  const handleRotateLeft = () => setRotation((prev) => (prev - 90) % 360);
  const handleRotateRight = () => setRotation((prev) => (prev + 90) % 360);

  // 이미지 반전
  const handleFlipX = () => setFlipX((prev) => prev * -1);
  const handleFlipY = () => setFlipY((prev) => prev * -1);

  // 이미지 원본 복원
  const handleReset = () => {
    setRotation(0);
    setFlipX(1);
    setFlipY(1);
  };

  // 크롭된 이미지를 캔버스로 변환
  useEffect(() => {
    if (imgRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = imgRef.current.width;
      canvas.height = imgRef.current.height;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipX, flipY);
      ctx.drawImage(imgRef.current, -canvas.width / 2, -canvas.height / 2);

      onCropComplete(canvas.toDataURL('image/png'));
    }
  }, [rotation, flipX, flipY, onCropComplete]);

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-black">
      {/* 이미지 편집 영역 */}
      <div className="flex-grow flex justify-center items-center">
        {initialImage && (
          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img
              ref={imgRef}
              src={initialImage}
              alt="Uploaded"
              className="max-w-full max-h-[400px] object-contain"
              style={{
                transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`
              }}
            />
          </ReactCrop>
        )}
      </div>

      {/* 하단 조작 패널 */}
      <div className="flex justify-around w-full h-[80px] bg-gray-900 text-white items-center">
        <button
          className="text-white text-xl flex flex-col items-center"
          onClick={handleRotateLeft}
        >
          <Rotation1 size={24} />
        </button>
        <button
          className="text-white text-xl flex flex-col items-center"
          onClick={handleRotateRight}
        >
          <Rotation2 size={24} />
        </button>
        <button
          className="text-white text-xl flex flex-col items-center"
          onClick={handleFlipX}
        >
          <Horizontal />
        </button>
        <button
          className="text-white text-xl flex flex-col items-center"
          onClick={handleFlipY}
        >
          <Horizontal rotate={90} />
        </button>
        <button
          className="text-red-500 text-xl flex flex-col items-center"
          onClick={handleReset}
        >
          <ResetIcon color="#FF433C" />
        </button>
      </div>

      <canvas ref={previewCanvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCrop;

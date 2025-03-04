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

const ImageCrop: React.FC<ImageCropProps> = ({
  initialImage,
  onCropComplete
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialImage) {
      setSelectedImage(initialImage);
      setOriginalImage(initialImage);
    }
  }, [initialImage]);

  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const cropImage = () => {
    if (!imgRef.current || !completedCrop || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;
    const { width, height, x, y } = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const realX = x * scaleX;
    const realY = y * scaleY;
    const realWidth = width * scaleX;
    const realHeight = height * scaleY;

    canvas.width = realWidth;
    canvas.height = realHeight;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX, flipY);

    const dx = -realWidth / 2;
    const dy = -realHeight / 2;
    ctx.drawImage(
      image,
      realX,
      realY,
      realWidth,
      realHeight,
      dx,
      dy,
      realWidth,
      realHeight
    );
    ctx.restore();

    // 크롭된 이미지를 Base64로 변환 후 저장
    const croppedImage = canvas.toDataURL('image/png');
    onCropComplete(croppedImage);
  };

  useEffect(() => {
    cropImage();
  }, [completedCrop, rotation, flipX, flipY]);

  // 회전
  const rotateLImage = () => setRotation((prev) => (prev + 90) % 360);
  const rotateRImage = () => setRotation((prev) => (prev - 90) % 360);
  const flipImageX = () => setFlipX((prev) => prev * -1);
  const flipImageY = () => setFlipY((prev) => prev * -1);

  // 원본 복원
  const resetImage = () => {
    setSelectedImage(originalImage);
    setRotation(0);
    setFlipX(1);
    setFlipY(1);
  };
  useEffect(() => {
    cropImage();
  }, [completedCrop, rotation, flipX, flipY]);

  return (
    <div className="flex flex-col items-center">
      {selectedImage && (
        <div className="relative w-[960px] pt-8">
          <h3 className="py-[12px] text-white bg-gray-800 text-center h-[54px] rounded-t-[32px]">
            세금계산서가 잘 보이도록 사진을 편집해주세요.
          </h3>
          <div className="relative border-none border-gray-300 overflow-hidden text-center h-[534px] flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>

            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              className="relative z-20"
            >
              <img
                ref={imgRef}
                src={selectedImage}
                alt="Upload"
                className="w-full h-full object-contain"
                style={{
                  maxHeight: '534px',
                  maxWidth: '100%',
                  transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`
                }}
              />
            </ReactCrop>
          </div>

          <div className="flex items-center justify-center h-[72px] gap-6 border border-gray-300 rounded-b-[32px] p-4">
            <button
              onClick={rotateLImage}
              className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
            >
              <Rotation1 size={24} />
            </button>
            <button
              onClick={rotateRImage}
              className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
            >
              <Rotation2 size={24} />
            </button>
            <button
              onClick={flipImageX}
              className="w-14 h-14 flex items-center justify-center text-gray-500 "
            >
              <Horizontal />
            </button>
            <button
              onClick={flipImageY}
              className="w-14 h-14 flex items-center justify-center text-gray-500 "
            >
              <Horizontal rotate={90} />
            </button>
            <div className="w-px h-8 bg-gray-400"></div>
            <button
              onClick={resetImage}
              className="h-10 w-[120px] font-md-semibold px-4 py-2 text-red-500 bg-warning-50 rounded-[12px] flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <ResetIcon color="#FF433C" />
              <span>원본으로</span>
            </button>
          </div>
        </div>
      )}
      <canvas ref={previewCanvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCrop;

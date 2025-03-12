'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Rotation1 from '../../../../public/Icon/Rotation1';
import Rotation2 from '../../../../public/Icon/Rotation2';
import Horizontal from '../../../../public/Icon/Horizontal';
import ResetIcon from '../../../../public/Icon/ResetIcon';

interface ImageCropProps {
  initialImage?: string;
  onCropComplete: (croppedImg: string) => void;
  onClose?: () => void;
  onComplete?: () => void;
}

const ImageCrop = ({ initialImage, onCropComplete }: ImageCropProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });

  // 최종적으로 선택된 크롭 정보
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);

  // 회전, 반전 상태
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropContainerRef = useRef<HTMLDivElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 이미지 초기 로드 시 원본 이미지 정보 설정
  useEffect(() => {
    if (initialImage) {
      setSelectedImage(initialImage);
      setOriginalImage(initialImage);

      const img = new Image();
      img.onload = () => {
        setImageSize({
          width: 0,
          height: 0,
          naturalWidth: img.width,
          naturalHeight: img.height
        });
        setIsImageLoaded(true);
      };
      img.src = initialImage;
    }
  }, [initialImage]);

  // 화면 크기 및 회전 상태에 따라 이미지 크기 업데이트
  useEffect(() => {
    const updateSizes = () => {
      if (cropContainerRef.current && imgRef.current && isImageLoaded) {
        const containerWidth = cropContainerRef.current.clientWidth;
        const containerHeight = cropContainerRef.current.clientHeight;

        const { naturalWidth, naturalHeight } = imageSize;
        const isRotated90or270 = Math.abs(rotation % 180) === 90;

        // 회전을 고려한 이미지 크기 계산
        const imageWidth = isRotated90or270 ? naturalHeight : naturalWidth;
        const imageHeight = isRotated90or270 ? naturalWidth : naturalHeight;
        const imageAspectRatio = imageWidth / imageHeight;

        let width, height;
        const containerAspectRatio = containerWidth / containerHeight;

        if (imageAspectRatio > containerAspectRatio) {
          // 이미지가 컨테이너보다 더 넓은 경우
          width = containerWidth;
          height = containerWidth / imageAspectRatio;
        } else {
          // 이미지가 컨테이너보다 더 높은 경우
          height = containerHeight;
          width = containerHeight * imageAspectRatio;
        }

        setImageSize((prev) => ({
          ...prev,
          width: Math.round(width),
          height: Math.round(height)
        }));

        // 이미지 크기가 변경되면 크롭 영역도 업데이트
        updateCropArea(imageAspectRatio);
      }
    };

    if (isImageLoaded) {
      updateSizes();
    }

    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [
    rotation,
    imageSize.naturalWidth,
    imageSize.naturalHeight,
    isImageLoaded
  ]);

  // 크롭 영역을 업데이트하는 함수
  const updateCropArea = (_aspectRatio: number) => {
    const cropSize = 100; // 기본 크롭 크기 (%)

    // 마지막 completedCrop 정보가 있으면 비율만 유지하면서 위치 조정
    if (completedCrop) {
      // 기존 크롭 영역 중심점 계산
      const centerX = completedCrop.x + completedCrop.width / 2;
      const centerY = completedCrop.y + completedCrop.height / 2;

      // 회전에 따른 새 크기 계산 (단위는 %)
      const newWidth = cropSize;
      const newHeight = cropSize;

      // 새로운 크롭 영역의 왼쪽 상단 좌표 계산
      let x = Math.max(0, centerX - newWidth / 2);
      let y = Math.max(0, centerY - newHeight / 2);

      // 화면 경계를 벗어나지 않도록 조정
      if (x + newWidth > 100) x = 100 - newWidth;
      if (y + newHeight > 100) y = 100 - newHeight;

      setCrop({
        unit: '%',
        width: newWidth,
        height: newHeight,
        x,
        y
      });
    } else {
      // 초기 설정인 경우 중앙에 배치
      setCrop({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0
      });
    }
  };

  // 크롭된 이미지를 캔버스에서 생성
  const cropImage = () => {
    if (!imgRef.current || !completedCrop || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // 원본 이미지에서 크롭할 부분을 계산하기 위한 배율
    const scaleX = imageSize.naturalWidth / image.width;
    const scaleY = imageSize.naturalHeight / image.height;

    let { x, y, width, height } = completedCrop;
    x *= scaleX;
    y *= scaleY;
    width *= scaleX;
    height *= scaleY;

    // 회전 상태에 따른 크롭 좌표 보정
    let newX = x,
      newY = y,
      newWidth = width,
      newHeight = height;
    const isRotated90or270 = Math.abs(rotation % 180) === 90;

    if (rotation === 90) {
      newX = y;
      newY = imageSize.naturalWidth - (x + width);
      newWidth = height;
      newHeight = width;
    } else if (rotation === 180) {
      newX = imageSize.naturalWidth - (x + width);
      newY = imageSize.naturalHeight - (y + height);
    } else if (rotation === 270) {
      newX = imageSize.naturalHeight - (y + height);
      newY = x;
      newWidth = height;
      newHeight = width;
    }

    // 캔버스 크기 설정
    canvas.width = isRotated90or270 ? newHeight : newWidth;
    canvas.height = isRotated90or270 ? newWidth : newHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX, flipY);

    const dx = -newWidth / 2;
    const dy = -newHeight / 2;
    ctx.drawImage(
      image,
      newX,
      newY,
      newWidth,
      newHeight,
      dx,
      dy,
      newWidth,
      newHeight
    );

    ctx.restore();

    // 크롭된 이미지를 Base64로 변환 후 전달
    const croppedImage = canvas.toDataURL('image/png');
    onCropComplete(croppedImage);
  };

  useEffect(() => {
    if (completedCrop) {
      cropImage();
    }
  }, [completedCrop, rotation, flipX, flipY]);

  const rotateLImage = () => {
    const newRotation = (rotation - 90) % 360;
    setRotation(newRotation);
  };

  const rotateRImage = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  const flipImageX = () => setFlipX((prev) => prev * -1);
  const flipImageY = () => setFlipY((prev) => prev * -1);

  const resetImage = () => {
    setSelectedImage(originalImage);
    setRotation(0);
    setFlipX(1);
    setFlipY(1);
    setCompletedCrop(null);

    const naturalAspectRatio = imageSize.naturalWidth / imageSize.naturalHeight;
    updateCropArea(naturalAspectRatio);
  };

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-black overflow-hidden">
      {/* Header */}

      <div className="flex-1 flex flex-col">
        {selectedImage && (
          <div
            ref={cropContainerRef}
            className="relative flex-1 flex items-center justify-center overflow-hidden"
          >
            {isImageLoaded && (
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                className="relative z-20"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              >
                <img
                  ref={imgRef}
                  src={selectedImage || '/placeholder.svg'}
                  alt="Upload"
                  className="object-contain"
                  style={{
                    width:
                      imageSize.width > 0 ? `${imageSize.width}px` : 'auto',
                    height:
                      imageSize.height > 0 ? `${imageSize.height}px` : 'auto',
                    transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
                    transition: 'transform 0.3s ease'
                  }}
                  onLoad={() => {
                    if (imgRef.current) {
                      const naturalAspectRatio =
                        imageSize.naturalWidth / imageSize.naturalHeight;
                      const isRotated90or270 = Math.abs(rotation % 180) === 90;
                      const effectiveRatio = isRotated90or270
                        ? 1 / naturalAspectRatio
                        : naturalAspectRatio;
                      updateCropArea(effectiveRatio);
                    }
                  }}
                />
              </ReactCrop>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center mb-4">
        <button
          className="absolute bottom-[92px] w-[110px] h-[45px] whitespace-nowrap font-sm-semibold bg-warning-50 text-warning-300 px-3  rounded-[16px] flex items-center gap-2"
          onClick={resetImage}
        >
          <ResetIcon color="#FF433C" />
          원본으로
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <div className="absolute bottom-0 w-[208px] h-[56px] bg-white px-4 py-3 rounded-[24px] flex justify-around items-center mb-[24px] gap-6">
          <button onClick={rotateLImage} className="text-gray-500">
            <Rotation1 size={24} />
          </button>
          <button onClick={rotateRImage} className="text-gray-500">
            <Rotation2 size={24} />
          </button>
          <button onClick={flipImageX} className="text-gray-500">
            <Horizontal />
          </button>
          <button onClick={flipImageY} className="text-gray-500">
            <Horizontal rotate={90} />
          </button>
        </div>
      </div>

      <canvas ref={previewCanvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCrop;

import React, { useState, useRef, useEffect } from 'react';
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

  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipX, setFlipX] = useState(1);
  const [flipY, setFlipY] = useState(1);
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    naturalWidth: 0,
    naturalHeight: 0
  });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const cropContainerRef = useRef<HTMLDivElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

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

        const aspectRatio = img.width / img.height;
        setCrop({
          unit: '%',
          width: aspectRatio > 1 ? 50 : 50 / aspectRatio,
          height: aspectRatio > 1 ? 50 * aspectRatio : 50,
          x: (100 - (aspectRatio > 1 ? 50 : 50 / aspectRatio)) / 2,
          y: (100 - (aspectRatio > 1 ? 50 * aspectRatio : 50)) / 2
        });
      };
      img.src = initialImage;
    }
  }, [initialImage]);

  // 컨테이너 및 이미지 크기 업데이트
  useEffect(() => {
    const updateSizes = () => {
      if (cropContainerRef.current && imgRef.current) {
        const container = cropContainerRef.current;
        const img = imgRef.current;

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // 컨테이너 크기와 이미지 원본 비율을 기준으로 이미지 크기 계산
        const { naturalWidth, naturalHeight } = imageSize;
        const naturalAspectRatio = naturalWidth / naturalHeight;

        // 90도/270도 회전 시 비율 반전
        const isRotated90or270 = Math.abs(rotation % 180) === 90;
        const effectiveRatio = isRotated90or270
          ? 1 / naturalAspectRatio
          : naturalAspectRatio;

        // 회전을 고려하여 이미지가 컨테이너에 맞도록 크기 계산
        // 추가 여백을 위해 더 작게 설정 (80%)
        let width, height;
        const scaleFactor = 0.9; // 이미지를 더 작게 표시 (70% 크기)

        if (effectiveRatio > containerWidth / containerHeight) {
          // 가로가 더 긴 경우
          width = containerWidth * scaleFactor;
          height = width / effectiveRatio;
        } else {
          // 세로가 더 긴 경우
          height = containerHeight * scaleFactor;
          width = height * effectiveRatio;
        }

        setImageSize((prev) => ({
          ...prev,
          width: Math.round(width),
          height: Math.round(height)
        }));
      }
    };

    updateSizes();

    // 회전이 변경될 때마다 크기 업데이트
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [
    rotation,
    imageSize.naturalWidth,
    imageSize.naturalHeight,
    cropContainerRef.current
  ]);

  const cropImage = () => {
    if (!imgRef.current || !completedCrop || !previewCanvasRef.current) return;

    const canvas = previewCanvasRef.current;
    const image = imgRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // 원본 이미지에서 크롭할 부분을 계산하기 위한 배율
    const scaleX = imageSize.naturalWidth / image.width;
    const scaleY = imageSize.naturalHeight / image.height;

    // 기존 크롭 영역을 원본 이미지 기준으로 변환
    let { x, y, width, height } = completedCrop;
    x *= scaleX;
    y *= scaleY;
    width *= scaleX;
    height *= scaleY;

    // 90도, 180도, 270도 회전 시 크롭 영역 보정
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

    // 캔버스 배경을 흰색으로 설정
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 회전 적용
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipX, flipY);

    // drawImage의 좌표를 보정
    let dx = -newWidth / 2;
    let dy = -newHeight / 2;
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
    cropImage();
  }, [completedCrop, rotation, flipX, flipY]);

  const rotateLImage = () => {
    setRotation((prev) => (prev - 90) % 360); // 왼쪽 회전은 -90도

    // 회전 후 크롭 영역 재조정을 위한 타이머 설정
    setTimeout(() => {
      if (imgRef.current) {
        const naturalAspectRatio =
          imageSize.naturalWidth / imageSize.naturalHeight;

        // 회전 방향에 따라 가로/세로 비율 조정
        const isRotated90or270 = Math.abs((rotation - 90) % 180) === 0;
        const rotatedAspectRatio = isRotated90or270
          ? 1 / naturalAspectRatio
          : naturalAspectRatio;

        // 크롭 재설정
        setCrop({
          unit: '%',
          width: rotatedAspectRatio > 1 ? 50 : 50 / rotatedAspectRatio,
          height: rotatedAspectRatio > 1 ? 50 * rotatedAspectRatio : 50,
          x:
            (100 - (rotatedAspectRatio > 1 ? 50 : 50 / rotatedAspectRatio)) / 2,
          y: (100 - (rotatedAspectRatio > 1 ? 50 * rotatedAspectRatio : 50)) / 2
        });
      }
    }, 50);
  };

  const rotateRImage = () => {
    setRotation((prev) => (prev + 90) % 360); // 오른쪽 회전은 +90도

    // 회전 후 크롭 영역 재조정을 위한 타이머 설정
    setTimeout(() => {
      if (imgRef.current) {
        const naturalAspectRatio =
          imageSize.naturalWidth / imageSize.naturalHeight;

        // 회전 방향에 따라 가로/세로 비율 조정
        const isRotated90or270 = Math.abs((rotation + 90) % 180) === 0;
        const rotatedAspectRatio = isRotated90or270
          ? 1 / naturalAspectRatio
          : naturalAspectRatio;

        // 크롭 재설정
        setCrop({
          unit: '%',
          width: rotatedAspectRatio > 1 ? 50 : 50 / rotatedAspectRatio,
          height: rotatedAspectRatio > 1 ? 50 * rotatedAspectRatio : 50,
          x:
            (100 - (rotatedAspectRatio > 1 ? 50 : 50 / rotatedAspectRatio)) / 2,
          y: (100 - (rotatedAspectRatio > 1 ? 50 * rotatedAspectRatio : 50)) / 2
        });
      }
    }, 50);
  };

  const flipImageX = () => setFlipX((prev) => prev * -1);
  const flipImageY = () => setFlipY((prev) => prev * -1);

  const resetImage = () => {
    setSelectedImage(originalImage);
    setRotation(0);
    setFlipX(1);
    setFlipY(1);

    // 원본 이미지에 맞게 크롭 영역 재설정
    const naturalAspectRatio = imageSize.naturalWidth / imageSize.naturalHeight;
    setCrop({
      unit: '%',
      width: naturalAspectRatio > 1 ? 50 : 50 / naturalAspectRatio,
      height: naturalAspectRatio > 1 ? 50 * naturalAspectRatio : 50,
      x: (100 - (naturalAspectRatio > 1 ? 50 : 50 / naturalAspectRatio)) / 2,
      y: (100 - (naturalAspectRatio > 1 ? 50 * naturalAspectRatio : 50)) / 2
    });
  };

  return (
    <div className="flex flex-col items-center">
      {selectedImage && (
        <div className="relative w-[960px] pt-8">
          <h3 className="py-[12px] text-white bg-gray-800 text-center h-[54px] rounded-t-[32px]">
            세금계산서가 잘 보이도록 사진을 편집해주세요.
          </h3>
          <div
            ref={cropContainerRef}
            className="relative border-none border-gray-300 overflow-hidden text-center h-[534px] flex items-center justify-center bg-white"
            style={{
              position: 'relative',
              backgroundColor: 'white'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 pointer-events-none"></div>

            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              className="relative z-20"
              style={{ backgroundColor: 'white' }}
            >
              <img
                ref={imgRef}
                src={selectedImage}
                alt="Upload"
                className="object-contain"
                style={{
                  width: imageSize.width > 0 ? `${imageSize.width}px` : 'auto',
                  height:
                    imageSize.height > 0 ? `${imageSize.height}px` : 'auto',
                  transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
                  transition: 'transform 0.2s ease'
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

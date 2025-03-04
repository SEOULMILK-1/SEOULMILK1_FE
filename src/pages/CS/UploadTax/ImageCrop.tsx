// import { useState, useRef } from 'react';
// import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import Rotation1 from '../../../../public/Icon/Rotation1';
// import Rotation2 from '../../../../public/Icon/Rotation2';
// import Horizontal from '../../../../public/Icon/Horizontal';
// import ResetIcon from '../../../../public/Icon/ResetIcon';

// interface ImageCropProps {
//   onCropComplete: (croppedImg: string) => void;
// }

// const ImageCrop: React.FC<ImageCropProps> = ({ onCropComplete }) => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [originalImage, setOriginalImage] = useState<string | null>(null); // ✅ 원본 복원용
//   const [crop, setCrop] = useState<Crop>({
//     unit: '%',
//     width: 50,
//     height: 50,
//     x: 25,
//     y: 25
//   });
//   const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
//   const [rotation, setRotation] = useState(0); // ✅ 회전 상태
//   const [flipX, setFlipX] = useState(1); // ✅ 좌우 반전
//   const [flipY, setFlipY] = useState(1); // ✅ 상하 반전
//   const imgRef = useRef<HTMLImageElement | null>(null);
//   const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

//   // ✅ 이미지 업로드 핸들러
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setSelectedImage(reader.result as string);
//         setOriginalImage(reader.result as string); // ✅ 원본 저장
//       };
//     }
//   };

//   // ✅ 캔버스에서 이미지 크롭
//   const cropImage = () => {
//     if (!imgRef.current || !completedCrop || !previewCanvasRef.current) return;

//     const canvas = previewCanvasRef.current;
//     const image = imgRef.current;
//     const ctx = canvas.getContext('2d');

//     if (!ctx) return;
//     const { width, height, x, y } = completedCrop;

//     canvas.width = width;
//     canvas.height = height;

//     //  회전 및 반전 적용
//     ctx.save();
//     ctx.translate(canvas.width / 2, canvas.height / 2);
//     ctx.rotate((rotation * Math.PI) / 180);
//     ctx.scale(flipX, flipY);
//     ctx.drawImage(
//       image,
//       x - canvas.width / 2,
//       y - canvas.height / 2,
//       width,
//       height
//     );
//     ctx.restore();

//     //  크롭된 이미지를 Base64로 변환하여 전달
//     const croppedImage = canvas.toDataURL('image/png');
//     onCropComplete(croppedImage);
//   };

//   // 회전
//   const rotateLImage = () => {
//     setRotation((prev) => (prev + 90) % 360);
//   };
//   const rotateRImage = () => {
//     setRotation((prev) => (prev - 90) % 360);
//   };

//   // 좌우 반전
//   const flipImageX = () => {
//     setFlipX((prev) => prev * -1);
//   };

//   // 상하 반전
//   const flipImageY = () => {
//     setFlipY((prev) => prev * -1);
//   };

//   //  원본 복원
//   const resetImage = () => {
//     setSelectedImage(originalImage);
//     setRotation(0);
//     setFlipX(1);
//     setFlipY(1);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="mb-4"
//       />

//       {selectedImage && (
//         <div className="relative w-[960px]">
//           <h3 className="py-[12px] font-2xl-semibold  text-white bg-gray-800 text-center  h-[54px] rounded-t-[32px]">
//             세금계산서가 잘 보이도록 사진을 편집해주세요.
//           </h3>
//           <div className="relative border-2  border-gray-300 rounded-md overflow-hidden text-center">
//             {/* ReactCrop을 사용 */}
//             <ReactCrop
//               crop={crop}
//               onChange={(c) => setCrop(c)}
//               onComplete={(c) => setCompletedCrop(c)}
//             >
//               <img
//                 ref={imgRef}
//                 src={selectedImage}
//                 alt="Upload"
//                 className="max-w-full"
//                 style={{
//                   transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`
//                 }}
//               />
//             </ReactCrop>
//           </div>

//           <div className="flex items-center justify-center h-[72px] gap-6 border border-gray-300 rounded-b-[32px] p-4">
//             <button
//               onClick={rotateLImage}
//               className="w-14 h-14 flex flex-col items-center justify-center text-gray-500 rounded-full"
//             >
//               <Rotation1 size={24} />
//             </button>

//             <button
//               onClick={rotateRImage}
//               className="w-14 h-14 flex flex-col items-center justify-center text-gray-500 rounded-full"
//             >
//               <Rotation2 size={24} />
//             </button>

//             <button
//               onClick={flipImageX}
//               className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
//             >
//               <Horizontal />
//             </button>

//             <button
//               onClick={flipImageY}
//               className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
//             >
//               <Horizontal />
//             </button>

//             <div className="w-px h-8 bg-gray-400"></div>

//             <button
//               onClick={resetImage}
//               className="h-10 font-xs-semibold px-4 py-2 flex items-center justify-center gap-2 text-red-500 rounded-md bg-red-100 "
//             >
//               <ResetIcon />
//               원본으로
//             </button>
//           </div>
//         </div>
//       )}

//       {selectedImage && (
//         <>
//           <canvas ref={previewCanvasRef} style={{ display: 'none' }}></canvas>
//           <button
//             onClick={cropImage}
//             className="bg-green-600 text-white px-6 py-2 rounded-md mt-4"
//           >
//             자르기 적용
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageCrop;

import { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Rotation1 from '../../../../public/Icon/Rotation1';
import Rotation2 from '../../../../public/Icon/Rotation2';
import Horizontal from '../../../../public/Icon/Horizontal';
import ResetIcon from '../../../../public/Icon/ResetIcon';

interface ImageCropProps {
  onCropComplete: (croppedImg: string) => void;
}

const ImageCrop: React.FC<ImageCropProps> = ({ onCropComplete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
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

  // ✅ 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setOriginalImage(reader.result as string);
      };
    }
  };

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

    ctx.drawImage(
      image,
      realX,
      realY,
      realWidth,
      realHeight,
      0,
      0,
      realWidth,
      realHeight
    );

    const croppedImage = canvas.toDataURL('image/png');
    onCropComplete(croppedImage);
  };

  // ✅ 크롭 완료 시 자동으로 이미지 업데이트
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

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {selectedImage && (
        <div className="relative w-[960px]">
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
              className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
            >
              <Horizontal />
            </button>
            <button
              onClick={flipImageY}
              className="w-14 h-14 flex items-center justify-center text-gray-500 rounded-full"
            >
              <Horizontal />
            </button>
            <div className="w-px h-8 bg-gray-400"></div>
            <button
              onClick={resetImage}
              className="h-10 px-4 py-2 text-red-500 bg-red-100 rounded-md"
            >
              <ResetIcon />
              원본으로
            </button>
          </div>
        </div>
      )}
      <canvas ref={previewCanvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageCrop;

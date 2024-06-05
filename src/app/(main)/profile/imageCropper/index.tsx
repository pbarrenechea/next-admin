import { CircleX, Eraser } from 'lucide-react';
import { useRef, useState } from 'react';
import { Crop, PixelCrop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { canvasPreview, centerAspectCrop } from '@/lib/canvas';
import { useDebounceEffect } from '@/lib/useDebounceEffect';

const ImageCropper = ({ initialImage, onSave }: { initialImage?: string; onSave: (image: string) => void }) => {
  /* State configuration */
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [imgSrc, setImgSrc] = useState<string>(initialImage || '');
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isLoading, setIsLoading] = useState(false);
  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, 0);
      }
    },
    100,
    [completedCrop],
  );
  /* Generate image from canvas */
  const generate = async () => {
    setIsLoading(true);
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const offscreen = new OffscreenCanvas(completedCrop.width * scaleX, completedCrop.height * scaleY);
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }
    ctx.drawImage(previewCanvas, 0, 0, previewCanvas.width, previewCanvas.height, 0, 0, 150, 150);
    await onSave(previewCanvas.toDataURL());
    setIsLoading(false);
  };
  /* Initial load of the image */
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  };
  /* Listen to changes when the image src changes */
  const onChangeSrc = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCrop(undefined); // Makes crop preview update between images.
      setImgSrc(e.target.value);
    }
  };

  return (
    <>
      <div className="items-center flex flex-col">
        <div className="w-[80%]">
          <Input type="text" onChange={onChangeSrc} value={imgSrc} className="w-[90%] inline-flex" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className=" inline-flex h-6 w-6 border-0 p-0 ml-1"
                onClick={() => setImgSrc('')}
              >
                <Eraser />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-xs text-red-500">Clear</span>
            </TooltipContent>
          </Tooltip>
        </div>
        {!!imgSrc && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              minHeight={100}
              className="flex mt-4 mb-4"
            >
              <img
                ref={imgRef}
                crossOrigin="anonymous"
                src={imgSrc}
                style={{ transform: `scale(1) rotate(0deg)`, width: '250px', height: '250px' }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            {!!completedCrop && (
              <>
                <div>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      display: 'none',
                      border: '1px solid black',
                      objectFit: 'contain',
                      width: completedCrop.width,
                      height: completedCrop.height,
                    }}
                  />
                </div>
              </>
            )}
            <Button variant="outline" onClick={generate} disabled={isLoading}>
              Save
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default ImageCropper;

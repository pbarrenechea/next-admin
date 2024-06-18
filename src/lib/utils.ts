import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const createImageFromInitials = (size: number, letter: string | undefined) => {
  if (!letter || typeof window === 'undefined') {
    return null;
  }
  const color = getRandomColor();
  const canvas = document.createElement('canvas');
  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  if (!context) {
    return null;
  }
  canvas.width = canvas.height = size;

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, size, size);

  context.fillStyle = `${color}50`;
  context.fillRect(0, 0, size, size);

  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.font = `${size / 2}px Arial`;
  context.fillText(letter, size / 2, size / 2);

  return canvas.toDataURL();
};

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

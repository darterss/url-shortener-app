import { randomBytes } from 'crypto';

// Кастомный алфавит base62
const BASE62_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateBase62Id(size: number): string {
  const max = BigInt('0x' + 'f'.repeat(size * 2)); // Диапазон случайного bigint
  const randomBigInt = randomBigIntBetween(BigInt(0), max); // Случайный bigint

  return toBase62(randomBigInt); // Конвертация в строку base62
}

// Генерация случайного числа в диапазоне
function randomBigIntBetween(min: bigint, max: bigint): bigint {
  const range = max - min;
  const length = (range.toString(16).length + 1) >> 1; // Длина в байтах
  let randomBigInt: bigint;

  do {
    const randomBytesBuffer = randomBytes(length); // Генерация случайных байт
    const hex = Array.from(randomBytesBuffer).map(b => b.toString(16).padStart(2, '0')).join('');
    randomBigInt = BigInt('0x' + hex);
  } while (randomBigInt > range); // Повтор, если вышли за диапазон

  return min + randomBigInt;
}

// Правильная конвертация BigInt в Base62
function toBase62(num: bigint): string {
  if (num === BigInt(0)) return BASE62_ALPHABET[0];
  let result = '';
  const base = BigInt(BASE62_ALPHABET.length);
  while (num > 0) {
    const remainder = num % base;
    result = BASE62_ALPHABET[Number(remainder)] + result;
    num = num / base;
  }
  return result;
}

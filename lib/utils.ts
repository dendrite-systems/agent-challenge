export const generateInt8Id = () => {
  // Define the min and max range for int8 (signed 64-bit integer)
  const min = BigInt(0);
  const max = BigInt(2 ** 63 - 1);

  // Generate a random BigInt in the range [min, max]
  const randomInt8 =
    min + BigInt(Math.floor(Math.random() * Number(max - min)));

  return randomInt8;
};

export const isProduction = () =>
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

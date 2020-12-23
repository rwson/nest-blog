import { createHash, Hash } from 'crypto';

const getFileMd5 = (buffer: Buffer): string => {
  const hash: Hash = createHash('md5');
  hash.update(buffer);

  return hash.digest('hex');
};

export default getFileMd5;

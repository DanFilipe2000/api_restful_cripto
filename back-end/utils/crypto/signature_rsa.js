import crypto from 'node:crypto';

function modPow(base, exp, mod) {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
}

export function mgf1(seed, nBytes, hashFunc = 'sha3-256') {
  const hashLen = crypto.createHash(hashFunc).digest().length;
  let mask = Buffer.alloc(0);
  let counter = 0;
  while (mask.length < nBytes) {
    const c = Buffer.alloc(4);
    c.writeUInt32BE(counter++, 0);
    const hash = crypto.createHash(hashFunc).update(Buffer.concat([seed, c])).digest();
    mask = Buffer.concat([mask, hash]);
  }
  return mask.slice(0, nBytes);
}

export function oaepPad(messageBytes, label, nBits = 1024) {
  const nBytes = nBits / 8;
  const hashLen = crypto.createHash('sha3-256').digest().length;
  const mLen = messageBytes.length;
  if (mLen > nBytes - 2 * hashLen - 1) throw new Error("Too long message for OAEP");

  const lHash = crypto.createHash('sha3-256').update(label).digest();
  const ps = Buffer.alloc(nBytes - mLen - 2 * hashLen - 2, 0);
  const db = Buffer.concat([lHash, ps, Buffer.from([1]), messageBytes]);
  const seed = crypto.randomBytes(hashLen);
  const dbMask = mgf1(seed, nBytes - hashLen - 1);
  const maskedDB = Buffer.from(db.map((b, i) => b ^ dbMask[i]));
  const seedMask = mgf1(maskedDB, hashLen);
  const maskedSeed = Buffer.from(seed.map((b, i) => b ^ seedMask[i]));
  return Buffer.concat([Buffer.from([0]), maskedSeed, maskedDB]);
}

export function oaepUnpad(paddedMessageBytes, label, nBits = 1024) {
  const nBytes = nBits / 8;
  const hashLen = crypto.createHash('sha3-256').digest().length;

  if (paddedMessageBytes.length !== nBytes) throw new Error("Invalid message size");

  const y = paddedMessageBytes[0];
  const maskedSeed = paddedMessageBytes.slice(1, 1 + hashLen);
  const maskedDB = paddedMessageBytes.slice(1 + hashLen);
  if (y !== 0) throw new Error("Invalid padding");

  const seedMask = mgf1(maskedDB, hashLen);
  const seed = Buffer.from(maskedSeed.map((b, i) => b ^ seedMask[i]));
  const dbMask = mgf1(seed, nBytes - hashLen - 1);
  const db = Buffer.from(maskedDB.map((b, i) => b ^ dbMask[i]));
  const lHash = crypto.createHash('sha3-256').update(label).digest();
  if (!db.slice(0, hashLen).equals(lHash)) throw new Error("Incorrect label");

  const index = db.indexOf(1, hashLen);
  if (index === -1) throw new Error("Delimiter not found");
  return db.slice(index + 1);
}

export function encryptRSA(messageBytes, key, nBits = 1024) {
  const m = BigInt('0x' + messageBytes.toString('hex'));
  const c = modPow(m, key[0], key[1]);
  return Buffer.from(c.toString(16).padStart((nBits * 2) / 4, '0'), 'hex');
}

export function decryptRSA(messageBytes, key, nBits = 1024) {
  const m = BigInt('0x' + messageBytes.toString('hex'));
  const c = modPow(m, key[0], key[1]);
  return Buffer.from(c.toString(16).padStart(nBits / 4, '0'), 'hex');
}
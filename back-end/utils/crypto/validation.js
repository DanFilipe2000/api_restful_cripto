// validation.js
import crypto from 'node:crypto';
import { oaepPad, oaepUnpad, encryptRSA, decryptRSA } from './signature_rsa.js';

export function calculateHash(message) {
  return crypto.createHash('sha3-256').update(message).digest();
}

const LABEL = Buffer.alloc(0);
const N_BITS = 32; // ou 1024, conforme o tamanho da chave

export function signMessage(message, privateKey) {
  const messageHash = calculateHash(message);
  const padded = oaepPad(messageHash, LABEL, N_BITS);
  const encrypted = encryptRSA(padded, privateKey, N_BITS);
  return encrypted.toString('base64');
}

export function verifyMessage(message, signature, publicKey) {
  const signatureBytes = Buffer.from(signature, 'base64');
  const decrypted = decryptRSA(signatureBytes, publicKey, N_BITS);
  const unpadded = oaepUnpad(decrypted, LABEL, N_BITS);
  const messageHash = calculateHash(message);
  return unpadded.equals(messageHash);
}

import crypto from 'node:crypto';

console.log("🔐 Gerando chaves RSA...");
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
console.log("🔑 Chave Pública:", publicKey);
console.log("🔐 Chave Privada:", privateKey);

const mensagem = "mensagem confidencial";
console.log("📄 Mensagem:", mensagem);

// Assinatura
const assinatura = crypto.sign('sha256', Buffer.from(mensagem), {
  key: privateKey,
  padding: crypto.constants.RSA_PKCS1_PSS_PADDING
}).toString('base64');
console.log("✍️  Assinatura (base64):", assinatura);

// Verificação
const valida = crypto.verify(
  'sha256',
  Buffer.from(mensagem),
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING
  },
  Buffer.from(assinatura, 'base64')
);
console.log("✅ Assinatura válida?", valida);
// scripts/sign.js
// Função para assinar o payload antes de enviar para a API
// Exemplo usando HMAC SHA256 (ajuste conforme sua lógica de backend)


// Assina o payload usando a chave privada RSA do usuário (PEM base64 em localStorage)
export async function signPayload(payload) {
  const privateKeyPem = localStorage.getItem('private_key');
  if (!privateKeyPem) throw new Error('Chave privada não encontrada');
  // Remove headers/footers e quebras de linha
  const pem = privateKeyPem.replace(/-----[^-]+-----|\s+/g, '');
  const binaryDer = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await window.crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(payload));
  const signature = await window.crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' },
    key,
    data
  );
  const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return signatureBase64;
}

const crypto = require('crypto');

// Função para gerar número aleatório com n bits
function getRandomBigInt(bits) {
  const bytes = Math.ceil(bits / 8);
  let randomBytes = crypto.randomBytes(bytes);
  let randomBigInt = BigInt('0x' + randomBytes.toString('hex'));
  // Garante que tenha exatamente o número de bits solicitado
  return randomBigInt | (1n << BigInt(bits - 1));
}

// Função para gerar número aleatório entre min e max (inclusive)
function randomBetween(min, max) {
  const range = max - min + 1n;
  const bits = range.toString(2).length;
  let x;
  do {
    x = getRandomBigInt(bits);
  } while (x < min || x > max);
  return x;
}

// Teste de Miller-Rabin
function millerRabinTest(n, k = 5) {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;

  let s = 0n;
  let d = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    s += 1n;
  }

  for (let i = 0; i < k; i++) {
    const a = randomBetween(2n, n - 2n);
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let continueOuter = false;
    for (let r = 0n; r < s - 1n; r++) {
      x = modPow(x, 2n, n);
      if (x === 1n) return false;
      if (x === n - 1n) {
        continueOuter = true;
        break;
      }
    }

    if (!continueOuter) return false;
  }

  return true;
}

// Exponenciação modular: (base^exp) % mod
function modPow(base, exp, mod) {
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    base = (base * base) % mod;
    exp /= 2n;
  }
  return result;
}

// Geração de número primo grande
function genLargePrime(bits = 1024) {
  while (true) {
    const candidate = getRandomBigInt(bits) | 1n; // força ser ímpar
    if (millerRabinTest(candidate, 5)) return candidate;
  }
}

// Máximo divisor comum (GCD)
function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Gera número coprimo com n
function genCoprime(n) {
  while (true) {
    const e = randomBetween(2n, n - 1n);
    if (gcd(e, n) === 1n) return e;
  }
}

// Inverso modular (a⁻¹ mod m)
function modInverse(a, m) {
  let m0 = m, x0 = 0n, x1 = 1n;
  while (a > 1n) {
    const q = a / m;
    [a, m] = [m, a % m];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0n) x1 += m0;
  return x1;
}

// Geração de chaves RSA
function genKeys(bits = 1024) {
  const p = genLargePrime(bits);
  const q = genLargePrime(bits);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  const e = genCoprime(phi);
  const d = modInverse(e, phi);
  return {
    publicKey: { e, n },
    privateKey: { d, n }
  };
}

module.exports = { genKeys };
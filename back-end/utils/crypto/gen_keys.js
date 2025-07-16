import crypto from 'crypto';

function millerRabinTest(n, k) {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0) return false;

  let s = 0;
  let d = n - 1;
  while (d % 2 === 0) {
    d = Math.floor(d / 2);
    s += 1;
  }

  for (let i = 0; i < k; i++) {
    const a = BigInt(2 + Math.floor(Math.random() * (n - 3)));
    let x = modPow(a, BigInt(d), BigInt(n));
    if (x === 1n || x === BigInt(n - 1)) continue;

    let continueOuter = false;
    for (let j = 0; j < s - 1; j++) {
      x = modPow(x, 2n, BigInt(n));
      if (x === 1n) return false;
      if (x === BigInt(n - 1)) {
        continueOuter = true;
        break;
      }
    }
    if (!continueOuter) return false;
  }
  return true;
}

function modPow(base, exp, mod) {
  let result = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp >> 1n;
    base = (base * base) % mod;
  }
  return result;
}

function genLargePrime(bits = 1024) {
  while (true) {
    const buf = crypto.randomBytes(bits / 8);
    const n = BigInt('0x' + buf.toString('hex'));
    if (millerRabinTest(Number(n), 5)) return n;
  }
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function genCoprime(n) {
  let e;
  do {
    e = Math.floor(Math.random() * (n - 2)) + 2;
  } while (gcd(e, n) !== 1);
  return BigInt(e);
}

function modInverse(e, phi) {
  let [a, b] = [phi, e];
  let [x0, x1] = [0n, 1n];
  while (b !== 0n) {
    const q = a / b;
    [a, b] = [b, a % b];
    [x0, x1] = [x1, x0 - q * x1];
  }
  return x0 < 0n ? x0 + phi : x0;
}

export function genKeys(bits = 1024, pInput = null, qInput = null) {
  const p = pInput || genLargePrime(bits);
  const q = qInput || genLargePrime(bits);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  const e = genCoprime(Number(phi));
  const d = modInverse(e, phi);
  return { publicKey: [e, n], privateKey: [d, n] };
}
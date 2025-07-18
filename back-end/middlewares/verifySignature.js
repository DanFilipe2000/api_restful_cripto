// Middleware para validar assinatura RSA no header 'x-signature' e payload no body
const crypto = require('crypto');
const User = require('../database/models/user');

async function verifySignature(req, res, next) {
    if (req.method === 'GET') {
        return next();
    }

    try {
        const signature = req.headers['x-signature'];
        if (!signature) {
            return res.status(401).json({ message: 'Assinatura não fornecida' });
        }
        const { user_id, payload } = req.body;
        if (!user_id || !payload) {
            return res.status(400).json({ message: 'user_id e payload são obrigatórios' });
        }
        // Busca a chave pública do usuário
        const user = await User.findById(user_id);
        if (!user || !user.public_key) {
            return res.status(401).json({ message: 'Usuário ou chave pública não encontrada' });
        }
        // Verifica assinatura
        const isValid = crypto.verify(
            'sha256',
            Buffer.from(JSON.stringify(payload)),
            {
                key: user.public_key,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(signature, 'base64')
        );
        if (!isValid) {
            return res.status(401).json({ message: 'Assinatura inválida' });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Erro ao validar assinatura', error: err.message });
    }
}

module.exports = verifySignature;
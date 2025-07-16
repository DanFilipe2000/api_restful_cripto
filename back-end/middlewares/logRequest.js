const fs = require('fs');
const path = require('path');

function logRequest(req, res, next) {
  const logPath = path.join(__dirname, '../logs/requests.txt');
  const logEntry = {
    time: new Date().toISOString(),
    headers: req.headers,
    body: req.body
  };
  const logLine = JSON.stringify(logEntry) + '\n';
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  fs.appendFile(logPath, logLine, err => {
    if (err) console.error('Erro ao salvar log:', err);
  });
  next();
}

module.exports = logRequest;

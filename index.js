'use strict';

require('dotenv').config();
require('./instrumentation');

const express = require('express');
const { logs, SeverityNumber } = require('@opentelemetry/api-logs');

const app = express();
const logger = logs.getLogger('ngb-agent-dispatcher');
const PORT = process.env.PORT;

if (!PORT) {
  console.error('ERROR: PORT environment variable is required');
  process.exit(1);
}

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/webhooks/jira', (req, res) => {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: 'Received Jira webhook',
    attributes: { 'webhook.body': JSON.stringify(req.body) },
  });

  res.status(202).json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

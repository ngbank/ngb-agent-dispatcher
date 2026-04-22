import 'dotenv/config';
import './instrumentation';

import express, { Request, Response } from 'express';
import { logs, SeverityNumber } from '@opentelemetry/api-logs';

const app = express();
const logger = logs.getLogger('ngb-agent-dispatcher');
const PORT = process.env.PORT;

if (!PORT) {
  console.error('ERROR: PORT environment variable is required');
  process.exit(1);
}

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.post('/webhooks/jira', (req: Request, res: Response) => {
  logger.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: 'Received Jira webhook',
    attributes: {
      'webhook.body': JSON.stringify(req.body),
      'http.request.headers': JSON.stringify(req.headers),
    },
  });

  res.status(202).json({ received: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

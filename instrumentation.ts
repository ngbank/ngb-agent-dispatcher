import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleLogRecordExporter, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs';

const sdk = new NodeSDK({
  logRecordProcessors: [
    new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
  ],
});

sdk.start();

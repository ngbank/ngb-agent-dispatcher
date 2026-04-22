'use strict';

const { NodeSDK } = require('@opentelemetry/sdk-node');
const { ConsoleLogRecordExporter, SimpleLogRecordProcessor } = require('@opentelemetry/sdk-logs');

const sdk = new NodeSDK({
  logRecordProcessors: [
    new SimpleLogRecordProcessor(new ConsoleLogRecordExporter()),
  ],
});

sdk.start();

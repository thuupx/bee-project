import {LogEntry, logLevel} from 'kafkajs'
import {omit} from 'lodash'

import {KAFKA_LOG_LEVEL_MAP} from '../constants'
import {ServiceName} from '../enums'
import {LoggerService} from '../logger'

export const KafkaLogger =
  (clientToken: ServiceName, logger: LoggerService, postfix = 'ServerKafka') =>
  (logLevel: logLevel) =>
  (entry: LogEntry) => {
    const namespace = entry.namespace ? `[${entry.namespace}] - ` : ''

    const context = `${clientToken}_${postfix}`

    const log = JSON.stringify(omit(entry.log, ['message']))

    const message = namespace + entry.log.message + '\n' + log

    const logFn = KAFKA_LOG_LEVEL_MAP[logLevel]

    if (logFn !== 'error') {
      logger[logFn](message, context)
    } else {
      logger.error(message, entry.log?.stack, context)
    }
  }

import {LoggerService} from '@bee-project/core'
import {LogEntry, logLevel} from 'kafkajs'
import {omit} from 'lodash'

import {KAFKA_LOG_LEVEL_MAP} from '../constants'
import {ClientToken} from '../enums'

export const KafkaLogger =
  (clientToken: ClientToken, logger: LoggerService, postfix = 'ServerKafka') =>
  (logLevel: logLevel) =>
  (entry: LogEntry) => {
    const namespace = entry.namespace ? `[${entry.namespace}] - ` : ''

    const context = `${clientToken}_${postfix}`

    const log = JSON.stringify(omit(entry.log, ['message']))

    const message = namespace + entry.log.message + '\n' + log

    logger[KAFKA_LOG_LEVEL_MAP[logLevel]](message, context)
  }

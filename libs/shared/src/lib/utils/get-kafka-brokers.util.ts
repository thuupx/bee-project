import {config} from 'dotenv'

config()

export const getKafkaBrokers = () => {
  const brokersString = process.env.KAFKA_BROKERS

  if (!brokersString) {
    console.warn(`Missing KAFKA_BROKERS env variable`)
  }

  const brokers = brokersString?.split(',')?.filter(Boolean)

  return brokers || ['localhost:9094']
}

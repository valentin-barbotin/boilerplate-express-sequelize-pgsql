import Joi from 'joi'
import { config } from 'dotenv'
import Logger from './logger'
config()

const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(3001),
  HOST: Joi.string().required().default('0.0.0.0'),
  DATABASE_HOST: Joi.string().required().default('localhost'),
  DATABASE_USER: Joi.string().required().default('postgres'),
  DATABASE_PORT: Joi.string().required().default('5432'),
  DATABASE_PASSWORD: Joi.string().required().default('postgres'),
  DATABASE_DATABASE: Joi.string().required().default('postgres'),
})

export class Config {
  private static _instance: Config

  private static get instance (): Config {
    return Config._instance || (Config._instance = new Config())
  }

  static get env (): EnvironmentVariables {
    return {
      PORT: process.env.PORT ? parseInt(process.env.PORT) : 3001,
      HOST: process.env.HOST || '0.0.0.0',
      NODE_ENV: process.env.NODE_ENV || 'development',
      DATABASE_HOST: process.env.DATABASE_HOST || 'localhost',
      DATABASE_USER: process.env.DATABASE_USER || 'postgres',
      DATABASE_PORT: process.env.DATABASE_PORT || '5432',
      DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'postgres',
      DATABASE_DATABASE: process.env.DATABASE_DATABASE || 'postgres',
    }
  }

  static validate (): void {
    Logger.info('Validating config')
    const { error } = configValidationSchema.validate(Config.env)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
  }
}

export interface EnvironmentVariables {
    NODE_ENV: string
    PORT: number
    HOST: string
  
    DATABASE_HOST: string
    DATABASE_USER: string
    DATABASE_PORT: string
    DATABASE_PASSWORD: string
    DATABASE_DATABASE: string
  };
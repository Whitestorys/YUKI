import fs from 'fs'
import yaml from 'js-yaml'
import logger from './logger'

export default class Config {
  constructor(filename) {
    this.filename = filename
    this._config = null
    this.load()
  }

  load() {
    try {
      this._config = yaml.safeLoad(fs.readFileSync(this.filename, 'utf8'))
      logger.debug(`config loaded: `)
      logger.debug(this._config)
    } catch (e) {
      let err = new Error(`config file ${this.filename} load failed`)
      logger.error(err)
    }
  }

  save() {
    try {
      fs.writeFileSync(this.filename, yaml.safeDump(this._config), 'utf8')
      logger.debug(`config saved: `)
      logger.debug(this._config)
    } catch (e) {
      logger.error(`config file ${this.filename} save failed`)
      logger.error(e)
    }
  }

  get() {
    return this._config
  }

  set(cfg) {
    this._config = cfg
  }
}
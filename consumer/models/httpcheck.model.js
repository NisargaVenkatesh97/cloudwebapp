import { DataTypes, Model } from 'sequelize'

export default class HttpCheck extends Model {}

export const attributes = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  http_check_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  uri: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  // is_paused: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  // },
  num_retries: {
    type: DataTypes.INTEGER,
    allowNull: false,
    min: 1,
    max: 5,
  },
  // uptime_sla: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   min: 0,
  //   max: 100,
  // },
  // response_time_sla: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   min: 0,
  //   max: 100,
  // },
  // use_ssl: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  // },
  response_status_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 200,
  },
  // check_interval_in_seconds: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   min: 1,
  //   max: 86400,
  // },
  check_created: DataTypes.DATE,
  check_updated: DataTypes.DATE,
}

export const options = {
  tableName: 'httpchecks',
  timestamps: true,
  createdAt: 'check_created',
  updatedAt: 'check_updated',
}

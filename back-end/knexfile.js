/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL="postgres://igbqkrgn:jT_vOcrz25y3EY6vsbjjSB5l7lALPRCb@peanut.db.elephantsql.com/igbqkrgn",
  DATABASE_URL_DEVELOPMENT="postgres://xofpepdj:1b8sR2SH_Kf7wsprHvZGiEh5SkNORPjx@peanut.db.elephantsql.com/xofpepdj",
  DATABASE_URL_TEST="postgres://hmbyhhru:grosAlEGf02fi0Ixsaw0eLUZ3Ebz7PP7@peanut.db.elephantsql.com/hmbyhhru",
  DATABASE_URL_PREVIEW="postgres://zaawmtfn:Sz9xgF1f6Ox8Hq4L0IENeFLHkpdYY1s8@peanut.db.elephantsql.com/zaawmtfn",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};

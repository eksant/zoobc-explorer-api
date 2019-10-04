const cron = require('cron');
const moment = require('moment');

const config = require('../config/config');
const Controllers = require('./Controllers');
const { msg } = require('../utils');

const controllers = new Controllers();
const events = config.app.scheduleEvent;

const cronjob = new cron.CronJob(`*/${events} * * * * *`, () => {
  // const cronjob = new cron.CronJob(`0 */${events} * * * *`, () => {
  try {
    const dateNow = moment().format('DD MMM YYYY hh:mm:ss');
    controllers.updateBlocks((error, result) => {
      if (error) {
        msg.red('⛔️', error);
      } else {
        result ? msg.green('✅', `${result} at ${dateNow}`) : msg.yellow('⚠️', `[Blocks] Nothing additional data at ${dateNow}`);
      }

      controllers.updateTransactions((error, result) => {
        if (error) {
          msg.red('⛔️', error);
        } else {
          result ? msg.green('✅', `${result} at ${dateNow}`) : msg.yellow('⚠️', `[Transactions] Nothing additional data at ${dateNow}`);
        }

        controllers.updateNodes((error, result) => {
          if (error) {
            msg.red('⛔️', error);
          } else {
            result ? msg.green('✅', `${result} at ${dateNow}`) : msg.yellow('⚠️', `[Nodes] Nothing additional data at ${dateNow}`);
          }

          controllers.deleteNodes((error, result) => {
            if (error) {
              msg.red('⛔️', error);
            } else {
              result ? msg.green('✅', `${result} at ${dateNow}`) : msg.yellow('⚠️', `[Nodes] Nothing deleted data at ${dateNow}`);
            }

            controllers.updateAccounts((error, result) => {
              if (error) {
                msg.red('⛔️', error);
              } else {
                result ? msg.green('✅', `${result} at ${dateNow}`) : msg.yellow('⚠️', `[Accounts] Nothing additional data at ${dateNow}`);
              }

              controllers.redudance((error, result) => {
                if (error) {
                  msg.red('⛔️', error);
                } else {
                  result ? msg.green('✅', `${result} at ${dateNow}`) : msg.yellow('⚠️', `[Redudance] No data redundance at ${dateNow}`);
                }

                controllers.rollback((error, { success, info } = result) => {
                  if (error) {
                    msg.red('⛔️', error);
                  } else {
                    success
                      ? msg.green('✅', `${info} at ${dateNow}`)
                      : msg.yellow('⚠️', `${info ? `[Rollback - ${info}]` : `[Rollback]`} No data rollback at ${dateNow}`);
                  }
                });
              });
            });
          });
        });
      });
    });
  } catch (error) {
    msg.red('❌', `Schedule Error.\n${error.message}`);
  }
});

function start() {
  if (config.app.scheduler) {
    cronjob.start();
    msg.green('🚀', `Start Scheduler with Events Every ${events} Seconds`);
  }
}

function stop() {
  cronjob.stop();
  msg.green('🚀', 'Close Scheduler');
}

module.exports = { start, stop };

require("module-alias/register");
var rovel = require("rovel.js");
rovel.env.config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("[DB] We're connected to database!");
});
require("@bot/index.js");

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({
  dsn: process.env.SENTRY,
  tracesSampleRate: 1.0,
});
console.log("[SENTRY] Initialized!\nAll issues and performance are being sent!");
process.on('unhandledRejection', error =>{ console.warn('An Error Occurred!\n' + error);
 });
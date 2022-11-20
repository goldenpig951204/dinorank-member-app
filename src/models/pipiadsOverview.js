const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const pipiadsOverViewSchema = new Schema({
    username: String,
    userId: Number,
    site: String,
    proxyType: String,
    type: String,
    phases: [String],
    time: {
      type: Date,
      default: Date.now,
      required: true,
    }
});

pipiadsOverViewSchema.statics.countRequests = async function(userId, username, site, proxyType, type) {
    const todayEnd = moment().endOf("d").utc();
    const todayStart = moment().startOf("d").utc();
    return await this.count({
        userId,
        username,
        site,
        proxyType,
        type,
        time: {
            $gte: todayStart,
            $lte: todayEnd,
        }
    });
}

const pipiadsOverview = mongoose.model("pipiadsoverview", pipiadsOverViewSchema);

module.exports = pipiadsOverview;
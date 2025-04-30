const mongoose = require('mongoose');
const Plan = require('./subscriptionPlanModel'); 

const userSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: Date,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Set endDate automatically before saving or updating
userSubscriptionSchema.pre('save', async function (next) {
  if (!this.endDate) {
    try {
      const plan = await Plan.findById(this.planId);
      const planDuration = plan?.durationDays || 30;
      this.endDate = new Date(this.startDate); 
      this.endDate.setDate(this.startDate.getDate() + planDuration);
    } catch (err) {
      return next(err);
    }
  }
  this.isActive = this.endDate > new Date();
  next();
});

// Update endDate when the plan changes or the subscription is renewed
userSubscriptionSchema.pre('findOneAndUpdate', async function(next) {
  const updatedSubscription = this.getUpdate();
  if (updatedSubscription.planId) {
    try {
      const plan = await Plan.findById(updatedSubscription.planId);
      const planDuration = plan?.durationDays || 30;
      updatedSubscription.endDate = new Date(updatedSubscription.startDate || Date.now());
      updatedSubscription.endDate.setDate(updatedSubscription.endDate.getDate() + planDuration);
      updatedSubscription.isActive = updatedSubscription.endDate > new Date();
    } catch (err) {
      return next(err);
    }
  }
  next();
});

module.exports = mongoose.model('UserSubscription', userSubscriptionSchema);

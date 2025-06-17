import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    objective: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number },
    contentTypes: [String],
    targetNiches: [String],
    keyMessages: [String],
    requirements: {
      description: String,
      hashtags: { type: Boolean, default: false },
      disclosure: { type: Boolean, default: true },
      tag_brand: { type: Boolean, default: true },
    },
    status: { 
      type: String, 
      enum: ["draft", "active", "completed", "cancelled"],
      default: "draft"
    },
    guidelineFileName: String, // Add this since it's in your form
  },
  {
    timestamps: true,
  }
);

campaignSchema.index({ company: 1 });
campaignSchema.index({ status: 1 });

const Campaign = mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);

export default Campaign;
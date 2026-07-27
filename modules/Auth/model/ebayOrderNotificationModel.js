import mongoose from "mongoose";

/**
 * Persists every ORDER_CONFIRMATION webhook payload received from eBay.
 * Fields mirror the AsyncAPI spec provided in the eBay developer docs.
 */
const orderLineItemSchema = new mongoose.Schema(
    {
        orderLineItemId: { type: String },
        listingId:       { type: String },
        quantity:        { type: Number },
    },
    { _id: false }
);

const ebayOrderNotificationSchema = new mongoose.Schema(
    {
        // ── Metadata block ──────────────────────────────────────────────
        topic:         { type: String, default: "ORDER_CONFIRMATION" },
        schemaVersion: { type: String },
        deprecated:    { type: Boolean, default: false },

        // ── Notification envelope ────────────────────────────────────────
        notificationId:       { type: String, unique: true, sparse: true },
        eventDate:            { type: String },   // UTC ISO-8601 string from eBay
        publishDate:          { type: String },   // UTC ISO-8601 string from eBay
        publishAttemptCount:  { type: Number, default: 1 },

        // ── Order data ───────────────────────────────────────────────────
        orderId:        { type: String, index: true },
        orderLineItems: { type: [orderLineItemSchema], default: [] },

        // ── Housekeeping ─────────────────────────────────────────────────
        rawPayload:         { type: mongoose.Schema.Types.Mixed },   // full body for auditing
        ebaySignatureHeader: { type: String },                        // X-EBAY-SIGNATURE value
        signatureVerified:   { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("EbayOrderNotification", ebayOrderNotificationSchema);

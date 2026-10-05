export declare enum BatchStatus {
    created = "created",
    scheduled = "scheduled",
    running = "running",
    paused = "paused",
    completed = "completed",
    failed = "failed",
    cancelled = "cancelled"
}
export declare enum MessageStatus {
    queued = "queued",
    sent = "sent",
    delivered = "delivered",
    failed = "failed",
    suppressed = "suppressed"
}
export declare enum TemplateVersionState {
    draft = "draft",
    in_review = "in_review",
    approved = "approved",
    active = "active",
    archived = "archived"
}
export declare enum BodyFormat {
    TEXT = "TEXT",
    HTML = "HTML",
    MJML = "MJML"
}
export declare enum TemplateApprovalAction {
    submit = "submit",
    approve = "approve",
    reject = "reject"
}
export declare enum YesNoSmallint {
    No = 0,
    Yes = 1
}

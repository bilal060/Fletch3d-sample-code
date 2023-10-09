export interface INotification {
    _id: string;
    type:
        | "SCAN_ADDED_IN_PROJECT"
        | "PASSWORD_CHANGE"
        | "PROJECT_CREATE"
        | "SCAN_PROCESSED"
        | "SCAN_TRAINED"
        | "SCAN_FAILED"
        | "SCAN_COMPLETED"
        | "ACCOUNT_DETAILS_CHANGED"
        | "SCAN_EDITED"
        | "SCAN_DELETED"
        | "SCAN_ADDED"
        | "POST_FLAGGED";
    title?: string;
    message?: string;
    is_read: boolean;
    metadata?: any;
    createdAt?: string;
}

export interface INotificationAction {
    hasDetails: boolean;
    hasDetailMessageOnly?: boolean;
    buttons?: {
        label?: string;
        variant?: any;
        color?: any;
        onClick?: any;
    }[];
}

export interface INotificationItem {
    notif: INotification;
    action: INotificationAction;
}

export interface INotificationMarkPayload {
    notification_ids: string[];
}

// SCAN_ADDED_IN_PROJECT
// PASSWORD_CHANGE
// PROJECT_CREATE
// SCAN_PROCESSED
// SCAN_TRAINED
// SCAN_FAILED
// SCAN_COMPLETED
// ACCOUNT_DETAILS_CHANGED
// SCAN_EDITED
// SCAN_DELETED
// SCAN_ADDED
// POST_FLAGGED

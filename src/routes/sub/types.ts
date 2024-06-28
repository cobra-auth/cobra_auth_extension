
export enum SubStatus {
    CodeInvalid = 101,
    PendingSub = 102,
    WrongLevel = 103,
    WrongEmail = 104,
    DriveLocked = 105,

    Pending = 201,
    Removed = 202,
    Failed = 203,
    Passed = 204,
}

export interface SubmissionDetails {
    timestamp: Date,
    ref_end: string,
    status: SubStatus
}

export type SubQueryResult = { success: true, data: string } | { success: false, data: number | 'pending_sub' }

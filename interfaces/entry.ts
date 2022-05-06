
export type EntryStatus = 'pending' | 'in-progress' | 'finished';

export enum Status {
    Pending = 'pending',
    InProgress = 'in-progress',
    Finished = 'finished',
}

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}
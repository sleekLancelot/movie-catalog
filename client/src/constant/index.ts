export interface MovieProp {
    id: number
    title: string
    rating: number
    description: string,
    director: string
    year: number
    genre: string[]
}

export enum FetchStatus {
    PENDING = "pending",
    IDLE = "idle",
    REJECTED = "rejected",
    RESOLVED = "resolved",
}

export const baseURL= 'http://localhost:5000'

export type Status = "idle" | "pending" | "rejected" | "resolved"
/**
 * Shared types and enums used across composables, stores, and components.
 * Domain- and API-specific shapes live in `models/`, not here.
 */

/** Lifecycle of an async request, used by the Pinia store to drive UI state. */
export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

/** Broad category of a normalized error, used to pick the right icon/copy in the UI. */
export type AppErrorKind = 'offline' | 'not-found' | 'server' | 'unknown'

/** Normalized, UI-friendly error shape. Every API failure is mapped into this. */
export interface AppError {
  message: string
  statusCode?: number
  kind: AppErrorKind
}

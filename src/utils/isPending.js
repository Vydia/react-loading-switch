// @flow

// Isolated in case we want to modify this behavior in the future.

export type PendingValue = any

module.exports = (pendingValue: PendingValue) => !pendingValue
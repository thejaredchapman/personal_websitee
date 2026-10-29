/* global __GIT_COMMIT__ */
// Latest commit, injected at build time by vite.config.js.
export const commit = typeof __GIT_COMMIT__ !== 'undefined'
  ? __GIT_COMMIT__
  : { hash: 'dev', date: new Date().toISOString(), subject: 'local development' }

// "feat(ui): add thing" -> "add thing"
export function cleanSubject(subject) {
  return subject.replace(/^\w+(\([^)]*\))?!?:\s*/, '')
}

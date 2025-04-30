/**
 * Vercel api entry
 */
import path from 'node:path'

globalThis.STATIC_FILES = path.resolve(import.meta.dirname, '..')

import('../server/dist/server/index.js')

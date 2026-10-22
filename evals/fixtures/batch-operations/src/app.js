import { oldHelper, titleToPath } from './utils/index.js';

export function describe(title) {
  return { slug: oldHelper.slug(title), path: titleToPath(title) };
}

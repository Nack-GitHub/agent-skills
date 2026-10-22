import { oldHelper } from './oldHelper.js';

export function titleToPath(title) {
  return `/posts/${oldHelper.slug(title)}`;
}

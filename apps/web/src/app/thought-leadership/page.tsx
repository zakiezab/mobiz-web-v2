import { redirect } from 'next/navigation';

/**
 * Redirect /thought-leadership to /insights
 *
 * The marketing documentation references /thought-leadership,
 * but the implementation uses /insights. This redirect ensures
 * URL consistency and preserves any inbound links.
 */
export default function ThoughtLeadershipRedirect() {
  redirect('/insights');
}

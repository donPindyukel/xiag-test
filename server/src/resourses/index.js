import polls from './Polls';
import users from './Users';

export default function () {
  return {
	  Polls: polls(...arguments),
	  Users: users(...arguments),
  }
}

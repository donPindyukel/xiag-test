import Polls from './Polls';
import Users from './Users';

export default function () {
  return {
    Users: Users(...arguments),
    Polls: Polls(...arguments)
  }
}

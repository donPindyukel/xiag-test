import auth from './Auth';

export default function () {
  return {
    Auth: auth(...arguments),
  }
}

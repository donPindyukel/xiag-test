import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default (ctx) => ([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cookieParser(),
])

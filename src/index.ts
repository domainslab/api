require('dotenv').config();

import app from './app';
import { isProd } from './utils/env';

if (isProd()) {
  require('newrelic');
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(
    `Try http://localhost:${PORT}/v1/domains?desc='a task management app for adhd students'`
  );
});

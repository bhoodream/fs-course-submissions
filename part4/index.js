const { app } = require('./app');
const { PORT } = require('./constants/config');
const { info } = require('./utils/logger');

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});

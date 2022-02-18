const fs = require('fs');
const path = require('path');

export default api => {
  api.onBuildComplete(async params => {
    const sourcePath = path.join(
      __dirname,
      '..',
      'build',
      'static',
      process.env.PROJECT_NAME,
      'index.html',
    );
    const destPath = path.join(__dirname, '..', 'build', 'index.html');

    fs.rename(sourcePath, destPath, function(err) {
      if (err) throw err;
      fs.stat(destPath, function(err, stats) {
        if (err) throw err;
      });
    });
  });
};

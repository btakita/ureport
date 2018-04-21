const sass = require('node-sass')
module.exports = {style}
function style ({content, attributes}) {
  if (attributes.type !== 'text/scss') return;
  return new Promise((fulfil, reject) => {
    sass.render({
      data: content,
      includePaths: ['src'],
      sourceMap: true,
      outFile: 'x' // this is necessary, but is ignored
    }, (err, result) => {
      if (err) return reject(err);
      fulfil({
        code: result.css.toString(),
        map: result.map.toString()
      });
    });
  });
}

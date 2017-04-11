'use strict';

fis.hook('relative');

fis.set('fileURL', './dist');


fis.set('project.ignore', ['dist/**', 'fis-conf.js', 'mock/**', 'live/**','README.md'])
  .match('::image', {
    useHash: true
  }).match('*.js', {
  // optimizer: fis.plugin('uglify-js')
}).match('*.css', {
  optimizer: fis.plugin('clean-css')
}).match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

/*fis
  .media('mock')
  .set('project.ignore', ['dist/!**', 'fis-conf.js', 'live/!**','README.md'])
  .match('*', {
    deploy: [
      fis.plugin('replace', {
        from: '__fis.mock.base',
        to: ''
      }),
      fis.plugin('local-deliver', {
        to: './live'
      })
    ]
  });*/

fis
  .media('pro')
  .set('project.ignore', ['dist/**', 'template/**', 'fis-conf.js', 'mock/**', 'live/**','README.md'])
  .match('**', {relative: true})
  .match('*.{js,css,png,jpg,gif,json}', {release: '/static/$0'})
  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  }).match('*.css', {optimizer: fis.plugin('clean-css')})
  .match('**.{png,jpg,gif}', {optimizer: fis.plugin('png-compressor')})
  .match('*', {
    deploy: [
      fis.plugin('replace', {
        from: '__fis.env.develop',
        to: ''
      }),
      fis.plugin('local-deliver', {
        to: fis.get('fileURL')
      })
    ]
  })
  .match('::image', {
    useHash: true
  });
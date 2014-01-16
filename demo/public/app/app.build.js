// node ../r.js -o app.build.js
({
    appDir: '../',
    baseUrl: 'app',
    dir: '../appBuild',
    mainConfigFile: 'main.js',
    optimizeCss: 'standard',

    modules: [
        {
            name: 'main'
        },
        {
            name: 'mainExamples',
            include: ['app', 'appUtils'],
            exclude: ['main']
        }
    ]
})
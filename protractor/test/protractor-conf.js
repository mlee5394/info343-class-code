exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // files that end in -spec.js test files
    specs: ['*-spec.js'], 
    // selects where ng-app is called
    rootElement: 'body'
};

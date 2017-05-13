import documentExtractor from '../services/documentExtractor';

/**
 * @export
 * @param {Express} app 
 * @param {object} options
 * @returns 
 */
export default function (app, options) {
    registerViewRoute(app, options);
    registerDocumentationRoute(app, options);
    return app;
}

function registerViewRoute(app, options) {
    app.all("/:component?", (req, res) => {
        res.locals.configuration = {components: [{name: 'Card'}]};
        // TODO: replace mock with real data
        // res.locals.configuration = libraryConfigExecuter(options);
        res.render("index.ejs");
    });
}

function registerDocumentationRoute(app, options) {
    app.get('/documentation', (req, res) => {
        console.log('in documentation');
        documentExtractor(req.query.file, data => {
            res.send(data);
        });
    });
}
import documentExtractor from '../services/documentExtractor';

export default function (app) {
    registerViewRoute(app);
    registerDocumentationRoute(app);
    return app;
}

function registerViewRoute(app) {
    app.all("/:component?", (req, res) => {
        res.locals.configuration = {components: [{name: 'Card'}]};
        // res.locals.configuration = libraryConfigExecuter(libraryConfig);
        res.render("index.ejs");
    });
}

function registerDocumentationRoute(app) {
    app.get('/documentation', (req, res) => {
        console.log('in documentation');
        documentExtractor(req.query.file, data => {
            res.send(data);
        });
    });
}
import documentExtractor from '../services/documentExtractor';

export default function (app) {
    registerViewRoute(app);
    registerDocumentationRoute(app);
    return app;
}

function registerViewRoute(app) {
    app.get('/', (req, res) => {
        res.render('index.ejs');
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
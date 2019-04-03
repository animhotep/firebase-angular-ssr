import 'zone.js/dist/zone-node';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {ngExpressEngine} from "@nguniversal/express-engine";

const functions = require('firebase-functions');
const express = require('express');
const { enableProdMode } = require('@angular/core');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } =  require(__dirname + '/dist/server/main.js');

enableProdMode();


const app = express();
const DIST_FOLDER = __dirname + '/dist/browser';

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req: any, res: any) => {
  res.render('asd', { req });
});

exports.ssr = functions.https.onRequest(app);

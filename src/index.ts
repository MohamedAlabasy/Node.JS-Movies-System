import express from 'express';
import 'dotenv/config'
import body_parser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path';


import morganMiddleware from './middleware/morganMiddleware';
import notFoundMiddleware from './middleware/notFoundMiddleware';
import errorMiddleware from './middleware/errorMiddleware';

import routes from './routes/routes';

const app = express();
// #=======================================================================================#
// #			                           run server                                      #
// #=======================================================================================#
app.listen(process.env.PORT || 8888, () => {
    console.log(`App Run to http://${process.env.HOST}:${process.env.PORT || 8888}`);
});
// #=======================================================================================#
// #			                            body_parse                                     #
// #=======================================================================================#
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));
// #=======================================================================================#
// #			                         for add images                                    #
// #=======================================================================================#
const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, 'Public/assets'))
    },
    filename: (request, file, callback) => {
        callback(null, new Date().toUTCString().replace(/[: ]/g, '-') + '-' + file.originalname.replace(/ /g, '-'));
    }
});
const fileFilter = (request: express.Request, file: any, callback: any) => {
    if (// image extensions
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}
//to allowed front end to access my image
app.use('/image', express.static(path.join(__dirname, 'image')));

app.use(multer({ storage, fileFilter }).single('image'));

// #=======================================================================================#
// #			                     add header or use cors                                #
// #=======================================================================================#
app.use(cors());
// #=======================================================================================#
// #			                            router                                         #
// #=======================================================================================#
app.use('', morganMiddleware, routes);
// #=======================================================================================#
// #			                      not Found middleware                                 #
// #=======================================================================================#
app.use(notFoundMiddleware);
// #=======================================================================================#
// #			                         error middleware                                  #
// #=======================================================================================#
app.use(errorMiddleware);


export default app;
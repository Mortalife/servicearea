import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import { IRoute } from './route';

class Server {

    private expressApplication: express.Application;
    private version: string;

    constructor(expressApplication: express.Application, version: string) {
        this.expressApplication = expressApplication;
        this.version = version;
        this.bootstrap();
    }

    public addRoutes(routes: IRoute): void {
        console.log('/' + this.getVersion() + routes.getUri());
        this.expressApplication.use('/' + this.getVersion() + routes.getUri(), routes.getRoutes())
    }

    public run(port: number): void {
        this.expressApplication.listen(port, () => console.log(`Listening on port ${port}!`))
    }
    
    private bootstrap(): void {
        this.expressApplication.use(bodyParser.json());
        this.expressApplication.use(compression());
        this.expressApplication.use(cors());
        this.expressApplication.use(helmet());
    }

    private getVersion():string {
        return this.version.replace(/^\//g, '');
    }
}

export default Server;
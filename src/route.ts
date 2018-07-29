import { Router } from 'express';

interface IRoute {
  getRoutes() : Router
  getUri() : string
}



export {IRoute};
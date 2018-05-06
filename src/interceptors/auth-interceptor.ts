import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../app/config/api.config";


export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        let localUser = this.storage.getLocalUser();
        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0,N) === API_CONFIG.baseUrl;

        if(localUser && requestToAPI){
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        return next.handle(req);
        
    }
}

    export const AuthInterceptorProvider = {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    }
import { Response} from '@angular/http';

export interface IBaseService {
    http: any;
    options: any;
    setOption(): void;
    getOption(): any;
    isLoggedIn(): boolean;
    removeAuthData(): void;
    logout(): void;
    httpErrorHandler(error: Response): void;
    loginMessage(): void;
    toastMessage(message:string,cls:string): void;
    getAuthHeader(): any;
    postAuthHeader(): any;
    getToken(): string;
    getUser(): any;
    setUser(user): any;
}

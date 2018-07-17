import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class NgxMdService {
    private _http;
    private _renderer;
    constructor(_http: HttpClient);
    getContent(path: string): Observable<any>;
    setMarkedOptions(options: any): void;
    compile(data: string): any;
    private extendRenderer();
    private handleError(error);
}

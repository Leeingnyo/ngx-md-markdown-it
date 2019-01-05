import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NgxMdService {
    private _http;
    private _domSanitizer;
    private _renderer;
    constructor(_http: HttpClient, _domSanitizer: DomSanitizer);
    getContent(path: string): Observable<any>;
    setMarkedOptions(options: any): void;
    compile(data: string): any;
    private extendRenderer;
    private handleError;
}

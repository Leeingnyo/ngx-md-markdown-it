import { ElementRef, AfterViewInit } from '@angular/core';
import { NgxMdService } from './ngx-md.service';
export declare class NgxMdComponent implements AfterViewInit {
    private _mdService;
    private _el;
    private platformId;
    private _path;
    private _data;
    private _md;
    private _ext;
    changeLog: string[];
    constructor(_mdService: NgxMdService, _el: ElementRef, platformId: string);
    path: string;
    data: string;
    onDataChange(data: string): void;
    /**
     *  After view init
     */
    ngAfterViewInit(): void;
    processRaw(): void;
    /**
     * get remote conent;
     */
    onPathChange(): void;
    /**
     * catch http error
     */
    private handleError(error);
    /**
     * Prepare string
     */
    prepare(raw: string): string;
    /**
     * Trim left whitespace
     */
    private trimLeft(line);
    /**
     * Use Prism to highlight code snippets only on the browser
     */
    private highlightContent(async);
}

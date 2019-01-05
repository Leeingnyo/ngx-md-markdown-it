/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, PLATFORM_ID, Inject, EventEmitter } from '@angular/core';
import { NgxMdService } from './ngx-md.service';
import { isPlatformBrowser } from '@angular/common';
import * as Prism from 'prismjs';
import { catchError } from 'rxjs/operators';
var NgxMdComponent = /** @class */ (function () {
    function NgxMdComponent(_mdService, _el, platformId) {
        this._mdService = _mdService;
        this._el = _el;
        this.platformId = platformId;
        this.changeLog = [];
        this.errror = new EventEmitter();
        this.loaded = new EventEmitter();
        /**
         * Boolean indicating if the markdown content should be sanitized to avoid script injections
         */
        this.sanitizeHtml = true;
    }
    Object.defineProperty(NgxMdComponent.prototype, "path", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._path = value;
                this.onPathChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMdComponent.prototype, "data", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._data = value;
                this.onDataChange(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    // on input
    /**
     * @param {?} data
     * @return {?}
     */
    NgxMdComponent.prototype.onDataChange = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data) {
            this._el.nativeElement.innerHTML = this._mdService.compile(data);
        }
        else {
            this._el.nativeElement.innerHTML = '';
        }
        this.highlightContent(false);
    };
    /**
     *  After view init
     */
    /**
     *  After view init
     * @return {?}
     */
    NgxMdComponent.prototype.ngAfterViewInit = /**
     *  After view init
     * @return {?}
     */
    function () {
        if (this._path) {
            this.onPathChange();
        }
        else if (!this._data) {
            this.processRaw();
        }
    };
    /**
     * @return {?}
     */
    NgxMdComponent.prototype.processRaw = /**
     * @return {?}
     */
    function () {
        this._md = this.prepare(decodeHtml(this._el.nativeElement.innerHTML));
        this._el.nativeElement.innerHTML = this._mdService.compile(this._md);
        this.highlightContent(false);
    };
    /**
     * get remote conent;
     */
    /**
     * get remote conent;
     * @return {?}
     */
    NgxMdComponent.prototype.onPathChange = /**
     * get remote conent;
     * @return {?}
     */
    function () {
        var _this = this;
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this._mdService.getContent(this._path).pipe(catchError(this.handleError))
            .subscribe(function (data) {
            _this.loaded.emit(data);
            _this._md = _this._ext !== 'md' ? '```' + _this._ext + '\n' + data + '\n```' : data;
            _this._el.nativeElement.innerHTML = _this._mdService.compile(_this.prepare(_this._md));
            _this.highlightContent(false);
        });
    };
    /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    NgxMdComponent.prototype.handleError = /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    function (error) {
        this.errror.emit(error);
        console.error('An error occurred', error); // for demo purposes only
        return error.message || error;
    };
    /**
     * Prepare string
     */
    /**
     * Prepare string
     * @param {?} raw
     * @return {?}
     */
    NgxMdComponent.prototype.prepare = /**
     * Prepare string
     * @param {?} raw
     * @return {?}
     */
    function (raw) {
        var _this = this;
        if (!raw) {
            return '';
        }
        if (this._ext === 'md' || !this.path) {
            /** @type {?} */
            var isCodeBlock_1 = false;
            return raw.split('\n').map(function (line) {
                // If the first non-blank chars are an opening/closing code block, toggle the flag
                if (_this.trimLeft(line).substring(0, 3) === '```') {
                    isCodeBlock_1 = !isCodeBlock_1;
                }
                return isCodeBlock_1 ? line : line.trim();
            }).join('\n');
        }
        return raw.replace(/\"/g, '\'');
    };
    /**
     * Trim left whitespace
     * @param {?} line
     * @return {?}
     */
    NgxMdComponent.prototype.trimLeft = /**
     * Trim left whitespace
     * @param {?} line
     * @return {?}
     */
    function (line) {
        return line.replace(/^\s+|\s+$/g, '');
    };
    /**
     * Use Prism to highlight code snippets only on the browser
     * @param {?} async
     * @return {?}
     */
    NgxMdComponent.prototype.highlightContent = /**
     * Use Prism to highlight code snippets only on the browser
     * @param {?} async
     * @return {?}
     */
    function (async) {
        if (isPlatformBrowser(this.platformId)) {
            Prism.highlightAll(async);
        }
    };
    NgxMdComponent.decorators = [
        { type: Component, args: [{
                    selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                    template: '<ng-content></ng-content>',
                    styles: [".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }\n        .md-checkbox{\n            vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px;\n        }"]
                }] }
    ];
    /** @nocollapse */
    NgxMdComponent.ctorParameters = function () { return [
        { type: NgxMdService },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NgxMdComponent.propDecorators = {
        path: [{ type: Input }],
        data: [{ type: Input }],
        sanitizeHtml: [{ type: Input }]
    };
    return NgxMdComponent;
}());
export { NgxMdComponent };
if (false) {
    /** @type {?} */
    NgxMdComponent.prototype._path;
    /** @type {?} */
    NgxMdComponent.prototype._data;
    /** @type {?} */
    NgxMdComponent.prototype._md;
    /** @type {?} */
    NgxMdComponent.prototype._ext;
    /** @type {?} */
    NgxMdComponent.prototype.changeLog;
    /** @type {?} */
    NgxMdComponent.prototype.errror;
    /** @type {?} */
    NgxMdComponent.prototype.loaded;
    /**
     * Boolean indicating if the markdown content should be sanitized to avoid script injections
     * @type {?}
     */
    NgxMdComponent.prototype.sanitizeHtml;
    /** @type {?} */
    NgxMdComponent.prototype._mdService;
    /** @type {?} */
    NgxMdComponent.prototype._el;
    /** @type {?} */
    NgxMdComponent.prototype.platformId;
}
/**
 * @param {?} html
 * @return {?}
 */
function decodeHtml(html) {
    /** @type {?} */
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBeUIsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEtBQUssS0FBSyxNQUFNLFNBQVMsQ0FBQztBQUVqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0lBdUJ4Qyx3QkFDVyxZQUNBLEtBQ3FCLFVBQWtCO1FBRnZDLGVBQVUsR0FBVixVQUFVO1FBQ1YsUUFBRyxHQUFILEdBQUc7UUFDa0IsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQVBsRCxpQkFBc0IsRUFBRSxDQUFDO1FBQ3pCLGNBQTZCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDckQsY0FBNkIsSUFBSSxZQUFZLEVBQU8sQ0FBQzs7OztRQTRCckQsb0JBQStCLElBQUksQ0FBQztLQXRCL0I7SUFFTCxzQkFDSSxnQ0FBSTs7Ozs7UUFEUixVQUNTLEtBQWE7WUFDcEIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtTQUNGOzs7T0FBQTtJQUVELHNCQUNJLGdDQUFJOzs7OztRQURSLFVBQ1MsS0FBYTtZQUNwQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtTQUNG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LFVBQVUsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztDQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIElucHV0LCBQTEFURk9STV9JRCwgSW5qZWN0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neE1kU2VydmljZSB9IGZyb20gJy4vbmd4LW1kLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgeyBTdWJzY3JpYmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWFya2Rvd24sW01hcmtkb3duXSxuZ3gtbWQsW05neE1kXScsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYC50b2tlbi5vcGVyYXRvciwgLnRva2VuLmVudGl0eSwgLnRva2VuLnVybCwgLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLCAuc3R5bGUgLnRva2VuLnN0cmluZyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5tZC1jaGVja2JveHtcbiAgICAgICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbjogMCAwLjJlbSAwLjI1ZW0gLTEuNmVtOyBmb250LXNpemU6IDE2cHg7XG4gICAgICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbXBvbmVudCBpbXBsZW1lbnRzICBBZnRlclZpZXdJbml0IHtcbiAgICBfcGF0aDogc3RyaW5nO1xuICAgIF9kYXRhOiBzdHJpbmc7XG4gICAgX21kOiBhbnk7XG4gICAgX2V4dDogc3RyaW5nO1xuICAgIGNoYW5nZUxvZzogc3RyaW5nW10gPSBbXTtcbiAgICBlcnJyb3I6IEV2ZW50RW1pdHRlcjxhbnk+ICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAgIGxvYWRlZDogRXZlbnRFbWl0dGVyPGFueT4gID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIF9tZFNlcnZpY2U6IE5neE1kU2VydmljZSxcbiAgICAgICAgcHVibGljIF9lbDogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHVibGljIHBsYXRmb3JtSWQ6IHN0cmluZ1xuICAgICkgeyB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wYXRoID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGF0YSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCb29sZWFuIGluZGljYXRpbmcgaWYgdGhlIG1hcmtkb3duIGNvbnRlbnQgc2hvdWxkIGJlIHNhbml0aXplZCB0byBhdm9pZCBzY3JpcHQgaW5qZWN0aW9uc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHB1YmxpYyBzYW5pdGl6ZUh0bWwgPSB0cnVlO1xuXG5cbiAgICAvLyBvbiBpbnB1dFxuICAgIG9uRGF0YUNoYW5nZShkYXRhOiBzdHJpbmcpIHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUoZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQWZ0ZXIgdmlldyBpbml0XG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKHRoaXMuX3BhdGgpIHtcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2RhdGEpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzUmF3KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc1JhdygpIHtcbiAgICAgIHRoaXMuX21kID0gdGhpcy5wcmVwYXJlKGRlY29kZUh0bWwodGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwpKTtcbiAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5fbWQpO1xuICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcmVtb3RlIGNvbmVudDtcbiAgICAgKi9cbiAgICBvblBhdGhDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuX2V4dCA9IHRoaXMuX3BhdGggJiYgdGhpcy5fcGF0aC5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpO1xuICAgICAgICB0aGlzLl9tZFNlcnZpY2UuZ2V0Q29udGVudCh0aGlzLl9wYXRoKS5waXBlKGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZGVkLmVtaXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWQgPSB0aGlzLl9leHQgIT09ICdtZCcgPyAnYGBgJyArIHRoaXMuX2V4dCArICdcXG4nICsgZGF0YSArICdcXG5gYGAnIDogZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMucHJlcGFyZSh0aGlzLl9tZCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYXRjaCBodHRwIGVycm9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogU3Vic2NyaWJhYmxlPGFueT4ge1xuICAgICAgICB0aGlzLmVycnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgcmV0dXJuIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBzdHJpbmdcbiAgICAgKi9cbiAgICAgcHJlcGFyZShyYXc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9leHQgPT09ICdtZCcgfHwgIXRoaXMucGF0aCkge1xuICAgICAgICAgICAgbGV0IGlzQ29kZUJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmF3LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBmaXJzdCBub24tYmxhbmsgY2hhcnMgYXJlIGFuIG9wZW5pbmcvY2xvc2luZyBjb2RlIGJsb2NrLCB0b2dnbGUgdGhlIGZsYWdcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltTGVmdChsaW5lKS5zdWJzdHJpbmcoMCwgMykgPT09ICdgYGAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQ29kZUJsb2NrID0gIWlzQ29kZUJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNDb2RlQmxvY2sgPyBsaW5lIDogbGluZS50cmltKCk7XG4gICAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3LnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaW0gbGVmdCB3aGl0ZXNwYWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmltTGVmdChsaW5lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBQcmlzbSB0byBoaWdobGlnaHQgY29kZSBzbmlwcGV0cyBvbmx5IG9uIHRoZSBicm93c2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb250ZW50KGFzeW5jOiBib29sZWFuKTogdm9pZCB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICBQcmlzbS5oaWdobGlnaHRBbGwoYXN5bmMpO1xuICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHsgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzczOTQ3ODcvNTg4NTIxXG4gICAgY29uc3QgdHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdHh0LnZhbHVlO1xufVxuXG4iXX0=
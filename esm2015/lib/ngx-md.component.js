/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, PLATFORM_ID, Inject } from '@angular/core';
import { NgxMdService } from './ngx-md.service';
import { isPlatformBrowser } from '@angular/common';
import * as Prism from 'prismjs';
export class NgxMdComponent {
    /**
     * @param {?} _mdService
     * @param {?} _el
     * @param {?} platformId
     */
    constructor(_mdService, _el, platformId) {
        this._mdService = _mdService;
        this._el = _el;
        this.platformId = platformId;
        this.changeLog = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set path(value) {
        if (value) {
            this._path = value;
            this.onPathChange();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        if (value) {
            this._data = value;
            this.onDataChange(value);
        }
    }
    /**
     * @param {?} data
     * @return {?}
     */
    onDataChange(data) {
        if (data) {
            this._el.nativeElement.innerHTML = this._mdService.compile(data);
        }
        else {
            this._el.nativeElement.innerHTML = '';
        }
        this.highlightContent(false);
    }
    /**
     *  After view init
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._path) {
            this.onPathChange();
        }
        else if (!this._data) {
            this.processRaw();
        }
    }
    /**
     * @return {?}
     */
    processRaw() {
        this._md = this.prepare(decodeHtml(this._el.nativeElement.innerHTML));
        this._el.nativeElement.innerHTML = this._mdService.compile(this._md);
        this.highlightContent(false);
    }
    /**
     * get remote conent;
     * @return {?}
     */
    onPathChange() {
        this._ext = this._path && this._path.split('.').splice(-1).join();
        this._mdService.getContent(this._path)
            .subscribe(data => {
            this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
            this._el.nativeElement.innerHTML = this._mdService.compile(this.prepare(this._md));
            this.highlightContent(false);
        }, err => this.handleError);
    }
    /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    /**
     * Prepare string
     * @param {?} raw
     * @return {?}
     */
    prepare(raw) {
        if (!raw) {
            return '';
        }
        if (this._ext === 'md' || !this.path) {
            /** @type {?} */
            let isCodeBlock = false;
            return raw.split('\n').map((line) => {
                if (this.trimLeft(line).substring(0, 3) === '```') {
                    isCodeBlock = !isCodeBlock;
                }
                return isCodeBlock ? line : line.trim();
            }).join('\n');
        }
        return raw.replace(/\"/g, '\'');
    }
    /**
     * Trim left whitespace
     * @param {?} line
     * @return {?}
     */
    trimLeft(line) {
        return line.replace(/^\s+|\s+$/g, '');
    }
    /**
     * Use Prism to highlight code snippets only on the browser
     * @param {?} async
     * @return {?}
     */
    highlightContent(async) {
        if (isPlatformBrowser(this.platformId)) {
            Prism.highlightAll(async);
        }
    }
}
NgxMdComponent.decorators = [
    { type: Component, args: [{
                selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                template: '<ng-content></ng-content>',
                styles: [
                    `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
            background: none;
        }`
                ]
            },] },
];
/** @nocollapse */
NgxMdComponent.ctorParameters = () => [
    { type: NgxMdService },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NgxMdComponent.propDecorators = {
    path: [{ type: Input }],
    data: [{ type: Input }]
};
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
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBeUIsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sS0FBSyxLQUFLLE1BQU0sU0FBUyxDQUFDO0FBV2pDLE1BQU07Ozs7OztJQU9GLFlBQ1ksWUFDQSxLQUNxQixVQUFrQjtRQUZ2QyxlQUFVLEdBQVYsVUFBVTtRQUNWLFFBQUcsR0FBSCxHQUFHO1FBQ2tCLGVBQVUsR0FBVixVQUFVLENBQVE7eUJBTDdCLEVBQUU7S0FNbkI7Ozs7O0lBSUwsSUFDSSxJQUFJLENBQUMsS0FBYTtRQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0tBQ0Y7Ozs7O0lBRUQsSUFDSSxJQUFJLENBQUMsS0FBYTtRQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxQjtLQUNGOzs7OztJQUlELFlBQVksQ0FBQyxJQUFZO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FB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LENBQUMsQ0FBQztvQkFDaEQsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDO2lCQUM5QjtnQkFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFLTyxRQUFRLENBQUMsSUFBWTtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7SUFNbEMsZ0JBQWdCLENBQUMsS0FBYztRQUNyQyxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7Ozs7WUExSE4sU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQ0FBb0M7Z0JBQzlDLFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLE1BQU0sRUFBRTtvQkFDSjs7VUFFRTtpQkFDTDthQUNKOzs7O1lBWlEsWUFBWTtZQURELFVBQVU7eUNBd0JyQixNQUFNLFNBQUMsV0FBVzs7O21CQUt0QixLQUFLO21CQVFMLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThGVixvQkFBb0IsSUFBWTs7SUFDNUIsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNyQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztDQUNwQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIElucHV0LCBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hNZFNlcnZpY2UgfSBmcm9tICcuL25neC1tZC5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzIFByaXNtIGZyb20gJ3ByaXNtanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21hcmtkb3duLFtNYXJrZG93bl0sbmd4LW1kLFtOZ3hNZF0nLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGAudG9rZW4ub3BlcmF0b3IsIC50b2tlbi5lbnRpdHksIC50b2tlbi51cmwsIC5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZywgLnN0eWxlIC50b2tlbi5zdHJpbmcge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kQ29tcG9uZW50IGltcGxlbWVudHMgIEFmdGVyVmlld0luaXQge1xuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF9kYXRhOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbWQ6IGFueTtcbiAgICBwcml2YXRlIF9leHQ6IHN0cmluZztcbiAgICBjaGFuZ2VMb2c6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfbWRTZXJ2aWNlOiBOZ3hNZFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IHN0cmluZ1xuICAgICkgeyB9XG5cbiAgIFxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcGF0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRhdGEodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gb24gaW5wdXRcbiAgICBvbkRhdGFDaGFuZ2UoZGF0YTogc3RyaW5nKSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKGRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgIH1cbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEFmdGVyIHZpZXcgaW5pdFxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLl9wYXRoKSB7XG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kYXRhKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc1JhdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NSYXcoKSB7XG4gICAgICB0aGlzLl9tZCA9IHRoaXMucHJlcGFyZShkZWNvZGVIdG1sKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MKSk7XG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMuX21kKTtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHJlbW90ZSBjb25lbnQ7XG4gICAgICovXG4gICAgb25QYXRoQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9leHQgPSB0aGlzLl9wYXRoICYmIHRoaXMuX3BhdGguc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKTtcbiAgICAgICAgdGhpcy5fbWRTZXJ2aWNlLmdldENvbnRlbnQodGhpcy5fcGF0aClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWQgPSB0aGlzLl9leHQgIT09ICdtZCcgPyAnYGBgJyArIHRoaXMuX2V4dCArICdcXG4nICsgZGF0YSArICdcXG5gYGAnIDogZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMucHJlcGFyZSh0aGlzLl9tZCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhdGNoIGh0dHAgZXJyb3JcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBzdHJpbmdcbiAgICAgKi9cbiAgICAgcHJlcGFyZShyYXc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9leHQgPT09ICdtZCcgfHwgIXRoaXMucGF0aCkge1xuICAgICAgICAgICAgbGV0IGlzQ29kZUJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmF3LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW1MZWZ0KGxpbmUpLnN1YnN0cmluZygwLCAzKSA9PT0gJ2BgYCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNDb2RlQmxvY2sgPSAhaXNDb2RlQmxvY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpc0NvZGVCbG9jayA/IGxpbmUgOiBsaW5lLnRyaW0oKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXcucmVwbGFjZSgvXFxcIi9nLCAnXFwnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpbSBsZWZ0IHdoaXRlc3BhY2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyaW1MZWZ0KGxpbmU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGluZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlIFByaXNtIHRvIGhpZ2hsaWdodCBjb2RlIHNuaXBwZXRzIG9ubHkgb24gdGhlIGJyb3dzZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZ2hsaWdodENvbnRlbnQoYXN5bmM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIFByaXNtLmhpZ2hsaWdodEFsbChhc3luYyk7XG4gICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWNvZGVIdG1sKGh0bWw6IHN0cmluZykgeyAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzM5NDc4Ny81ODg1MjFcbiAgICBjb25zdCB0eHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHR4dC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiB0eHQudmFsdWU7XG59XG5cbiJdfQ==
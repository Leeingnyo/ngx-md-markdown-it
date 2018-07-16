import { Injectable, Component, ElementRef, Input, PLATFORM_ID, Inject, NgModule, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import { isPlatformBrowser } from '@angular/common';
import { highlightAll } from 'prismjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
        this._renderer = MarkdownIt({ linkify: true }).use(MarkdownItFootnote);
        /** @type {?} */
        const defaultRender = this._renderer.renderer.rules.link_open || function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };
        this._renderer.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            /** @type {?} */
            const aIndex = tokens[idx].attrIndex('target');
            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']);
            }
            else {
                tokens[idx].attrs[aIndex][1] = '_blank';
            }
            return defaultRender(tokens, idx, options, env, self);
        };
        this.setMarkedOptions({});
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getContent(path) {
        return this._http.get(path, { responseType: 'text' }).pipe(map(res => res), catchError(this.handleError));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setMarkedOptions(options) {
        options = Object.assign({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        }, options);
        // TODO
    }
    /**
     * @param {?} data
     * @return {?}
     */
    compile(data) {
        return this._renderer.render(data);
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        /** @type {?} */
        let errMsg;
        if (error instanceof fetch) {
            /** @type {?} */
            const body = error.json() || '';
            /** @type {?} */
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return throwError(errMsg);
    }
}
NgxMdService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgxMdService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ NgxMdService.ngInjectableDef = defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(inject(HttpClient)); }, token: NgxMdService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdComponent {
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
            highlightAll(async);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdConfig {
}
NgxMdConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxMdModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgxMdModule,
            providers: [NgxMdConfig]
        };
    }
}
NgxMdModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                declarations: [NgxMdComponent],
                providers: [NgxMdService],
                exports: [NgxMdComponent],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxMdService, NgxMdComponent, NgxMdModule, NgxMdConfig as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb21wb25lbnQudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLmNvbmZpZy50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IE1hcmtkb3duSXRGb290bm90ZSBmcm9tICdtYXJrZG93bi1pdC1mb290bm90ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBNYXJrZG93bkl0KHsgbGlua2lmeTogdHJ1ZSB9KS51c2UoTWFya2Rvd25JdEZvb3Rub3RlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgLy8gUmVtZW1iZXIgb2xkIHJlbmRlcmVyLCBpZiBvdmVycmlkZW4sIG9yIHByb3h5IHRvIGRlZmF1bHQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWZhdWx0UmVuZGVyID0gdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMubGlua19vcGVuIHx8IGZ1bmN0aW9uKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiA9IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICBjb25zdCBhSW5kZXggPSB0b2tlbnNbaWR4XS5hdHRySW5kZXgoJ3RhcmdldCcpO1xuXG4gICAgICBpZiAoYUluZGV4IDwgMCkge1xuICAgICAgICB0b2tlbnNbaWR4XS5hdHRyUHVzaChbJ3RhcmdldCcsICdfYmxhbmsnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2tlbnNbaWR4XS5hdHRyc1thSW5kZXhdWzFdID0gJ19ibGFuayc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0UmVuZGVyKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpO1xuICAgIH07XG4gICAgdGhpcy5zZXRNYXJrZWRPcHRpb25zKHt9KTtcbiAgfVxuXG4gIC8vIGdldCB0aGUgY29udGVudCBmcm9tIHJlbW90ZSByZXNvdXJjZVxuICBnZXRDb250ZW50KHBhdGg6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSkucGlwZShtYXAocmVzID0+IHJlcyksIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcikpO1xuICB9XG5cbiAgcHVibGljIHNldE1hcmtlZE9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZ2ZtOiB0cnVlLFxuICAgICAgdGFibGVzOiB0cnVlLFxuICAgICAgYnJlYWtzOiBmYWxzZSxcbiAgICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXG4gICAgICBzbWFydHlwYW50czogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcbiAgICAvLyBUT0RPXG4gIH1cblxuICAvLyBjb21wbGUgbWFya2Rvd24gdG8gaHRtbFxuICBwdWJsaWMgY29tcGlsZShkYXRhOiBzdHJpbmcpIHtcbiAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLnJlbmRlcihkYXRhKTtcbiAgfVxuXG4gIC8vIGhhbmRsZSBlcnJvclxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBhbnkge1xuICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBmZXRjaCkge1xuICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCAnJztcbiAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XG4gIH1cbn1cbiIsIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBPbkluaXQsIEFmdGVyVmlld0luaXQsIElucHV0LCBQTEFURk9STV9JRCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hNZFNlcnZpY2UgfSBmcm9tICcuL25neC1tZC5zZXJ2aWNlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAqIGFzIFByaXNtIGZyb20gJ3ByaXNtanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ21hcmtkb3duLFtNYXJrZG93bl0sbmd4LW1kLFtOZ3hNZF0nLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGAudG9rZW4ub3BlcmF0b3IsIC50b2tlbi5lbnRpdHksIC50b2tlbi51cmwsIC5sYW5ndWFnZS1jc3MgLnRva2VuLnN0cmluZywgLnN0eWxlIC50b2tlbi5zdHJpbmcge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgfWBcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kQ29tcG9uZW50IGltcGxlbWVudHMgIEFmdGVyVmlld0luaXQge1xuICAgIHByaXZhdGUgX3BhdGg6IHN0cmluZztcbiAgICBwcml2YXRlIF9kYXRhOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfbWQ6IGFueTtcbiAgICBwcml2YXRlIF9leHQ6IHN0cmluZztcbiAgICBjaGFuZ2VMb2c6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfbWRTZXJ2aWNlOiBOZ3hNZFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxuICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IHN0cmluZ1xuICAgICkgeyB9XG5cbiAgIFxuXG4gICAgQElucHV0KClcbiAgICBzZXQgcGF0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fcGF0aCA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IGRhdGEodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vbkRhdGFDaGFuZ2UodmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gb24gaW5wdXRcbiAgICBvbkRhdGFDaGFuZ2UoZGF0YTogc3RyaW5nKSB7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKGRhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgIH1cbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIEFmdGVyIHZpZXcgaW5pdFxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgIGlmICh0aGlzLl9wYXRoKSB7XG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9kYXRhKSB7XG4gICAgICAgIHRoaXMucHJvY2Vzc1JhdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHByb2Nlc3NSYXcoKSB7XG4gICAgICB0aGlzLl9tZCA9IHRoaXMucHJlcGFyZShkZWNvZGVIdG1sKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MKSk7XG4gICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMuX21kKTtcbiAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZ2V0IHJlbW90ZSBjb25lbnQ7XG4gICAgICovXG4gICAgb25QYXRoQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLl9leHQgPSB0aGlzLl9wYXRoICYmIHRoaXMuX3BhdGguc3BsaXQoJy4nKS5zcGxpY2UoLTEpLmpvaW4oKTtcbiAgICAgICAgdGhpcy5fbWRTZXJ2aWNlLmdldENvbnRlbnQodGhpcy5fcGF0aClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWQgPSB0aGlzLl9leHQgIT09ICdtZCcgPyAnYGBgJyArIHRoaXMuX2V4dCArICdcXG4nICsgZGF0YSArICdcXG5gYGAnIDogZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IHRoaXMuX21kU2VydmljZS5jb21waWxlKHRoaXMucHJlcGFyZSh0aGlzLl9tZCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0Q29udGVudChmYWxzZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyID0+IHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGNhdGNoIGh0dHAgZXJyb3JcbiAgICAgKi9cbiAgICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZCcsIGVycm9yKTsgLy8gZm9yIGRlbW8gcHVycG9zZXMgb25seVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlcGFyZSBzdHJpbmdcbiAgICAgKi9cbiAgICAgcHJlcGFyZShyYXc6IHN0cmluZykge1xuICAgICAgICBpZiAoIXJhdykge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9leHQgPT09ICdtZCcgfHwgIXRoaXMucGF0aCkge1xuICAgICAgICAgICAgbGV0IGlzQ29kZUJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gcmF3LnNwbGl0KCdcXG4nKS5tYXAoKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyaW1MZWZ0KGxpbmUpLnN1YnN0cmluZygwLCAzKSA9PT0gJ2BgYCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNDb2RlQmxvY2sgPSAhaXNDb2RlQmxvY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBpc0NvZGVCbG9jayA/IGxpbmUgOiBsaW5lLnRyaW0oKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJ1xcbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXcucmVwbGFjZSgvXFxcIi9nLCAnXFwnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpbSBsZWZ0IHdoaXRlc3BhY2VcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyaW1MZWZ0KGxpbmU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gbGluZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlIFByaXNtIHRvIGhpZ2hsaWdodCBjb2RlIHNuaXBwZXRzIG9ubHkgb24gdGhlIGJyb3dzZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIGhpZ2hsaWdodENvbnRlbnQoYXN5bmM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgIFByaXNtLmhpZ2hsaWdodEFsbChhc3luYyk7XG4gICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWNvZGVIdG1sKGh0bWw6IHN0cmluZykgeyAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzM5NDc4Ny81ODg1MjFcbiAgICBjb25zdCB0eHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgIHR4dC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHJldHVybiB0eHQudmFsdWU7XG59XG5cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neE1kQ29uZmlnIHtcbiAgLyoqIGNvbmZpZyBtb2R1ZSAqL1xuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE5neE1kU2VydmljZSB9IGZyb20gJy4vbmd4LW1kLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4TWRDb25maWcgfSBmcm9tICcuL25neC1tZC5jb25maWcnO1xuaW1wb3J0IHsgTmd4TWRDb21wb25lbnQgfSBmcm9tICcuL25neC1tZC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05neE1kQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbTmd4TWRTZXJ2aWNlXSxcbiAgZXhwb3J0czogW05neE1kQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWRNb2R1bGUge1xuICBwdWJsaWMgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hNZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW05neE1kQ29uZmlnXVxuICAgIH07XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJQcmlzbS5oaWdobGlnaHRBbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQWFFLFlBQW9CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7eUJBRlosVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDOztRQUk1RSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLFVBQVMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUk7WUFDdkcs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
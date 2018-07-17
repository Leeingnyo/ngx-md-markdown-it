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
        this.extendRenderer();
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
     * @return {?}
     */
    extendRenderer() {
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
        /** @type {?} */
        const currentPageLinkWithoutHash = location.origin + location.pathname + location.search;
        this._renderer.renderer.rules.footnote_ref = function render_footnote_ref(tokens, idx, options, env, slf) {
            /** @type {?} */
            var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
            /** @type {?} */
            var caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
            /** @type {?} */
            var refid = id;
            if (tokens[idx].meta.subId > 0) {
                refid += ':' + tokens[idx].meta.subId;
            }
            return '<sup class="footnote-ref"><a href="' + currentPageLinkWithoutHash + '#fn' + id + '" id="fnref' + refid + '">' + caption + '</a></sup>';
        };
        this._renderer.renderer.rules.footnote_anchor = function render_footnote_anchor(tokens, idx, options, env, slf) {
            /** @type {?} */
            var id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
            if (tokens[idx].meta.subId > 0) {
                id += ':' + tokens[idx].meta.subId;
            }
            /* ↩ with escape code to prevent display as Apple Emoji on iOS */
            return ' <a href="' + currentPageLinkWithoutHash + '#fnref' + id + '" class="footnote-backref">\u21a9\uFE0E</a>';
        };
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb21wb25lbnQudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLmNvbmZpZy50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IE1hcmtkb3duSXRGb290bm90ZSBmcm9tICdtYXJrZG93bi1pdC1mb290bm90ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBNYXJrZG93bkl0KHsgbGlua2lmeTogdHJ1ZSB9KS51c2UoTWFya2Rvd25JdEZvb3Rub3RlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy5leHRlbmRSZW5kZXJlcigpO1xuICAgIHRoaXMuc2V0TWFya2VkT3B0aW9ucyh7fSk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGNvbnRlbnQgZnJvbSByZW1vdGUgcmVzb3VyY2VcbiAgZ2V0Q29udGVudChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHBhdGgsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pLnBpcGUobWFwKHJlcyA9PiByZXMpLCBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRNYXJrZWRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGdmbTogdHJ1ZSxcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIGJyZWFrczogZmFsc2UsXG4gICAgICBwZWRhbnRpYzogZmFsc2UsXG4gICAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgICBzbWFydExpc3RzOiB0cnVlLFxuICAgICAgc21hcnR5cGFudHM6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcbiAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5yZW5kZXIoZGF0YSk7XG4gIH1cblxuICAvLyBleHRlbmQgbWFya2VkIHJlbmRlciB0byBzdXBwb3J0IHRvZG8gY2hlY2tib3hcbiAgcHJpdmF0ZSBleHRlbmRSZW5kZXJlcigpIHtcbiAgICAvLyBtYWtlIHRhcmdldCBvZiBhbmNob3IgdGFnIGJsYW5rXG4gICAgLy8gUmVtZW1iZXIgb2xkIHJlbmRlcmVyLCBpZiBvdmVycmlkZW4sIG9yIHByb3h5IHRvIGRlZmF1bHQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWZhdWx0UmVuZGVyID0gdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMubGlua19vcGVuIHx8IGZ1bmN0aW9uKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiA9IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICBjb25zdCBhSW5kZXggPSB0b2tlbnNbaWR4XS5hdHRySW5kZXgoJ3RhcmdldCcpO1xuXG4gICAgICBpZiAoYUluZGV4IDwgMCkge1xuICAgICAgICB0b2tlbnNbaWR4XS5hdHRyUHVzaChbJ3RhcmdldCcsICdfYmxhbmsnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2tlbnNbaWR4XS5hdHRyc1thSW5kZXhdWzFdID0gJ19ibGFuayc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0UmVuZGVyKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpO1xuICAgIH07XG5cbiAgICAvLyBmb3IgYW5ndWxhciByb3V0ZWVyLCBhZGQgcHJlZml4IGxvY2F0aW9uLmhyZWYgd2l0aG91dCBmcmFnbWVudFxuICAgIGNvbnN0IGN1cnJlbnRQYWdlTGlua1dpdGhvdXRIYXNoID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMuZm9vdG5vdGVfcmVmID0gZnVuY3Rpb24gcmVuZGVyX2Zvb3Rub3RlX3JlZih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpIHtcbiAgICAgIHZhciBpZCAgICAgID0gc2xmLnJ1bGVzLmZvb3Rub3RlX2FuY2hvcl9uYW1lKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG4gICAgICB2YXIgY2FwdGlvbiA9IHNsZi5ydWxlcy5mb290bm90ZV9jYXB0aW9uKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG4gICAgICB2YXIgcmVmaWQgICA9IGlkO1xuXG4gICAgICBpZiAodG9rZW5zW2lkeF0ubWV0YS5zdWJJZCA+IDApIHtcbiAgICAgICAgcmVmaWQgKz0gJzonICsgdG9rZW5zW2lkeF0ubWV0YS5zdWJJZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICc8c3VwIGNsYXNzPVwiZm9vdG5vdGUtcmVmXCI+PGEgaHJlZj1cIicgKyBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCArICcjZm4nICsgaWQgKyAnXCIgaWQ9XCJmbnJlZicgKyByZWZpZCArICdcIj4nICsgY2FwdGlvbiArICc8L2E+PC9zdXA+JztcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMuZm9vdG5vdGVfYW5jaG9yID0gZnVuY3Rpb24gcmVuZGVyX2Zvb3Rub3RlX2FuY2hvcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpIHtcbiAgICAgIHZhciBpZCA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuXG4gICAgICBpZiAodG9rZW5zW2lkeF0ubWV0YS5zdWJJZCA+IDApIHtcbiAgICAgICAgaWQgKz0gJzonICsgdG9rZW5zW2lkeF0ubWV0YS5zdWJJZDtcbiAgICAgIH1cblxuICAgICAgLyogw6LChsKpIHdpdGggZXNjYXBlIGNvZGUgdG8gcHJldmVudCBkaXNwbGF5IGFzIEFwcGxlIEVtb2ppIG9uIGlPUyAqL1xuICAgICAgcmV0dXJuICcgPGEgaHJlZj1cIicgKyBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCArICcjZm5yZWYnICsgaWQgKyAnXCIgY2xhc3M9XCJmb290bm90ZS1iYWNrcmVmXCI+XFx1MjFhOVxcdUZFMEU8L2E+JztcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgZXJyb3JcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogYW55IHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZmV0Y2gpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XG4gICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYXJrZG93bixbTWFya2Rvd25dLG5neC1tZCxbTmd4TWRdJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgLnRva2VuLm9wZXJhdG9yLCAudG9rZW4uZW50aXR5LCAudG9rZW4udXJsLCAubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsIC5zdHlsZSAudG9rZW4uc3RyaW5nIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbXBvbmVudCBpbXBsZW1lbnRzICBBZnRlclZpZXdJbml0IHtcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZGF0YTogc3RyaW5nO1xuICAgIHByaXZhdGUgX21kOiBhbnk7XG4gICAgcHJpdmF0ZSBfZXh0OiBzdHJpbmc7XG4gICAgY2hhbmdlTG9nOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX21kU2VydmljZTogTmd4TWRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBzdHJpbmdcbiAgICApIHsgfVxuXG4gICBcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BhdGggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkYXRhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIG9uIGlucHV0XG4gICAgb25EYXRhQ2hhbmdlKGRhdGE6IHN0cmluZykge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZShkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9XG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBZnRlciB2aWV3IGluaXRcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAodGhpcy5fcGF0aCkge1xuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5fZGF0YSkge1xuICAgICAgICB0aGlzLnByb2Nlc3NSYXcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzUmF3KCkge1xuICAgICAgdGhpcy5fbWQgPSB0aGlzLnByZXBhcmUoZGVjb2RlSHRtbCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCkpO1xuICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLl9tZCk7XG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByZW1vdGUgY29uZW50O1xuICAgICAqL1xuICAgIG9uUGF0aENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fZXh0ID0gdGhpcy5fcGF0aCAmJiB0aGlzLl9wYXRoLnNwbGl0KCcuJykuc3BsaWNlKC0xKS5qb2luKCk7XG4gICAgICAgIHRoaXMuX21kU2VydmljZS5nZXRDb250ZW50KHRoaXMuX3BhdGgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX21kID0gdGhpcy5fZXh0ICE9PSAnbWQnID8gJ2BgYCcgKyB0aGlzLl9leHQgKyAnXFxuJyArIGRhdGEgKyAnXFxuYGBgJyA6IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLnByZXBhcmUodGhpcy5fbWQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYXRjaCBodHRwIGVycm9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgc3RyaW5nXG4gICAgICovXG4gICAgIHByZXBhcmUocmF3OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZXh0ID09PSAnbWQnIHx8ICF0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIGxldCBpc0NvZGVCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHJhdy5zcGxpdCgnXFxuJykubWFwKChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltTGVmdChsaW5lKS5zdWJzdHJpbmcoMCwgMykgPT09ICdgYGAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQ29kZUJsb2NrID0gIWlzQ29kZUJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNDb2RlQmxvY2sgPyBsaW5lIDogbGluZS50cmltKCk7XG4gICAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3LnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaW0gbGVmdCB3aGl0ZXNwYWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmltTGVmdChsaW5lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBQcmlzbSB0byBoaWdobGlnaHQgY29kZSBzbmlwcGV0cyBvbmx5IG9uIHRoZSBicm93c2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb250ZW50KGFzeW5jOiBib29sZWFuKTogdm9pZCB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICBQcmlzbS5oaWdobGlnaHRBbGwoYXN5bmMpO1xuICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHsgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzczOTQ3ODcvNTg4NTIxXG4gICAgY29uc3QgdHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdHh0LnZhbHVlO1xufVxuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbmZpZyB7XG4gIC8qKiBjb25maWcgbW9kdWUgKi9cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ3hNZFNlcnZpY2UgfSBmcm9tICcuL25neC1tZC5zZXJ2aWNlJztcbmltcG9ydCB7IE5neE1kQ29uZmlnIH0gZnJvbSAnLi9uZ3gtbWQuY29uZmlnJztcbmltcG9ydCB7IE5neE1kQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hNZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05neE1kU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOZ3hNZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtOZ3hNZENvbmZpZ11cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiUHJpc20uaGlnaGxpZ2h0QWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7SUFhRSxZQUFvQixLQUFpQjtRQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZO3lCQUZaLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztRQUc1RSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELFVBQVUsQ0FBQyxJQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQzNHOzs7OztJQUVNLGdCQUFnQixDQUFDLE9BQVk7UUFDbEMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUk7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFLUCxP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
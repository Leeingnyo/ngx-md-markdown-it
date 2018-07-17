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
var NgxMdService = /** @class */ (function () {
    function NgxMdService(_http) {
        this._http = _http;
        this._renderer = MarkdownIt({ linkify: true }).use(MarkdownItFootnote);
        this.extendRenderer();
        this.setMarkedOptions({});
    }
    // get the content from remote resource
    /**
     * @param {?} path
     * @return {?}
     */
    NgxMdService.prototype.getContent = /**
     * @param {?} path
     * @return {?}
     */
    function (path) {
        return this._http.get(path, { responseType: 'text' }).pipe(map(function (res) { return res; }), catchError(this.handleError));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    NgxMdService.prototype.setMarkedOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
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
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgxMdService.prototype.compile = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return this._renderer.render(data);
    };
    /**
     * @return {?}
     */
    NgxMdService.prototype.extendRenderer = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var defaultRender = this._renderer.renderer.rules.link_open || function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };
        this._renderer.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            /** @type {?} */
            var aIndex = tokens[idx].attrIndex('target');
            if (aIndex < 0) {
                tokens[idx].attrPush(['target', '_blank']);
            }
            else {
                tokens[idx].attrs[aIndex][1] = '_blank';
            }
            return defaultRender(tokens, idx, options, env, self);
        };
        /** @type {?} */
        var currentPageLinkWithoutHash = location.origin + location.pathname + location.search;
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
    };
    /**
     * @param {?} error
     * @return {?}
     */
    NgxMdService.prototype.handleError = /**
     * @param {?} error
     * @return {?}
     */
    function (error) {
        /** @type {?} */
        var errMsg;
        if (error instanceof fetch) {
            /** @type {?} */
            var body = error.json() || '';
            /** @type {?} */
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return throwError(errMsg);
    };
    NgxMdService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxMdService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ NgxMdService.ngInjectableDef = defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(inject(HttpClient)); }, token: NgxMdService, providedIn: "root" });
    return NgxMdService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxMdComponent = /** @class */ (function () {
    function NgxMdComponent(_mdService, _el, platformId) {
        this._mdService = _mdService;
        this._el = _el;
        this.platformId = platformId;
        this.changeLog = [];
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
        this._mdService.getContent(this._path)
            .subscribe(function (data) {
            _this._md = _this._ext !== 'md' ? '```' + _this._ext + '\n' + data + '\n```' : data;
            _this._el.nativeElement.innerHTML = _this._mdService.compile(_this.prepare(_this._md));
            _this.highlightContent(false);
        }, function (err) { return _this.handleError; });
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
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
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
            highlightAll(async);
        }
    };
    NgxMdComponent.decorators = [
        { type: Component, args: [{
                    selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                    template: '<ng-content></ng-content>',
                    styles: [
                        ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxMdComponent.ctorParameters = function () { return [
        { type: NgxMdService },
        { type: ElementRef },
        { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    NgxMdComponent.propDecorators = {
        path: [{ type: Input }],
        data: [{ type: Input }]
    };
    return NgxMdComponent;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxMdConfig = /** @class */ (function () {
    function NgxMdConfig() {
    }
    NgxMdConfig.decorators = [
        { type: Injectable },
    ];
    return NgxMdConfig;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxMdModule = /** @class */ (function () {
    function NgxMdModule() {
    }
    /**
     * @return {?}
     */
    NgxMdModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxMdModule,
            providers: [NgxMdConfig]
        };
    };
    NgxMdModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    declarations: [NgxMdComponent],
                    providers: [NgxMdService],
                    exports: [NgxMdComponent],
                },] },
    ];
    return NgxMdModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxMdService, NgxMdComponent, NgxMdModule, NgxMdConfig as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb21wb25lbnQudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLmNvbmZpZy50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IE1hcmtkb3duSXRGb290bm90ZSBmcm9tICdtYXJrZG93bi1pdC1mb290bm90ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBNYXJrZG93bkl0KHsgbGlua2lmeTogdHJ1ZSB9KS51c2UoTWFya2Rvd25JdEZvb3Rub3RlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgdGhpcy5leHRlbmRSZW5kZXJlcigpO1xuICAgIHRoaXMuc2V0TWFya2VkT3B0aW9ucyh7fSk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGNvbnRlbnQgZnJvbSByZW1vdGUgcmVzb3VyY2VcbiAgZ2V0Q29udGVudChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHBhdGgsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pLnBpcGUobWFwKHJlcyA9PiByZXMpLCBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRNYXJrZWRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGdmbTogdHJ1ZSxcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIGJyZWFrczogZmFsc2UsXG4gICAgICBwZWRhbnRpYzogZmFsc2UsXG4gICAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgICBzbWFydExpc3RzOiB0cnVlLFxuICAgICAgc21hcnR5cGFudHM6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcbiAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5yZW5kZXIoZGF0YSk7XG4gIH1cblxuICAvLyBleHRlbmQgbWFya2VkIHJlbmRlciB0byBzdXBwb3J0IHRvZG8gY2hlY2tib3hcbiAgcHJpdmF0ZSBleHRlbmRSZW5kZXJlcigpIHtcbiAgICAvLyBtYWtlIHRhcmdldCBvZiBhbmNob3IgdGFnIGJsYW5rXG4gICAgLy8gUmVtZW1iZXIgb2xkIHJlbmRlcmVyLCBpZiBvdmVycmlkZW4sIG9yIHByb3h5IHRvIGRlZmF1bHQgcmVuZGVyZXJcbiAgICBjb25zdCBkZWZhdWx0UmVuZGVyID0gdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMubGlua19vcGVuIHx8IGZ1bmN0aW9uKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlclRva2VuKHRva2VucywgaWR4LCBvcHRpb25zKTtcbiAgICB9O1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiA9IGZ1bmN0aW9uICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICBjb25zdCBhSW5kZXggPSB0b2tlbnNbaWR4XS5hdHRySW5kZXgoJ3RhcmdldCcpO1xuXG4gICAgICBpZiAoYUluZGV4IDwgMCkge1xuICAgICAgICB0b2tlbnNbaWR4XS5hdHRyUHVzaChbJ3RhcmdldCcsICdfYmxhbmsnXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2tlbnNbaWR4XS5hdHRyc1thSW5kZXhdWzFdID0gJ19ibGFuayc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0UmVuZGVyKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpO1xuICAgIH07XG5cbiAgICAvLyBmb3IgYW5ndWxhciByb3V0ZWVyLCBhZGQgcHJlZml4IGxvY2F0aW9uLmhyZWYgd2l0aG91dCBmcmFnbWVudFxuICAgIGNvbnN0IGN1cnJlbnRQYWdlTGlua1dpdGhvdXRIYXNoID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWUgKyBsb2NhdGlvbi5zZWFyY2g7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMuZm9vdG5vdGVfcmVmID0gZnVuY3Rpb24gcmVuZGVyX2Zvb3Rub3RlX3JlZih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpIHtcbiAgICAgIHZhciBpZCAgICAgID0gc2xmLnJ1bGVzLmZvb3Rub3RlX2FuY2hvcl9uYW1lKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG4gICAgICB2YXIgY2FwdGlvbiA9IHNsZi5ydWxlcy5mb290bm90ZV9jYXB0aW9uKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG4gICAgICB2YXIgcmVmaWQgICA9IGlkO1xuXG4gICAgICBpZiAodG9rZW5zW2lkeF0ubWV0YS5zdWJJZCA+IDApIHtcbiAgICAgICAgcmVmaWQgKz0gJzonICsgdG9rZW5zW2lkeF0ubWV0YS5zdWJJZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICc8c3VwIGNsYXNzPVwiZm9vdG5vdGUtcmVmXCI+PGEgaHJlZj1cIicgKyBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCArICcjZm4nICsgaWQgKyAnXCIgaWQ9XCJmbnJlZicgKyByZWZpZCArICdcIj4nICsgY2FwdGlvbiArICc8L2E+PC9zdXA+JztcbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMuZm9vdG5vdGVfYW5jaG9yID0gZnVuY3Rpb24gcmVuZGVyX2Zvb3Rub3RlX2FuY2hvcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpIHtcbiAgICAgIHZhciBpZCA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuXG4gICAgICBpZiAodG9rZW5zW2lkeF0ubWV0YS5zdWJJZCA+IDApIHtcbiAgICAgICAgaWQgKz0gJzonICsgdG9rZW5zW2lkeF0ubWV0YS5zdWJJZDtcbiAgICAgIH1cblxuICAgICAgLyogw6LChsKpIHdpdGggZXNjYXBlIGNvZGUgdG8gcHJldmVudCBkaXNwbGF5IGFzIEFwcGxlIEVtb2ppIG9uIGlPUyAqL1xuICAgICAgcmV0dXJuICcgPGEgaHJlZj1cIicgKyBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCArICcjZm5yZWYnICsgaWQgKyAnXCIgY2xhc3M9XCJmb290bm90ZS1iYWNrcmVmXCI+XFx1MjFhOVxcdUZFMEU8L2E+JztcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgZXJyb3JcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogYW55IHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZmV0Y2gpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XG4gICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYXJrZG93bixbTWFya2Rvd25dLG5neC1tZCxbTmd4TWRdJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgLnRva2VuLm9wZXJhdG9yLCAudG9rZW4uZW50aXR5LCAudG9rZW4udXJsLCAubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsIC5zdHlsZSAudG9rZW4uc3RyaW5nIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbXBvbmVudCBpbXBsZW1lbnRzICBBZnRlclZpZXdJbml0IHtcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZGF0YTogc3RyaW5nO1xuICAgIHByaXZhdGUgX21kOiBhbnk7XG4gICAgcHJpdmF0ZSBfZXh0OiBzdHJpbmc7XG4gICAgY2hhbmdlTG9nOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX21kU2VydmljZTogTmd4TWRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBzdHJpbmdcbiAgICApIHsgfVxuXG4gICBcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BhdGggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkYXRhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIG9uIGlucHV0XG4gICAgb25EYXRhQ2hhbmdlKGRhdGE6IHN0cmluZykge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZShkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9XG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBZnRlciB2aWV3IGluaXRcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAodGhpcy5fcGF0aCkge1xuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5fZGF0YSkge1xuICAgICAgICB0aGlzLnByb2Nlc3NSYXcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzUmF3KCkge1xuICAgICAgdGhpcy5fbWQgPSB0aGlzLnByZXBhcmUoZGVjb2RlSHRtbCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCkpO1xuICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLl9tZCk7XG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByZW1vdGUgY29uZW50O1xuICAgICAqL1xuICAgIG9uUGF0aENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fZXh0ID0gdGhpcy5fcGF0aCAmJiB0aGlzLl9wYXRoLnNwbGl0KCcuJykuc3BsaWNlKC0xKS5qb2luKCk7XG4gICAgICAgIHRoaXMuX21kU2VydmljZS5nZXRDb250ZW50KHRoaXMuX3BhdGgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX21kID0gdGhpcy5fZXh0ICE9PSAnbWQnID8gJ2BgYCcgKyB0aGlzLl9leHQgKyAnXFxuJyArIGRhdGEgKyAnXFxuYGBgJyA6IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLnByZXBhcmUodGhpcy5fbWQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYXRjaCBodHRwIGVycm9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgc3RyaW5nXG4gICAgICovXG4gICAgIHByZXBhcmUocmF3OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZXh0ID09PSAnbWQnIHx8ICF0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIGxldCBpc0NvZGVCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHJhdy5zcGxpdCgnXFxuJykubWFwKChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltTGVmdChsaW5lKS5zdWJzdHJpbmcoMCwgMykgPT09ICdgYGAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQ29kZUJsb2NrID0gIWlzQ29kZUJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNDb2RlQmxvY2sgPyBsaW5lIDogbGluZS50cmltKCk7XG4gICAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3LnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaW0gbGVmdCB3aGl0ZXNwYWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmltTGVmdChsaW5lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBQcmlzbSB0byBoaWdobGlnaHQgY29kZSBzbmlwcGV0cyBvbmx5IG9uIHRoZSBicm93c2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb250ZW50KGFzeW5jOiBib29sZWFuKTogdm9pZCB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICBQcmlzbS5oaWdobGlnaHRBbGwoYXN5bmMpO1xuICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHsgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzczOTQ3ODcvNTg4NTIxXG4gICAgY29uc3QgdHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdHh0LnZhbHVlO1xufVxuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbmZpZyB7XG4gIC8qKiBjb25maWcgbW9kdWUgKi9cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ3hNZFNlcnZpY2UgfSBmcm9tICcuL25neC1tZC5zZXJ2aWNlJztcbmltcG9ydCB7IE5neE1kQ29uZmlnIH0gZnJvbSAnLi9uZ3gtbWQuY29uZmlnJztcbmltcG9ydCB7IE5neE1kQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hNZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05neE1kU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOZ3hNZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtOZ3hNZENvbmZpZ11cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsiUHJpc20uaGlnaGxpZ2h0QWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUFhRSxzQkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTt5QkFGWixVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7UUFHNUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQjs7Ozs7O0lBR0QsaUNBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxHQUFBLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDM0c7Ozs7O0lBRU0sdUNBQWdCOzs7O2NBQUMsT0FBWTtRQUNsQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUN0QixHQUFHLEVBQUUsSUFBSTtZQUNULE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLEtBQUs7WUFDYixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsVUFBVSxFQUFFLElBQUk7WUFDaEIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsRUFBRSxP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
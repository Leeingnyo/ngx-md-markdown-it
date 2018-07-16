(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('rxjs/operators'), require('markdown-it'), require('markdown-it-footnote'), require('@angular/common'), require('prismjs')) :
    typeof define === 'function' && define.amd ? define('ngx-md', ['exports', '@angular/core', '@angular/common/http', 'rxjs', 'rxjs/operators', 'markdown-it', 'markdown-it-footnote', '@angular/common', 'prismjs'], factory) :
    (factory((global['ngx-md'] = {}),global.ng.core,global.ng.common.http,global.rxjs,global.rxjs.operators,null,null,global.ng.common,null));
}(this, (function (exports,i0,i1,rxjs,operators,MarkdownIt,MarkdownItFootnote,common,Prism) { 'use strict';

    MarkdownIt = MarkdownIt && MarkdownIt.hasOwnProperty('default') ? MarkdownIt['default'] : MarkdownIt;
    MarkdownItFootnote = MarkdownItFootnote && MarkdownItFootnote.hasOwnProperty('default') ? MarkdownItFootnote['default'] : MarkdownItFootnote;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdService = (function () {
        function NgxMdService(_http) {
            this._http = _http;
            this._renderer = MarkdownIt({ linkify: true }).use(MarkdownItFootnote);
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
                return this._http.get(path, { responseType: 'text' }).pipe(operators.map(function (res) { return res; }), operators.catchError(this.handleError));
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
                return rxjs.throwError(errMsg);
            };
        NgxMdService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxMdService.ctorParameters = function () {
            return [
                { type: i1.HttpClient }
            ];
        };
        /** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient)); }, token: NgxMdService, providedIn: "root" });
        return NgxMdService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdComponent = (function () {
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
             */ function (value) {
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
             */ function (value) {
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
                if (common.isPlatformBrowser(this.platformId)) {
                    Prism.highlightAll(async);
                }
            };
        NgxMdComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'markdown,[Markdown],ngx-md,[NgxMd]',
                        template: '<ng-content></ng-content>',
                        styles: [
                            ".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n            background: none;\n        }"
                        ]
                    },] },
        ];
        /** @nocollapse */
        NgxMdComponent.ctorParameters = function () {
            return [
                { type: NgxMdService },
                { type: i0.ElementRef },
                { type: String, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
            ];
        };
        NgxMdComponent.propDecorators = {
            path: [{ type: i0.Input }],
            data: [{ type: i0.Input }]
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
    var NgxMdConfig = (function () {
        function NgxMdConfig() {
        }
        NgxMdConfig.decorators = [
            { type: i0.Injectable },
        ];
        return NgxMdConfig;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxMdModule = (function () {
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
            { type: i0.NgModule, args: [{
                        imports: [i1.HttpClientModule],
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

    exports.NgxMdService = NgxMdService;
    exports.NgxMdComponent = NgxMdComponent;
    exports.NgxMdModule = NgxMdModule;
    exports.ɵa = NgxMdConfig;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuc2VydmljZS50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb25maWcudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcydcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0JztcbmltcG9ydCBNYXJrZG93bkl0Rm9vdG5vdGUgZnJvbSAnbWFya2Rvd24taXQtZm9vdG5vdGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZFNlcnZpY2Uge1xuICBwcml2YXRlIF9yZW5kZXJlcjogYW55ID0gTWFya2Rvd25JdCh7IGxpbmtpZnk6IHRydWUgfSkudXNlKE1hcmtkb3duSXRGb290bm90ZSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xuICAgIC8vIFJlbWVtYmVyIG9sZCByZW5kZXJlciwgaWYgb3ZlcnJpZGVuLCBvciBwcm94eSB0byBkZWZhdWx0IHJlbmRlcmVyXG4gICAgY29uc3QgZGVmYXVsdFJlbmRlciA9IHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiB8fCBmdW5jdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5saW5rX29wZW4gPSBmdW5jdGlvbiAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikge1xuICAgICAgY29uc3QgYUluZGV4ID0gdG9rZW5zW2lkeF0uYXR0ckluZGV4KCd0YXJnZXQnKTtcblxuICAgICAgaWYgKGFJbmRleCA8IDApIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0clB1c2goWyd0YXJnZXQnLCAnX2JsYW5rJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0cnNbYUluZGV4XVsxXSA9ICdfYmxhbmsnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKTtcbiAgICB9O1xuICAgIHRoaXMuc2V0TWFya2VkT3B0aW9ucyh7fSk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGNvbnRlbnQgZnJvbSByZW1vdGUgcmVzb3VyY2VcbiAgZ2V0Q29udGVudChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgcmV0dXJuIHRoaXMuX2h0dHAuZ2V0KHBhdGgsIHtyZXNwb25zZVR5cGU6ICd0ZXh0J30pLnBpcGUobWFwKHJlcyA9PiByZXMpLCBjYXRjaEVycm9yKHRoaXMuaGFuZGxlRXJyb3IpKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRNYXJrZWRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGdmbTogdHJ1ZSxcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIGJyZWFrczogZmFsc2UsXG4gICAgICBwZWRhbnRpYzogZmFsc2UsXG4gICAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgICBzbWFydExpc3RzOiB0cnVlLFxuICAgICAgc21hcnR5cGFudHM6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcbiAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5yZW5kZXIoZGF0YSk7XG4gIH1cblxuICAvLyBoYW5kbGUgZXJyb3JcbiAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogYW55IHtcbiAgICBsZXQgZXJyTXNnOiBzdHJpbmc7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZmV0Y2gpIHtcbiAgICAgIGNvbnN0IGJvZHkgPSBlcnJvci5qc29uKCkgfHwgJyc7XG4gICAgICBjb25zdCBlcnIgPSBib2R5LmVycm9yIHx8IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICAgICAgZXJyTXNnID0gYCR7ZXJyb3Iuc3RhdHVzfSAtICR7ZXJyb3Iuc3RhdHVzVGV4dCB8fCAnJ30gJHtlcnJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyTXNnID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UgOiBlcnJvci50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJNc2cpO1xuICB9XG59XG4iLCJcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBBZnRlclZpZXdJbml0LCBJbnB1dCwgUExBVEZPUk1fSUQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgKiBhcyBQcmlzbSBmcm9tICdwcmlzbWpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtYXJrZG93bixbTWFya2Rvd25dLG5neC1tZCxbTmd4TWRdJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgLnRva2VuLm9wZXJhdG9yLCAudG9rZW4uZW50aXR5LCAudG9rZW4udXJsLCAubGFuZ3VhZ2UtY3NzIC50b2tlbi5zdHJpbmcsIC5zdHlsZSAudG9rZW4uc3RyaW5nIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIH1gXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbXBvbmVudCBpbXBsZW1lbnRzICBBZnRlclZpZXdJbml0IHtcbiAgICBwcml2YXRlIF9wYXRoOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZGF0YTogc3RyaW5nO1xuICAgIHByaXZhdGUgX21kOiBhbnk7XG4gICAgcHJpdmF0ZSBfZXh0OiBzdHJpbmc7XG4gICAgY2hhbmdlTG9nOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX21kU2VydmljZTogTmd4TWRTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBzdHJpbmdcbiAgICApIHsgfVxuXG4gICBcblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHBhdGgodmFsdWU6IHN0cmluZykge1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3BhdGggPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBkYXRhKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25EYXRhQ2hhbmdlKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIG9uIGlucHV0XG4gICAgb25EYXRhQ2hhbmdlKGRhdGE6IHN0cmluZykge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZShkYXRhKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICB9XG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBBZnRlciB2aWV3IGluaXRcbiAgICAgKi9cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICBpZiAodGhpcy5fcGF0aCkge1xuICAgICAgICB0aGlzLm9uUGF0aENoYW5nZSgpO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5fZGF0YSkge1xuICAgICAgICB0aGlzLnByb2Nlc3NSYXcoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9jZXNzUmF3KCkge1xuICAgICAgdGhpcy5fbWQgPSB0aGlzLnByZXBhcmUoZGVjb2RlSHRtbCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCkpO1xuICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLl9tZCk7XG4gICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGdldCByZW1vdGUgY29uZW50O1xuICAgICAqL1xuICAgIG9uUGF0aENoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5fZXh0ID0gdGhpcy5fcGF0aCAmJiB0aGlzLl9wYXRoLnNwbGl0KCcuJykuc3BsaWNlKC0xKS5qb2luKCk7XG4gICAgICAgIHRoaXMuX21kU2VydmljZS5nZXRDb250ZW50KHRoaXMuX3BhdGgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX21kID0gdGhpcy5fZXh0ICE9PSAnbWQnID8gJ2BgYCcgKyB0aGlzLl9leHQgKyAnXFxuJyArIGRhdGEgKyAnXFxuYGBgJyA6IGRhdGE7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLl9tZFNlcnZpY2UuY29tcGlsZSh0aGlzLnByZXBhcmUodGhpcy5fbWQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodENvbnRlbnQoZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVyciA9PiB0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBjYXRjaCBodHRwIGVycm9yXG4gICAgICovXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcihlcnJvcjogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQW4gZXJyb3Igb2NjdXJyZWQnLCBlcnJvcik7IC8vIGZvciBkZW1vIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByZXBhcmUgc3RyaW5nXG4gICAgICovXG4gICAgIHByZXBhcmUocmF3OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFyYXcpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fZXh0ID09PSAnbWQnIHx8ICF0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgIGxldCBpc0NvZGVCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHJhdy5zcGxpdCgnXFxuJykubWFwKChsaW5lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmltTGVmdChsaW5lKS5zdWJzdHJpbmcoMCwgMykgPT09ICdgYGAnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzQ29kZUJsb2NrID0gIWlzQ29kZUJsb2NrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaXNDb2RlQmxvY2sgPyBsaW5lIDogbGluZS50cmltKCk7XG4gICAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF3LnJlcGxhY2UoL1xcXCIvZywgJ1xcJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaW0gbGVmdCB3aGl0ZXNwYWNlXG4gICAgICovXG4gICAgcHJpdmF0ZSB0cmltTGVmdChsaW5lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZSBQcmlzbSB0byBoaWdobGlnaHQgY29kZSBzbmlwcGV0cyBvbmx5IG9uIHRoZSBicm93c2VyXG4gICAgICovXG4gICAgcHJpdmF0ZSBoaWdobGlnaHRDb250ZW50KGFzeW5jOiBib29sZWFuKTogdm9pZCB7XG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICBQcmlzbS5oaWdobGlnaHRBbGwoYXN5bmMpO1xuICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVjb2RlSHRtbChodG1sOiBzdHJpbmcpIHsgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzczOTQ3ODcvNTg4NTIxXG4gICAgY29uc3QgdHh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB0eHQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdHh0LnZhbHVlO1xufVxuXG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hNZENvbmZpZyB7XG4gIC8qKiBjb25maWcgbW9kdWUgKi9cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBOZ3hNZFNlcnZpY2UgfSBmcm9tICcuL25neC1tZC5zZXJ2aWNlJztcbmltcG9ydCB7IE5neE1kQ29uZmlnIH0gZnJvbSAnLi9uZ3gtbWQuY29uZmlnJztcbmltcG9ydCB7IE5neE1kQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbWQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtOZ3hNZENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW05neE1kU2VydmljZV0sXG4gIGV4cG9ydHM6IFtOZ3hNZENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kTW9kdWxlIHtcbiAgcHVibGljIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4TWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtOZ3hNZENvbmZpZ11cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsibWFwIiwiY2F0Y2hFcnJvciIsInRocm93RXJyb3IiLCJJbmplY3RhYmxlIiwiSHR0cENsaWVudCIsImlzUGxhdGZvcm1Ccm93c2VyIiwiUHJpc20uaGlnaGxpZ2h0QWxsIiwiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIkluamVjdCIsIlBMQVRGT1JNX0lEIiwiSW5wdXQiLCJOZ01vZHVsZSIsIkh0dHBDbGllbnRNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtRQWFFLHNCQUFvQixLQUFpQjtZQUFqQixVQUFLLEdBQUwsS0FBSyxDQUFZOzZCQUZaLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJ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
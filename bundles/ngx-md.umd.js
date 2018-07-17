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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuc2VydmljZS50cyIsIm5nOi8vbmd4LW1kL2xpYi9uZ3gtbWQuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtbWQvbGliL25neC1tZC5jb25maWcudHMiLCJuZzovL25neC1tZC9saWIvbmd4LW1kLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcydcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0JztcbmltcG9ydCBNYXJrZG93bkl0Rm9vdG5vdGUgZnJvbSAnbWFya2Rvd24taXQtZm9vdG5vdGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZFNlcnZpY2Uge1xuICBwcml2YXRlIF9yZW5kZXJlcjogYW55ID0gTWFya2Rvd25JdCh7IGxpbmtpZnk6IHRydWUgfSkudXNlKE1hcmtkb3duSXRGb290bm90ZSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldE1hcmtlZE9wdGlvbnMoe30pO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBjb250ZW50IGZyb20gcmVtb3RlIHJlc291cmNlXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoLCB7cmVzcG9uc2VUeXBlOiAndGV4dCd9KS5waXBlKG1hcChyZXMgPT4gcmVzKSwgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0TWFya2VkT3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBnZm06IHRydWUsXG4gICAgICB0YWJsZXM6IHRydWUsXG4gICAgICBicmVha3M6IGZhbHNlLFxuICAgICAgcGVkYW50aWM6IGZhbHNlLFxuICAgICAgc2FuaXRpemU6IGZhbHNlLFxuICAgICAgc21hcnRMaXN0czogdHJ1ZSxcbiAgICAgIHNtYXJ0eXBhbnRzOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIC8vIFRPRE9cbiAgfVxuXG4gIC8vIGNvbXBsZSBtYXJrZG93biB0byBodG1sXG4gIHB1YmxpYyBjb21waWxlKGRhdGE6IHN0cmluZykge1xuICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIucmVuZGVyKGRhdGEpO1xuICB9XG5cbiAgLy8gZXh0ZW5kIG1hcmtlZCByZW5kZXIgdG8gc3VwcG9ydCB0b2RvIGNoZWNrYm94XG4gIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XG4gICAgLy8gbWFrZSB0YXJnZXQgb2YgYW5jaG9yIHRhZyBibGFua1xuICAgIC8vIFJlbWVtYmVyIG9sZCByZW5kZXJlciwgaWYgb3ZlcnJpZGVuLCBvciBwcm94eSB0byBkZWZhdWx0IHJlbmRlcmVyXG4gICAgY29uc3QgZGVmYXVsdFJlbmRlciA9IHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiB8fCBmdW5jdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5saW5rX29wZW4gPSBmdW5jdGlvbiAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikge1xuICAgICAgY29uc3QgYUluZGV4ID0gdG9rZW5zW2lkeF0uYXR0ckluZGV4KCd0YXJnZXQnKTtcblxuICAgICAgaWYgKGFJbmRleCA8IDApIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0clB1c2goWyd0YXJnZXQnLCAnX2JsYW5rJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0cnNbYUluZGV4XVsxXSA9ICdfYmxhbmsnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKTtcbiAgICB9O1xuXG4gICAgLy8gZm9yIGFuZ3VsYXIgcm91dGVlciwgYWRkIHByZWZpeCBsb2NhdGlvbi5ocmVmIHdpdGhvdXQgZnJhZ21lbnRcbiAgICBjb25zdCBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX3JlZiA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9yZWYodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgICAgICA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIGNhcHRpb24gPSBzbGYucnVsZXMuZm9vdG5vdGVfY2FwdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIHJlZmlkICAgPSBpZDtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIHJlZmlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnPHN1cCBjbGFzcz1cImZvb3Rub3RlLXJlZlwiPjxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZuJyArIGlkICsgJ1wiIGlkPVwiZm5yZWYnICsgcmVmaWQgKyAnXCI+JyArIGNhcHRpb24gKyAnPC9hPjwvc3VwPic7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX2FuY2hvciA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9hbmNob3IodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgPSBzbGYucnVsZXMuZm9vdG5vdGVfYW5jaG9yX25hbWUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIGlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIC8qIMOiwobCqSB3aXRoIGVzY2FwZSBjb2RlIHRvIHByZXZlbnQgZGlzcGxheSBhcyBBcHBsZSBFbW9qaSBvbiBpT1MgKi9cbiAgICAgIHJldHVybiAnIDxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZucmVmJyArIGlkICsgJ1wiIGNsYXNzPVwiZm9vdG5vdGUtYmFja3JlZlwiPlxcdTIxYTlcXHVGRTBFPC9hPic7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIGVycm9yXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XG4gICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuIiwiXG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgSW5wdXQsIFBMQVRGT1JNX0lELCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neE1kU2VydmljZSB9IGZyb20gJy4vbmd4LW1kLnNlcnZpY2UnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgUHJpc20gZnJvbSAncHJpc21qcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbWFya2Rvd24sW01hcmtkb3duXSxuZ3gtbWQsW05neE1kXScsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+JyxcbiAgICBzdHlsZXM6IFtcbiAgICAgICAgYC50b2tlbi5vcGVyYXRvciwgLnRva2VuLmVudGl0eSwgLnRva2VuLnVybCwgLmxhbmd1YWdlLWNzcyAudG9rZW4uc3RyaW5nLCAuc3R5bGUgLnRva2VuLnN0cmluZyB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgICB9YFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWRDb21wb25lbnQgaW1wbGVtZW50cyAgQWZ0ZXJWaWV3SW5pdCB7XG4gICAgcHJpdmF0ZSBfcGF0aDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2RhdGE6IHN0cmluZztcbiAgICBwcml2YXRlIF9tZDogYW55O1xuICAgIHByaXZhdGUgX2V4dDogc3RyaW5nO1xuICAgIGNoYW5nZUxvZzogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9tZFNlcnZpY2U6IE5neE1kU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogc3RyaW5nXG4gICAgKSB7IH1cblxuICAgXG5cbiAgICBASW5wdXQoKVxuICAgIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9wYXRoID0gdmFsdWU7XG4gICAgICAgIHRoaXMub25QYXRoQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBzZXQgZGF0YSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgICAgICB0aGlzLm9uRGF0YUNoYW5nZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBvbiBpbnB1dFxuICAgIG9uRGF0YUNoYW5nZShkYXRhOiBzdHJpbmcpIHtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUoZGF0YSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgfVxuICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQWZ0ZXIgdmlldyBpbml0XG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgaWYgKHRoaXMuX3BhdGgpIHtcbiAgICAgICAgdGhpcy5vblBhdGhDaGFuZ2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2RhdGEpIHtcbiAgICAgICAgdGhpcy5wcm9jZXNzUmF3KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzc1JhdygpIHtcbiAgICAgIHRoaXMuX21kID0gdGhpcy5wcmVwYXJlKGRlY29kZUh0bWwodGhpcy5fZWwubmF0aXZlRWxlbWVudC5pbm5lckhUTUwpKTtcbiAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5fbWQpO1xuICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBnZXQgcmVtb3RlIGNvbmVudDtcbiAgICAgKi9cbiAgICBvblBhdGhDaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuX2V4dCA9IHRoaXMuX3BhdGggJiYgdGhpcy5fcGF0aC5zcGxpdCgnLicpLnNwbGljZSgtMSkuam9pbigpO1xuICAgICAgICB0aGlzLl9tZFNlcnZpY2UuZ2V0Q29udGVudCh0aGlzLl9wYXRoKVxuICAgICAgICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZCA9IHRoaXMuX2V4dCAhPT0gJ21kJyA/ICdgYGAnICsgdGhpcy5fZXh0ICsgJ1xcbicgKyBkYXRhICsgJ1xcbmBgYCcgOiBkYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5fbWRTZXJ2aWNlLmNvbXBpbGUodGhpcy5wcmVwYXJlKHRoaXMuX21kKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRDb250ZW50KGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnIgPT4gdGhpcy5oYW5kbGVFcnJvcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogY2F0Y2ggaHR0cCBlcnJvclxuICAgICAqL1xuICAgIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FuIGVycm9yIG9jY3VycmVkJywgZXJyb3IpOyAvLyBmb3IgZGVtbyBwdXJwb3NlcyBvbmx5XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVwYXJlIHN0cmluZ1xuICAgICAqL1xuICAgICBwcmVwYXJlKHJhdzogc3RyaW5nKSB7XG4gICAgICAgIGlmICghcmF3KSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2V4dCA9PT0gJ21kJyB8fCAhdGhpcy5wYXRoKSB7XG4gICAgICAgICAgICBsZXQgaXNDb2RlQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiByYXcuc3BsaXQoJ1xcbicpLm1hcCgobGluZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJpbUxlZnQobGluZSkuc3Vic3RyaW5nKDAsIDMpID09PSAnYGBgJykge1xuICAgICAgICAgICAgICAgICAgICBpc0NvZGVCbG9jayA9ICFpc0NvZGVCbG9jaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQ29kZUJsb2NrID8gbGluZSA6IGxpbmUudHJpbSgpO1xuICAgICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhdy5yZXBsYWNlKC9cXFwiL2csICdcXCcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmltIGxlZnQgd2hpdGVzcGFjZVxuICAgICAqL1xuICAgIHByaXZhdGUgdHJpbUxlZnQobGluZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBsaW5lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVc2UgUHJpc20gdG8gaGlnaGxpZ2h0IGNvZGUgc25pcHBldHMgb25seSBvbiB0aGUgYnJvd3NlclxuICAgICAqL1xuICAgIHByaXZhdGUgaGlnaGxpZ2h0Q29udGVudChhc3luYzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgUHJpc20uaGlnaGxpZ2h0QWxsKGFzeW5jKTtcbiAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlY29kZUh0bWwoaHRtbDogc3RyaW5nKSB7IC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83Mzk0Nzg3LzU4ODUyMVxuICAgIGNvbnN0IHR4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgdHh0LmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIHR4dC52YWx1ZTtcbn1cblxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4TWRDb25maWcge1xuICAvKiogY29uZmlnIG1vZHVlICovXG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ3hNZENvbmZpZyB9IGZyb20gJy4vbmd4LW1kLmNvbmZpZyc7XG5pbXBvcnQgeyBOZ3hNZENvbXBvbmVudCB9IGZyb20gJy4vbmd4LW1kLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmd4TWRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtOZ3hNZFNlcnZpY2VdLFxuICBleHBvcnRzOiBbTmd4TWRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1kTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbTmd4TWRDb25maWddXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIm1hcCIsImNhdGNoRXJyb3IiLCJ0aHJvd0Vycm9yIiwiSW5qZWN0YWJsZSIsIkh0dHBDbGllbnQiLCJpc1BsYXRmb3JtQnJvd3NlciIsIlByaXNtLmhpZ2hsaWdodEFsbCIsIkNvbXBvbmVudCIsIkVsZW1lbnRSZWYiLCJJbmplY3QiLCJQTEFURk9STV9JRCIsIklucHV0IiwiTmdNb2R1bGUiLCJIdHRwQ2xpZW50TW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7UUFhRSxzQkFBb0IsS0FBaUI7WUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTs2QkFGWixVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7WUFHNUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMzQjs7Ozs7O1FBR0QsaUNBQVU7Ozs7WUFBVixVQUFXLElBQVk7Z0JBQ25CLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDQSxhQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEdBQUEsQ0FBQyxFQUFFQyxvQkFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQzNHOzs7OztRQUVNLHVDQUFnQjs7OztzQkFBQyxPQUFZO2dCQUNsQyxPQUFPLEdBQUcs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
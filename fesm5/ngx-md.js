import { __spread } from 'tslib';
import { throwError } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import { isPlatformBrowser } from '@angular/common';
import { highlightAll } from 'prismjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Component, ElementRef, Input, PLATFORM_ID, Inject, EventEmitter, NgModule, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxMdService = /** @class */ (function () {
    function NgxMdService(_http, _domSanitizer) {
        this._http = _http;
        this._domSanitizer = _domSanitizer;
        this._renderer = MarkdownIt({ linkify: true, html: true }).use(MarkdownItFootnote);
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
        return this._http.get(path, { responseType: 'text' })
            .pipe(map(function (res) { return res; }), catchError(this.handleError));
    };
    Object.defineProperty(NgxMdService.prototype, "renderer", {
        get: /**
         * @return {?}
         */
        function () {
            return this._renderer;
        },
        enumerable: true,
        configurable: true
    });
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
     * @param {?} plugin
     * @param {...?} opts
     * @return {?}
     */
    NgxMdService.prototype.loadPlugin = /**
     * @param {?} plugin
     * @param {...?} opts
     * @return {?}
     */
    function (plugin) {
        var opts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            opts[_i - 1] = arguments[_i];
        }
        var _a;
        this._renderer = (_a = this._renderer).use.apply(_a, __spread([plugin], opts));
        return this;
    };
    /**
     * @return {?}
     */
    NgxMdService.prototype.extendRenderer = /**
     * @return {?}
     */
    function () {
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
                },] }
    ];
    /** @nocollapse */
    NgxMdService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: DomSanitizer }
    ]; };
    /** @nocollapse */ NgxMdService.ngInjectableDef = defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(inject(HttpClient), inject(DomSanitizer)); }, token: NgxMdService, providedIn: "root" });
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
            highlightAll(async);
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
        { type: Injectable }
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
                },] }
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

//# sourceMappingURL=ngx-md.js.map
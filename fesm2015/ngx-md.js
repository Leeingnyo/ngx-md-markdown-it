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
class NgxMdService {
    /**
     * @param {?} _http
     * @param {?} _domSanitizer
     */
    constructor(_http, _domSanitizer) {
        this._http = _http;
        this._domSanitizer = _domSanitizer;
        this._renderer = MarkdownIt({ linkify: true, html: true }).use(MarkdownItFootnote);
        this.extendRenderer();
        this.setMarkedOptions({});
    }
    /**
     * @param {?} path
     * @return {?}
     */
    getContent(path) {
        return this._http.get(path, { responseType: 'text' })
            .pipe(map(res => res), catchError(this.handleError));
    }
    /**
     * @return {?}
     */
    get renderer() {
        return this._renderer;
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
     * @param {?} plugin
     * @param {...?} opts
     * @return {?}
     */
    loadPlugin(plugin, ...opts) {
        this._renderer = this._renderer.use(plugin, ...opts);
        return this;
    }
    /**
     * @return {?}
     */
    extendRenderer() {
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
            },] }
];
/** @nocollapse */
NgxMdService.ctorParameters = () => [
    { type: HttpClient },
    { type: DomSanitizer }
];
/** @nocollapse */ NgxMdService.ngInjectableDef = defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(inject(HttpClient), inject(DomSanitizer)); }, token: NgxMdService, providedIn: "root" });

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
        this.errror = new EventEmitter();
        this.loaded = new EventEmitter();
        /**
         * Boolean indicating if the markdown content should be sanitized to avoid script injections
         */
        this.sanitizeHtml = true;
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
        this._mdService.getContent(this._path).pipe(catchError(this.handleError))
            .subscribe(data => {
            this.loaded.emit(data);
            this._md = this._ext !== 'md' ? '```' + this._ext + '\n' + data + '\n```' : data;
            this._el.nativeElement.innerHTML = this._mdService.compile(this.prepare(this._md));
            this.highlightContent(false);
        });
    }
    /**
     * catch http error
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        this.errror.emit(error);
        console.error('An error occurred', error); // for demo purposes only
        return error.message || error;
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
                // If the first non-blank chars are an opening/closing code block, toggle the flag
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
                styles: [`.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
            background: none;
        }
        .md-checkbox{
            vertical-align: middle; margin: 0 0.2em 0.25em -1.6em; font-size: 16px;
        }`]
            }] }
];
/** @nocollapse */
NgxMdComponent.ctorParameters = () => [
    { type: NgxMdService },
    { type: ElementRef },
    { type: String, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
NgxMdComponent.propDecorators = {
    path: [{ type: Input }],
    data: [{ type: Input }],
    sanitizeHtml: [{ type: Input }]
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
    { type: Injectable }
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
            },] }
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

//# sourceMappingURL=ngx-md.js.map
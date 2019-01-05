/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/platform-browser";
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
        this._renderer = (_a = this._renderer).use.apply(_a, tslib_1.__spread([plugin], opts));
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
    /** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient), i0.inject(i2.DomSanitizer)); }, token: NgxMdService, providedIn: "root" });
    return NgxMdService;
}());
export { NgxMdService };
if (false) {
    /** @type {?} */
    NgxMdService.prototype._renderer;
    /** @type {?} */
    NgxMdService.prototype._http;
    /** @type {?} */
    NgxMdService.prototype._domSanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQixNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEQsT0FBTyxFQUFFLFVBQVUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxrQkFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7SUFRcEQsc0JBQ1UsT0FDQTtRQURBLFVBQUssR0FBTCxLQUFLO1FBQ0wsa0JBQWEsR0FBYixhQUFhO3lCQUpFLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDO1FBTXhGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDM0I7SUFFRCx1Q0FBdUM7Ozs7O0lBQ3ZDLGlDQUFVOzs7O0lBQVYsVUFBVyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQ2xELElBQUksQ0FDSCxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLEVBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDN0IsQ0FBQztLQUNIOzBC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QUNuQixJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7O1lBQzFCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7O1lBQ2hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxNQUFNLEdBQU0sS0FBSyxDQUFDLE1BQU0sWUFBTSxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsVUFBSSxHQUFLLENBQUM7U0FDL0Q7YUFBTTtZQUNMLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDM0Q7UUFDRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O2dCQXhGN0IsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFUUSxVQUFVO2dCQUdWLFlBQVk7Ozt1QkFKckI7O1NBV2EsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IE1hcmtkb3duSXRGb290bm90ZSBmcm9tICdtYXJrZG93bi1pdC1mb290bm90ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBNYXJrZG93bkl0KHsgbGlua2lmeTogdHJ1ZSwgaHRtbDogdHJ1ZSB9KS51c2UoTWFya2Rvd25JdEZvb3Rub3RlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldE1hcmtlZE9wdGlvbnMoe30pO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBjb250ZW50IGZyb20gcmVtb3RlIHJlc291cmNlXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSlcbiAgICAucGlwZShcbiAgICAgIG1hcChyZXMgPT4gcmVzKSxcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldCByZW5kZXJlcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRNYXJrZWRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGdmbTogdHJ1ZSxcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIGJyZWFrczogZmFsc2UsXG4gICAgICBwZWRhbnRpYzogZmFsc2UsXG4gICAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgICBzbWFydExpc3RzOiB0cnVlLFxuICAgICAgc21hcnR5cGFudHM6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcbiAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5yZW5kZXIoZGF0YSk7XG4gIH1cblxuICAvLyBhZGQgcGx1Z2luXG4gIHB1YmxpYyBsb2FkUGx1Z2luKHBsdWdpbiwgLi4ub3B0cykge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXIudXNlKHBsdWdpbiwgLi4ub3B0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBleHRlbmQgbWFya2VkIHJlbmRlciB0byBzdXBwb3J0IGZvb3Rub3RlXG4gIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XG4gICAgLy8gZm9yIGFuZ3VsYXIgcm91dGVlciwgYWRkIHByZWZpeCBsb2NhdGlvbi5ocmVmIHdpdGhvdXQgZnJhZ21lbnRcbiAgICBjb25zdCBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX3JlZiA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9yZWYodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgICAgICA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIGNhcHRpb24gPSBzbGYucnVsZXMuZm9vdG5vdGVfY2FwdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIHJlZmlkICAgPSBpZDtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIHJlZmlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnPHN1cCBjbGFzcz1cImZvb3Rub3RlLXJlZlwiPjxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZuJyArIGlkICsgJ1wiIGlkPVwiZm5yZWYnICsgcmVmaWQgKyAnXCI+JyArIGNhcHRpb24gKyAnPC9hPjwvc3VwPic7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX2FuY2hvciA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9hbmNob3IodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgPSBzbGYucnVsZXMuZm9vdG5vdGVfYW5jaG9yX25hbWUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIGlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIC8qIOKGqSB3aXRoIGVzY2FwZSBjb2RlIHRvIHByZXZlbnQgZGlzcGxheSBhcyBBcHBsZSBFbW9qaSBvbiBpT1MgKi9cbiAgICAgIHJldHVybiAnIDxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZucmVmJyArIGlkICsgJ1wiIGNsYXNzPVwiZm9vdG5vdGUtYmFja3JlZlwiPlxcdTIxYTlcXHVGRTBFPC9hPic7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIGVycm9yXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XG4gICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuXG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
export class NgxMdService {
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
/** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient), i0.inject(i2.DomSanitizer)); }, token: NgxMdService, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgxMdService.prototype._renderer;
    /** @type {?} */
    NgxMdService.prototype._http;
    /** @type {?} */
    NgxMdService.prototype._domSanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBS3RELE1BQU0sT0FBTyxZQUFZOzs7OztJQUd2QixZQUNVLE9BQ0E7UUFEQSxVQUFLLEdBQUwsS0FBSztRQUNMLGtCQUFhLEdBQWIsYUFBYTt5QkFKRSxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztRQU14RixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQ2xELElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDZixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixDQUFDO0tBQ0g7Ozs7UUFFVSxRQUFR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OztZQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sTUFBTSxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUUsQ0FBQztTQUMvRDthQUFNO1lBQ0wsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMzRDtRQUNELE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O1lBeEY3QixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFUUSxVQUFVO1lBR1YsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IE1hcmtkb3duSXRGb290bm90ZSBmcm9tICdtYXJrZG93bi1pdC1mb290bm90ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBNYXJrZG93bkl0KHsgbGlua2lmeTogdHJ1ZSwgaHRtbDogdHJ1ZSB9KS51c2UoTWFya2Rvd25JdEZvb3Rub3RlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldE1hcmtlZE9wdGlvbnMoe30pO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBjb250ZW50IGZyb20gcmVtb3RlIHJlc291cmNlXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSlcbiAgICAucGlwZShcbiAgICAgIG1hcChyZXMgPT4gcmVzKSxcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldCByZW5kZXJlcigpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgfVxuXG4gIHB1YmxpYyBzZXRNYXJrZWRPcHRpb25zKG9wdGlvbnM6IGFueSkge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGdmbTogdHJ1ZSxcbiAgICAgIHRhYmxlczogdHJ1ZSxcbiAgICAgIGJyZWFrczogZmFsc2UsXG4gICAgICBwZWRhbnRpYzogZmFsc2UsXG4gICAgICBzYW5pdGl6ZTogZmFsc2UsXG4gICAgICBzbWFydExpc3RzOiB0cnVlLFxuICAgICAgc21hcnR5cGFudHM6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgLy8gVE9ET1xuICB9XG5cbiAgLy8gY29tcGxlIG1hcmtkb3duIHRvIGh0bWxcbiAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nKSB7XG4gICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5yZW5kZXIoZGF0YSk7XG4gIH1cblxuICAvLyBhZGQgcGx1Z2luXG4gIHB1YmxpYyBsb2FkUGx1Z2luKHBsdWdpbiwgLi4ub3B0cykge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gdGhpcy5fcmVuZGVyZXIudXNlKHBsdWdpbiwgLi4ub3B0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBleHRlbmQgbWFya2VkIHJlbmRlciB0byBzdXBwb3J0IGZvb3Rub3RlXG4gIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XG4gICAgLy8gZm9yIGFuZ3VsYXIgcm91dGVlciwgYWRkIHByZWZpeCBsb2NhdGlvbi5ocmVmIHdpdGhvdXQgZnJhZ21lbnRcbiAgICBjb25zdCBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX3JlZiA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9yZWYodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgICAgICA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIGNhcHRpb24gPSBzbGYucnVsZXMuZm9vdG5vdGVfY2FwdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIHJlZmlkICAgPSBpZDtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIHJlZmlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnPHN1cCBjbGFzcz1cImZvb3Rub3RlLXJlZlwiPjxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZuJyArIGlkICsgJ1wiIGlkPVwiZm5yZWYnICsgcmVmaWQgKyAnXCI+JyArIGNhcHRpb24gKyAnPC9hPjwvc3VwPic7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX2FuY2hvciA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9hbmNob3IodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgPSBzbGYucnVsZXMuZm9vdG5vdGVfYW5jaG9yX25hbWUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIGlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIC8qIOKGqSB3aXRoIGVzY2FwZSBjb2RlIHRvIHByZXZlbnQgZGlzcGxheSBhcyBBcHBsZSBFbW9qaSBvbiBpT1MgKi9cbiAgICAgIHJldHVybiAnIDxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZucmVmJyArIGlkICsgJ1wiIGNsYXNzPVwiZm9vdG5vdGUtYmFja3JlZlwiPlxcdTIxYTlcXHVGRTBFPC9hPic7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIGVycm9yXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XG4gICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuXG4iXX0=
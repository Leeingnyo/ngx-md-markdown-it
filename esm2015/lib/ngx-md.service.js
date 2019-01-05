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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7O0FBS3RELE1BQU0sT0FBTyxZQUFZOzs7OztJQUd2QixZQUNVLE9BQ0E7UUFEQSxVQUFLLEdBQUwsS0FBSztRQUNMLGtCQUFhLEdBQWIsYUFBYTt5QkFKRSxVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztRQU14RixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUdELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDO2FBQ2xELElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDZixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixDQUFDO0tBQ0g7Ozs7O0lBRU0sZ0JB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U2VjdXJpdHlDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgdGhyb3dFcnJvciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XG5pbXBvcnQgTWFya2Rvd25JdEZvb3Rub3RlIGZyb20gJ21hcmtkb3duLWl0LWZvb3Rub3RlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4TWRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IGFueSA9IE1hcmtkb3duSXQoeyBsaW5raWZ5OiB0cnVlLCBodG1sOiB0cnVlIH0pLnVzZShNYXJrZG93bkl0Rm9vdG5vdGUpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7XG4gICAgdGhpcy5leHRlbmRSZW5kZXJlcigpO1xuICAgIHRoaXMuc2V0TWFya2VkT3B0aW9ucyh7fSk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGNvbnRlbnQgZnJvbSByZW1vdGUgcmVzb3VyY2VcbiAgZ2V0Q29udGVudChwYXRoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoLCB7cmVzcG9uc2VUeXBlOiAndGV4dCd9KVxuICAgIC5waXBlKFxuICAgICAgbWFwKHJlcyA9PiByZXMpLFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgc2V0TWFya2VkT3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBnZm06IHRydWUsXG4gICAgICB0YWJsZXM6IHRydWUsXG4gICAgICBicmVha3M6IGZhbHNlLFxuICAgICAgcGVkYW50aWM6IGZhbHNlLFxuICAgICAgc2FuaXRpemU6IGZhbHNlLFxuICAgICAgc21hcnRMaXN0czogdHJ1ZSxcbiAgICAgIHNtYXJ0eXBhbnRzOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIC8vIFRPRE9cbiAgfVxuXG4gIC8vIGNvbXBsZSBtYXJrZG93biB0byBodG1sXG4gIHB1YmxpYyBjb21waWxlKGRhdGE6IHN0cmluZykge1xuICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIucmVuZGVyKGRhdGEpO1xuICB9XG5cbiAgLy8gZXh0ZW5kIG1hcmtlZCByZW5kZXIgdG8gc3VwcG9ydCB0b2RvIGNoZWNrYm94XG4gIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XG4gICAgLy8gbWFrZSB0YXJnZXQgb2YgYW5jaG9yIHRhZyBibGFua1xuICAgIC8vIFJlbWVtYmVyIG9sZCByZW5kZXJlciwgaWYgb3ZlcnJpZGVuLCBvciBwcm94eSB0byBkZWZhdWx0IHJlbmRlcmVyXG4gICAgY29uc3QgZGVmYXVsdFJlbmRlciA9IHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiB8fCBmdW5jdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5saW5rX29wZW4gPSBmdW5jdGlvbiAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikge1xuICAgICAgY29uc3QgYUluZGV4ID0gdG9rZW5zW2lkeF0uYXR0ckluZGV4KCd0YXJnZXQnKTtcblxuICAgICAgaWYgKGFJbmRleCA8IDApIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0clB1c2goWyd0YXJnZXQnLCAnX2JsYW5rJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0cnNbYUluZGV4XVsxXSA9ICdfYmxhbmsnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKTtcbiAgICB9O1xuXG4gICAgLy8gZm9yIGFuZ3VsYXIgcm91dGVlciwgYWRkIHByZWZpeCBsb2NhdGlvbi5ocmVmIHdpdGhvdXQgZnJhZ21lbnRcbiAgICBjb25zdCBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX3JlZiA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9yZWYodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgICAgICA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIGNhcHRpb24gPSBzbGYucnVsZXMuZm9vdG5vdGVfY2FwdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIHJlZmlkICAgPSBpZDtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIHJlZmlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnPHN1cCBjbGFzcz1cImZvb3Rub3RlLXJlZlwiPjxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZuJyArIGlkICsgJ1wiIGlkPVwiZm5yZWYnICsgcmVmaWQgKyAnXCI+JyArIGNhcHRpb24gKyAnPC9hPjwvc3VwPic7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX2FuY2hvciA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9hbmNob3IodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgPSBzbGYucnVsZXMuZm9vdG5vdGVfYW5jaG9yX25hbWUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIGlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIC8qIOKGqSB3aXRoIGVzY2FwZSBjb2RlIHRvIHByZXZlbnQgZGlzcGxheSBhcyBBcHBsZSBFbW9qaSBvbiBpT1MgKi9cbiAgICAgIHJldHVybiAnIDxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZucmVmJyArIGlkICsgJ1wiIGNsYXNzPVwiZm9vdG5vdGUtYmFja3JlZlwiPlxcdTIxYTlcXHVGRTBFPC9hPic7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIGVycm9yXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XG4gICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuXG4iXX0=
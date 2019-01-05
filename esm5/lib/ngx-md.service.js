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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQW1CLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGFBQWEsQ0FBQztBQUNyQyxPQUFPLGtCQUFrQixNQUFNLHNCQUFzQixDQUFDOzs7OztJQVFwRCxzQkFDVSxPQUNBO1FBREEsVUFBSyxHQUFMLEtBQUs7UUFDTCxrQkFBYSxHQUFiLGFBQWE7eUJBSkUsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7UUFNeEYsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQjtJQUVELHVDQUF1Qzs7Ozs7SUFDdkMsaUNBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDbEQsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsRUFBSCxDQUFHLENBQUMsRUFDZixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM3QixDQUFDO0tBQ0g7Ozs7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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFNlY3VyaXR5Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IHRocm93RXJyb3IsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IE1hcmtkb3duSXQgZnJvbSAnbWFya2Rvd24taXQnO1xuaW1wb3J0IE1hcmtkb3duSXRGb290bm90ZSBmcm9tICdtYXJrZG93bi1pdC1mb290bm90ZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neE1kU2VydmljZSB7XG4gIHByaXZhdGUgX3JlbmRlcmVyOiBhbnkgPSBNYXJrZG93bkl0KHsgbGlua2lmeTogdHJ1ZSwgaHRtbDogdHJ1ZSB9KS51c2UoTWFya2Rvd25JdEZvb3Rub3RlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9odHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXG4gICkge1xuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldE1hcmtlZE9wdGlvbnMoe30pO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBjb250ZW50IGZyb20gcmVtb3RlIHJlc291cmNlXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQocGF0aCwge3Jlc3BvbnNlVHlwZTogJ3RleHQnfSlcbiAgICAucGlwZShcbiAgICAgIG1hcChyZXMgPT4gcmVzKSxcbiAgICAgIGNhdGNoRXJyb3IodGhpcy5oYW5kbGVFcnJvcilcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHNldE1hcmtlZE9wdGlvbnMob3B0aW9uczogYW55KSB7XG4gICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgZ2ZtOiB0cnVlLFxuICAgICAgdGFibGVzOiB0cnVlLFxuICAgICAgYnJlYWtzOiBmYWxzZSxcbiAgICAgIHBlZGFudGljOiBmYWxzZSxcbiAgICAgIHNhbml0aXplOiBmYWxzZSxcbiAgICAgIHNtYXJ0TGlzdHM6IHRydWUsXG4gICAgICBzbWFydHlwYW50czogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcbiAgICAvLyBUT0RPXG4gIH1cblxuICAvLyBjb21wbGUgbWFya2Rvd24gdG8gaHRtbFxuICBwdWJsaWMgY29tcGlsZShkYXRhOiBzdHJpbmcpIHtcbiAgICAgcmV0dXJuIHRoaXMuX3JlbmRlcmVyLnJlbmRlcihkYXRhKTtcbiAgfVxuXG4gIC8vIGV4dGVuZCBtYXJrZWQgcmVuZGVyIHRvIHN1cHBvcnQgdG9kbyBjaGVja2JveFxuICBwcml2YXRlIGV4dGVuZFJlbmRlcmVyKCkge1xuICAgIC8vIG1ha2UgdGFyZ2V0IG9mIGFuY2hvciB0YWcgYmxhbmtcbiAgICAvLyBSZW1lbWJlciBvbGQgcmVuZGVyZXIsIGlmIG92ZXJyaWRlbiwgb3IgcHJveHkgdG8gZGVmYXVsdCByZW5kZXJlclxuICAgIGNvbnN0IGRlZmF1bHRSZW5kZXIgPSB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5saW5rX29wZW4gfHwgZnVuY3Rpb24odG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpO1xuICAgIH07XG4gICAgdGhpcy5fcmVuZGVyZXIucmVuZGVyZXIucnVsZXMubGlua19vcGVuID0gZnVuY3Rpb24gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpIHtcbiAgICAgIGNvbnN0IGFJbmRleCA9IHRva2Vuc1tpZHhdLmF0dHJJbmRleCgndGFyZ2V0Jyk7XG5cbiAgICAgIGlmIChhSW5kZXggPCAwKSB7XG4gICAgICAgIHRva2Vuc1tpZHhdLmF0dHJQdXNoKFsndGFyZ2V0JywgJ19ibGFuayddKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2Vuc1tpZHhdLmF0dHJzW2FJbmRleF1bMV0gPSAnX2JsYW5rJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRSZW5kZXIodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZik7XG4gICAgfTtcblxuICAgIC8vIGZvciBhbmd1bGFyIHJvdXRlZXIsIGFkZCBwcmVmaXggbG9jYXRpb24uaHJlZiB3aXRob3V0IGZyYWdtZW50XG4gICAgY29uc3QgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggPSBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZSArIGxvY2F0aW9uLnNlYXJjaDtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5mb290bm90ZV9yZWYgPSBmdW5jdGlvbiByZW5kZXJfZm9vdG5vdGVfcmVmKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZikge1xuICAgICAgdmFyIGlkICAgICAgPSBzbGYucnVsZXMuZm9vdG5vdGVfYW5jaG9yX25hbWUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcbiAgICAgIHZhciBjYXB0aW9uID0gc2xmLnJ1bGVzLmZvb3Rub3RlX2NhcHRpb24odG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcbiAgICAgIHZhciByZWZpZCAgID0gaWQ7XG5cbiAgICAgIGlmICh0b2tlbnNbaWR4XS5tZXRhLnN1YklkID4gMCkge1xuICAgICAgICByZWZpZCArPSAnOicgKyB0b2tlbnNbaWR4XS5tZXRhLnN1YklkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gJzxzdXAgY2xhc3M9XCJmb290bm90ZS1yZWZcIj48YSBocmVmPVwiJyArIGN1cnJlbnRQYWdlTGlua1dpdGhvdXRIYXNoICsgJyNmbicgKyBpZCArICdcIiBpZD1cImZucmVmJyArIHJlZmlkICsgJ1wiPicgKyBjYXB0aW9uICsgJzwvYT48L3N1cD4nO1xuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5mb290bm90ZV9hbmNob3IgPSBmdW5jdGlvbiByZW5kZXJfZm9vdG5vdGVfYW5jaG9yKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZikge1xuICAgICAgdmFyIGlkID0gc2xmLnJ1bGVzLmZvb3Rub3RlX2FuY2hvcl9uYW1lKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZik7XG5cbiAgICAgIGlmICh0b2tlbnNbaWR4XS5tZXRhLnN1YklkID4gMCkge1xuICAgICAgICBpZCArPSAnOicgKyB0b2tlbnNbaWR4XS5tZXRhLnN1YklkO1xuICAgICAgfVxuXG4gICAgICAvKiDihqkgd2l0aCBlc2NhcGUgY29kZSB0byBwcmV2ZW50IGRpc3BsYXkgYXMgQXBwbGUgRW1vamkgb24gaU9TICovXG4gICAgICByZXR1cm4gJyA8YSBocmVmPVwiJyArIGN1cnJlbnRQYWdlTGlua1dpdGhvdXRIYXNoICsgJyNmbnJlZicgKyBpZCArICdcIiBjbGFzcz1cImZvb3Rub3RlLWJhY2tyZWZcIj5cXHUyMWE5XFx1RkUwRTwvYT4nO1xuICAgIH1cbiAgfVxuXG4gIC8vIGhhbmRsZSBlcnJvclxuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycm9yOiBhbnkpOiBhbnkge1xuICAgIGxldCBlcnJNc2c6IHN0cmluZztcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBmZXRjaCkge1xuICAgICAgY29uc3QgYm9keSA9IGVycm9yLmpzb24oKSB8fCAnJztcbiAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICBlcnJNc2cgPSBgJHtlcnJvci5zdGF0dXN9IC0gJHtlcnJvci5zdGF0dXNUZXh0IHx8ICcnfSAke2Vycn1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJNc2cgPSBlcnJvci5tZXNzYWdlID8gZXJyb3IubWVzc2FnZSA6IGVycm9yLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XG4gIH1cbn1cblxuIl19
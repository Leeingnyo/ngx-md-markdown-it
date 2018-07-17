/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import MarkdownIt from 'markdown-it';
import MarkdownItFootnote from 'markdown-it-footnote';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
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
    /** @nocollapse */ NgxMdService.ngInjectableDef = i0.defineInjectable({ factory: function NgxMdService_Factory() { return new NgxMdService(i0.inject(i1.HttpClient)); }, token: NgxMdService, providedIn: "root" });
    return NgxMdService;
}());
export { NgxMdService };
if (false) {
    /** @type {?} */
    NgxMdService.prototype._renderer;
    /** @type {?} */
    NgxMdService.prototype._http;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbWQvIiwic291cmNlcyI6WyJsaWIvbmd4LW1kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDMUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxVQUFVLEVBQWMsTUFBTSxNQUFNLENBQUE7QUFDN0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLFVBQVUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxrQkFBa0IsTUFBTSxzQkFBc0IsQ0FBQzs7OztJQVFwRCxzQkFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTt5QkFGWixVQUFVLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7UUFHNUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUMzQjtJQUVELHVDQUF1Qzs7Ozs7SUFDdkMsaUNBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQzNHOzs7OztJQUVNLHVDQUFnQjs7OztjQUFDLE9BQVk7UUFDbEMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdEIsR0FBRyxFQUFFLElBQUk7WUFDVCxNQUFNLEVBQUUsSUFBSTtZQUNaLE1BQU0sRUFBRSxLQUFLO1lBQ2IsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLEVBQUUsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7SUFLUCw4QkFBTzs7OztjQUFDLElBQVk7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQUk5QixxQ0FBYzs7Ozs7UUFHcEIsSUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxVQUFTLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ3ZHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDL0MsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBVSxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSTs7WUFDakYsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUvQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDNUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQzthQUN6QztZQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3ZELENBQUM7O1FBR0YsSUFBTSwwQkFBMEIsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUN6RixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLDZCQUE2QixNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRzs7WUFDdEcsSUFBSSxFQUFFLEdBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7O1lBQzdFLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOztZQUN6RSxJQUFJLEtBQUssR0FBSyxFQUFFLENBQUM7WUFFakIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUN2QztZQUVELE1BQU0sQ0FBQyxxQ0FBcUMsR0FBRywwQkFBMEIsR0FBRyxLQUFLLEdBQUcsRUFBRSxHQUFHLGFBQWEsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRyxZQUFZLENBQUM7U0FDaEosQ0FBQTtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsZ0NBQWdDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHOztZQUM1RyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUV4RSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixFQUFFLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3BDOztZQUdELE1BQU0sQ0FBQyxZQUFZLEdBQUcsMEJBQTBCLEdBQUcsUUFBUSxHQUFHLEVBQUUsR0FBRyw2Q0FBNkMsQ0FBQztTQUNsSCxDQUFBOzs7Ozs7SUFJSyxrQ0FBVzs7OztjQUFDLEtBQVU7O1FBQzVCLElBQUksTUFBTSxDQUFTO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDOztZQUMzQixJQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDOztZQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsTUFBTSxHQUFNLEtBQUssQ0FBQyxNQUFNLFlBQU0sS0FBSyxDQUFDLFVBQVUsSUFBSSxFQUFFLFVBQUksR0FBSyxDQUFDO1NBQy9EO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNEO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O2dCQXhGN0IsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFSUSxVQUFVOzs7dUJBRG5COztTQVVhLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSdcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyB0aHJvd0Vycm9yLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcydcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBNYXJrZG93bkl0IGZyb20gJ21hcmtkb3duLWl0JztcbmltcG9ydCBNYXJrZG93bkl0Rm9vdG5vdGUgZnJvbSAnbWFya2Rvd24taXQtZm9vdG5vdGUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZFNlcnZpY2Uge1xuICBwcml2YXRlIF9yZW5kZXJlcjogYW55ID0gTWFya2Rvd25JdCh7IGxpbmtpZnk6IHRydWUgfSkudXNlKE1hcmtkb3duSXRGb290bm90ZSk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cENsaWVudCkge1xuICAgIHRoaXMuZXh0ZW5kUmVuZGVyZXIoKTtcbiAgICB0aGlzLnNldE1hcmtlZE9wdGlvbnMoe30pO1xuICB9XG5cbiAgLy8gZ2V0IHRoZSBjb250ZW50IGZyb20gcmVtb3RlIHJlc291cmNlXG4gIGdldENvbnRlbnQocGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldChwYXRoLCB7cmVzcG9uc2VUeXBlOiAndGV4dCd9KS5waXBlKG1hcChyZXMgPT4gcmVzKSwgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9yKSk7XG4gIH1cblxuICBwdWJsaWMgc2V0TWFya2VkT3B0aW9ucyhvcHRpb25zOiBhbnkpIHtcbiAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBnZm06IHRydWUsXG4gICAgICB0YWJsZXM6IHRydWUsXG4gICAgICBicmVha3M6IGZhbHNlLFxuICAgICAgcGVkYW50aWM6IGZhbHNlLFxuICAgICAgc2FuaXRpemU6IGZhbHNlLFxuICAgICAgc21hcnRMaXN0czogdHJ1ZSxcbiAgICAgIHNtYXJ0eXBhbnRzOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuICAgIC8vIFRPRE9cbiAgfVxuXG4gIC8vIGNvbXBsZSBtYXJrZG93biB0byBodG1sXG4gIHB1YmxpYyBjb21waWxlKGRhdGE6IHN0cmluZykge1xuICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXIucmVuZGVyKGRhdGEpO1xuICB9XG5cbiAgLy8gZXh0ZW5kIG1hcmtlZCByZW5kZXIgdG8gc3VwcG9ydCB0b2RvIGNoZWNrYm94XG4gIHByaXZhdGUgZXh0ZW5kUmVuZGVyZXIoKSB7XG4gICAgLy8gbWFrZSB0YXJnZXQgb2YgYW5jaG9yIHRhZyBibGFua1xuICAgIC8vIFJlbWVtYmVyIG9sZCByZW5kZXJlciwgaWYgb3ZlcnJpZGVuLCBvciBwcm94eSB0byBkZWZhdWx0IHJlbmRlcmVyXG4gICAgY29uc3QgZGVmYXVsdFJlbmRlciA9IHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmxpbmtfb3BlbiB8fCBmdW5jdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSB7XG4gICAgICByZXR1cm4gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXJlci5ydWxlcy5saW5rX29wZW4gPSBmdW5jdGlvbiAodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2VsZikge1xuICAgICAgY29uc3QgYUluZGV4ID0gdG9rZW5zW2lkeF0uYXR0ckluZGV4KCd0YXJnZXQnKTtcblxuICAgICAgaWYgKGFJbmRleCA8IDApIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0clB1c2goWyd0YXJnZXQnLCAnX2JsYW5rJ10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW5zW2lkeF0uYXR0cnNbYUluZGV4XVsxXSA9ICdfYmxhbmsnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFJlbmRlcih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKTtcbiAgICB9O1xuXG4gICAgLy8gZm9yIGFuZ3VsYXIgcm91dGVlciwgYWRkIHByZWZpeCBsb2NhdGlvbi5ocmVmIHdpdGhvdXQgZnJhZ21lbnRcbiAgICBjb25zdCBjdXJyZW50UGFnZUxpbmtXaXRob3V0SGFzaCA9IGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoO1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX3JlZiA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9yZWYodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgICAgICA9IHNsZi5ydWxlcy5mb290bm90ZV9hbmNob3JfbmFtZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIGNhcHRpb24gPSBzbGYucnVsZXMuZm9vdG5vdGVfY2FwdGlvbih0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzbGYpO1xuICAgICAgdmFyIHJlZmlkICAgPSBpZDtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIHJlZmlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAnPHN1cCBjbGFzcz1cImZvb3Rub3RlLXJlZlwiPjxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZuJyArIGlkICsgJ1wiIGlkPVwiZm5yZWYnICsgcmVmaWQgKyAnXCI+JyArIGNhcHRpb24gKyAnPC9hPjwvc3VwPic7XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnJlbmRlcmVyLnJ1bGVzLmZvb3Rub3RlX2FuY2hvciA9IGZ1bmN0aW9uIHJlbmRlcl9mb290bm90ZV9hbmNob3IodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKSB7XG4gICAgICB2YXIgaWQgPSBzbGYucnVsZXMuZm9vdG5vdGVfYW5jaG9yX25hbWUodG9rZW5zLCBpZHgsIG9wdGlvbnMsIGVudiwgc2xmKTtcblxuICAgICAgaWYgKHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQgPiAwKSB7XG4gICAgICAgIGlkICs9ICc6JyArIHRva2Vuc1tpZHhdLm1ldGEuc3ViSWQ7XG4gICAgICB9XG5cbiAgICAgIC8qIOKGqSB3aXRoIGVzY2FwZSBjb2RlIHRvIHByZXZlbnQgZGlzcGxheSBhcyBBcHBsZSBFbW9qaSBvbiBpT1MgKi9cbiAgICAgIHJldHVybiAnIDxhIGhyZWY9XCInICsgY3VycmVudFBhZ2VMaW5rV2l0aG91dEhhc2ggKyAnI2ZucmVmJyArIGlkICsgJ1wiIGNsYXNzPVwiZm9vdG5vdGUtYmFja3JlZlwiPlxcdTIxYTlcXHVGRTBFPC9hPic7XG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIGVycm9yXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyb3I6IGFueSk6IGFueSB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIGZldGNoKSB7XG4gICAgICBjb25zdCBib2R5ID0gZXJyb3IuanNvbigpIHx8ICcnO1xuICAgICAgY29uc3QgZXJyID0gYm9keS5lcnJvciB8fCBKU09OLnN0cmluZ2lmeShib2R5KTtcbiAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRocm93RXJyb3IoZXJyTXNnKTtcbiAgfVxufVxuIl19
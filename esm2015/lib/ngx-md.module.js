/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMdService } from './ngx-md.service';
import { NgxMdConfig } from './ngx-md.config';
import { NgxMdComponent } from './ngx-md.component';
export class NgxMdModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1kLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1tZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtbWQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQVFwRCxNQUFNLE9BQU8sV0FBVzs7OztJQUNmLE1BQU0sQ0FBQyxPQUFPO1FBQ25CLE9BQU87WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDekIsQ0FBQzs7OztZQVhMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDM0IsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQzthQUMxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTmd4TWRTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtbWQuc2VydmljZSc7XG5pbXBvcnQgeyBOZ3hNZENvbmZpZyB9IGZyb20gJy4vbmd4LW1kLmNvbmZpZyc7XG5pbXBvcnQgeyBOZ3hNZENvbXBvbmVudCB9IGZyb20gJy4vbmd4LW1kLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtIdHRwQ2xpZW50TW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbTmd4TWRDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtOZ3hNZFNlcnZpY2VdLFxuICBleHBvcnRzOiBbTmd4TWRDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNZE1vZHVsZSB7XG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neE1kTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbTmd4TWRDb25maWddXG4gICAgfTtcbiAgfVxufVxuIl19
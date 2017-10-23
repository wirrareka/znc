import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

@NgModule({
    declarations: [
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        // CommonModule
    ],
    exports: []
})
export class CustomDirectivesModule {

    static forRoot() {
        return {
            ngModule: CustomDirectivesModule,
        };
    }

}

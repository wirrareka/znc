import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { TruncatePipe } from './truncate/truncate';

@NgModule({
  declarations: [
      TruncatePipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers : [TruncatePipe],
  imports: [
  ],
  exports: [
      TruncatePipe,
  ]
})
export class CustomPipesModule {

    static forRoot() {
          return {
              ngModule: CustomPipesModule,
              providers: [TruncatePipe],
          };
       }

}

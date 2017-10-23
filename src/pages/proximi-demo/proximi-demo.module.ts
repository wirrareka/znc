import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProximiDemo } from './proximi-demo';

@NgModule({
  declarations: [
      ProximiDemo,
  ],
  imports: [
    IonicPageModule.forChild(ProximiDemo),
  ],
  exports: [
      ProximiDemo
  ]
})
export class ProximiDemoPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadDocumentId } from './upload-document-id';

@NgModule({
  declarations: [
    UploadDocumentId,
  ],
  imports: [
    IonicPageModule.forChild(UploadDocumentId),
  ],
  exports: [
    UploadDocumentId
  ]
})
export class UploadDocumentIdPageModule {}

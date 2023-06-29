import { CommonModule } from '@angular/common';
import { pgCard } from './card.component';
import { ProgressModule } from '../progress/progress.module';
import {ModuleWithProviders, NgModule} from '@angular/core';
@NgModule({
  declarations: [pgCard],
  exports: [pgCard],
  imports: [CommonModule, ProgressModule]
})
export class pgCardModule {
  static forRoot(): ModuleWithProviders<pgCardModule> {
    return {
      ngModule: pgCardModule
    };
  }
}

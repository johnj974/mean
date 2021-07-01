import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const materialComponents = [MatInputModule, MatCardModule, MatButtonModule];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
})
export class MaterialModule {}

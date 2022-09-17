import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from'@angular/material/sidenav'
import {MatButtonModule} from'@angular/material/button'
import { HttpClientModule } from '@angular/common/http'
import { MatTableModule} from'@angular/material/table'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

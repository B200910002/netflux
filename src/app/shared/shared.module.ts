import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { ImageModule } from 'primeng/image';
import { TestDirectiveDirective } from './directives/test-directive.directive';
import { ExponentialPipe } from './pipes/exponential.pipe';
import { CustomDirectiveDirective } from './directives/custom-directive.directive';
import { KnobModule } from 'primeng/knob';
import { PanelModule } from 'primeng/panel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AbstractStringPipe } from './pipes/abstract-string.pipe';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  DataViewModule,
  ChipModule,
  DropdownModule,
  RatingModule,
  ButtonModule,
  InputTextModule,
  ImageModule,
  KnobModule,
  PanelModule,
  ScrollTopModule,
  CardModule,
  DatePipe,
  MenubarModule,
  ToastModule,
  ProgressSpinnerModule,
  TableModule,
  SkeletonModule,
];

@NgModule({
  declarations: [
    TestDirectiveDirective,
    ExponentialPipe,
    CustomDirectiveDirective,
    AbstractStringPipe,
  ],
  imports: [CommonModule, ...modules],
  exports: [
    ...modules,
    TestDirectiveDirective,
    ExponentialPipe,
    CustomDirectiveDirective,
    AbstractStringPipe,
  ],
})
export class SharedModule {}

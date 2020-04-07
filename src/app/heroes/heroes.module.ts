import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatRadioModule } from '@angular/material';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

import { HeroAddComponent } from '../pages/hero-add/hero-add.component';
import { HeroCharacterSelectorComponent } from '../pages/hero-add/hero-character-selector/hero-character-selector.component';
import { HeroDetailComponent } from '../pages/hero-detail/hero-detail.component';
import { HeroesComponent } from '../pages/heroes/heroes.component';
import { SharedModule } from '../shared/shared.module';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDetailsService } from './providers/hero-details.service';

@NgModule({
  declarations: [
    HeroesComponent,
    HeroAddComponent,
    HeroDetailComponent,
    HeroCharacterSelectorComponent,
  ],
  imports: [
    SharedModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    HeroesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  providers:
  [
    HeroDetailsService,
  ],
  entryComponents:
  [
    HeroAddComponent,
  ],
})
export class HeroesModule { }

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HeroService } from 'src/app/core/providers/hero/hero.service';
import { heroCharacters } from 'src/app/shared/constants/hero-charcters';
import { dateValidator } from 'src/app/shared/validators/date.validator';
import { regexValidator } from 'src/app/shared/validators/regex.validator';

@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-add.component.html',
  styleUrls: ['./hero-add.component.scss'],
})
export class HeroAddComponent implements OnInit {
  heroForm: FormGroup;
  characterList: string[] = heroCharacters;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private matDialogRef: MatDialogRef<HeroAddComponent>,
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private getName(): AbstractControl | null {
    return this.heroForm.get('name');
  }

  private onSave(): void {
    this.matDialogRef.close(this.heroForm.value);
  }

  private onCancel(): void {
    this.matDialogRef.close();
  }

  private buildForm(): void {
    this.heroForm = this.formBuilder.group({
      name: [this.data.name, [
        Validators.required,
      ],],
      crimes: [0],
      colorTheme: ['', regexValidator(/^#[0-9a-f]{6}$/)],
      dob: ['', dateValidator],
      character: [this.characterList[0]],
    });
  }
}

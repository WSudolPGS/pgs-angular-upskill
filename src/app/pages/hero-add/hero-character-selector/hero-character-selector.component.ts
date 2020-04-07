import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-hero-character-selector',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => HeroCharacterSelectorComponent),
    multi: true,
  }, {
    provide: NG_VALIDATORS,
    useExisting: HeroCharacterSelectorComponent,
    multi: true,
  }],
  templateUrl: './hero-character-selector.component.html',
  styleUrls: ['./hero-character-selector.component.scss'],
})

export class HeroCharacterSelectorComponent implements ControlValueAccessor {
  @Input() characterList: string[];
  selectedCharacter: string;

  onChange: Function;
  onTouched: Function;

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  validate(formControl: FormControl): ValidationErrors | null {
    if (this.characterList.includes(formControl.value)) {
      return null;
    }

    return {forbiddenValue: true};
  }

  writeValue(value: string): void {
    this.selectedCharacter = value;
  }
}
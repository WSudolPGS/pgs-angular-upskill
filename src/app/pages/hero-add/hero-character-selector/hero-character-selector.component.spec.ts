import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCharacterSelectorComponent } from './hero-character-selector.component';


describe('HeroCharacterSelectorComponent', () => {
  let component: HeroCharacterSelectorComponent;
  let fixture: ComponentFixture<HeroCharacterSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroCharacterSelectorComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCharacterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

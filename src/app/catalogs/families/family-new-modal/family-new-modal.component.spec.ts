import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyNewModalComponent } from './family-new-modal.component';

describe('FamilyNewModalComponent', () => {
  let component: FamilyNewModalComponent;
  let fixture: ComponentFixture<FamilyNewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyNewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyNewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

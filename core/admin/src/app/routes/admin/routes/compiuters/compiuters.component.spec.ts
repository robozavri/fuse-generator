import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiutersComponent } from './compiuters.component';

describe('CompiutersComponent', () => {
  let component: CompiutersComponent;
  let fixture: ComponentFixture<CompiutersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompiutersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiutersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

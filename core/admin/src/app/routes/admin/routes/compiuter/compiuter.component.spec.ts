import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiuterComponent } from './compiuter.component';

describe('CompiuterComponent', () => {
  let component: CompiuterComponent;
  let fixture: ComponentFixture<CompiuterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompiuterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

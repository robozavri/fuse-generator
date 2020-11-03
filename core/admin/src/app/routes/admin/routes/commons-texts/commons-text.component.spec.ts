import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonsTextComponent } from './meta.component';

describe('CommonsTextComponent', () => {
  let component: CommonsTextComponent;
  let fixture: ComponentFixture<CommonsTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonsTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

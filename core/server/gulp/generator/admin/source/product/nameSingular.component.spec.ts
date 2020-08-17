import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%=className%>Component } from './<%=fileName%>.component';

describe('<%=className%>Component', () => {
  let component: <%=className%>Component;
  let fixture: ComponentFixture<<%=className%>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=className%>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=className%>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%=nameSingularFUC%>Component } from './<%=nameSingularLC%>.component';

describe('<%=nameSingularFUC%>Component', () => {
  let component: <%=nameSingularFUC%>Component;
  let fixture: ComponentFixture<<%=nameSingularFUC%>Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=nameSingularFUC%>Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=nameSingularFUC%>Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

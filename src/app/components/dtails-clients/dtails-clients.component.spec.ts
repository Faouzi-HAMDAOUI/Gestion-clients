import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtailsClientsComponent } from './dtails-clients.component';

describe('DtailsClientsComponent', () => {
  let component: DtailsClientsComponent;
  let fixture: ComponentFixture<DtailsClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtailsClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtailsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

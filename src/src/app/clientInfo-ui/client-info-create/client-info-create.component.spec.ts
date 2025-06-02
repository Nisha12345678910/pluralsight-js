import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfoCreateComponent } from './client-info-create.component';

describe('ClientInfoCreateComponent', () => {
  let component: ClientInfoCreateComponent;
  let fixture: ComponentFixture<ClientInfoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInfoCreateComponent]
    });
    fixture = TestBed.createComponent(ClientInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

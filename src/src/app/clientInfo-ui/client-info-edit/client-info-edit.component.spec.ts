import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfoEditComponent } from './client-info-edit.component';

describe('ClientInfoEditComponent', () => {
  let component: ClientInfoEditComponent;
  let fixture: ComponentFixture<ClientInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInfoEditComponent]
    });
    fixture = TestBed.createComponent(ClientInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

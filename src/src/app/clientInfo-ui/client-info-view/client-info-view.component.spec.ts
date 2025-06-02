import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfoViewComponent } from './client-info-view.component';

describe('ClientInfoViewComponent', () => {
  let component: ClientInfoViewComponent;
  let fixture: ComponentFixture<ClientInfoViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInfoViewComponent]
    });
    fixture = TestBed.createComponent(ClientInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

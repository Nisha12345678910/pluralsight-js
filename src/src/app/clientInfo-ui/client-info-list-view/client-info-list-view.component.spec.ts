import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientInfoListViewComponent } from './client-info-list-view.component';

describe('ClientInfoListViewComponent', () => {
  let component: ClientInfoListViewComponent;
  let fixture: ComponentFixture<ClientInfoListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientInfoListViewComponent]
    });
    fixture = TestBed.createComponent(ClientInfoListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

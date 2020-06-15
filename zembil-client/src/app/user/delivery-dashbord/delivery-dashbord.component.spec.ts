import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDashbordComponent } from './delivery-dashbord.component';

describe('DeliveryDashbordComponent', () => {
  let component: DeliveryDashbordComponent;
  let fixture: ComponentFixture<DeliveryDashbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDashbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewProductComponent } from './admin-view-product.component';

describe('AdminViewProductComponent', () => {
  let component: AdminViewProductComponent;
  let fixture: ComponentFixture<AdminViewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

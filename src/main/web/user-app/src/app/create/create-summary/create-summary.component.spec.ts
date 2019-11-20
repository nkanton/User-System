import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSummaryComponent } from './create-summary.component';

describe('CreateSummuryComponent', () => {
  let component: CreateSummaryComponent;
  let fixture: ComponentFixture<CreateSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

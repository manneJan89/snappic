import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertStreamComponent } from './upsert-stream.component';

describe('UpsertStreamComponent', () => {
  let component: UpsertStreamComponent;
  let fixture: ComponentFixture<UpsertStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsertStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

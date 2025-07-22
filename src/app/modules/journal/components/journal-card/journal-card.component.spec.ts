import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalCardComponent } from './journal-card.component';

describe('JournalCardComponent', () => {
  let component: JournalCardComponent;
  let fixture: ComponentFixture<JournalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

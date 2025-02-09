import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoFormComponent } from './events-form.component';

describe('EventsFormComponent', () => {
  let component: EventoFormComponent;
  let fixture: ComponentFixture<EventoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

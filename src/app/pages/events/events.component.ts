import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  events: any[] = [];

  constructor(private db: DatabaseService) {
    this.fetchEvents();
  }

  fetchEvents() {
    this.db.fetchFirestoreCollection('consertevents')
      .subscribe({
        next: (res: any) => {
          console.log('Colección de Firebase:', res);
          this.events = res;
        },
        error: (err: any) => {
          console.error('Error al obtener datos de Firebase:', err);
        }
      });
  }
}

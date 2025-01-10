import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventosComponent {

  eventos: any;
pruebas: any;
consertevents: any;
  constructor(
    public db: DatabaseService
  ) {
    this.db.fetchFirestoreCollection('consertevents')
      .subscribe((res: any) => {

        console.log('eventos del firebase',res);
        this.eventos = res;
      })
  }
}

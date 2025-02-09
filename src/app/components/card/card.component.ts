import { Component, Input, OnInit } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  @Input() data: any;
  toggleInput: boolean = false;
  showComments: boolean = false;
  constructor(
    public db: DatabaseService,
    public auth: AuthService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    //console.log('likes', this.data.likes);
  }

  setLike() {
    let likesToUpdate = this.data.likes;
    //console.log('likes actuales', likesToUpdate)
    if (this.checkLike()) {
      //console.log('like encontrado')
      for (let i = 0; i < likesToUpdate.length; i++) {
        likesToUpdate = likesToUpdate.slice(i);
      }
    }
    else {
      likesToUpdate.push(this.auth.profile?.id)
      //console.log('like nuevo', likesToUpdate)
    }
    //console.log('likes', { likes: likesToUpdate })

    this.db.updateFirestoreDocument('posts', this.data.id, { likes: likesToUpdate })
      .then(
        (data) => {
          //console.log(`Datos actualizados para`, data);
        },
        (error) => {
          //console.error('Error al actualizar datos:', error);
        }
      )
  }

  checkLike() {
    let currentStatus = false;
    return this.data.likes.indexOf(this.auth.profile?.id) >= 0;
  }

  detalleEvento(id:string){
  
    this.router.navigate(["/evento",id])
    
  }
}

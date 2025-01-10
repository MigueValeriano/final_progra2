import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './events-form.component.html',
  styleUrl: './events-form.component.scss'
})
export class EventoFormComponent {

  action: any;
  id: any;
  data: any;

  form: FormGroup;
  constructor(
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public db: DatabaseService
  ) {
    // definir el formulario en blanco
    this.form = this.fb.group({
      Nombre: ['', [Validators.required]],
      Descripcion: ['', []],
      cantidad: ['', []],
      imagen: ['',[]],
      precio: ['',[]],
      descont: [false, [Validators.required]],
      porcentaje: ['', []],
      tags: ['', [Validators.required]],
      

    });

    // capturo las variables de la url
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // verifico si estoy en la ruta para crear o en la ruta para update, read y delete
    if (this.activatedRoute.snapshot.paramMap.get('action')) {
      this.action = this.activatedRoute.snapshot.paramMap.get('action');
    } else {
      this.action = 'create';
    }

    // si no estoy en create, entonces leo datos desde firebase
    if (this.action !== 'create') {
      this.db.getDocumentById('consertevents', this.id)
        .subscribe((res: any) => {
          console.log('evento seleccionado', res);
          if(res){
            this.data = res;
            const { Nombre, Descripcion,tags,porcentaje,descont, cantidad,imagen,precio
            } = this.data;
            this.form.setValue({
              Nombre: Nombre,
              Descripcion: Descripcion,
              cantidad: cantidad,
              imagen: imagen,
              precio: precio,
              descont: descont || false,
              porcentaje: porcentaje || '',
              tags: tags ? tags.join(', ') : ''
            })
          }
        });
    }
  }

  transaction() {
    if (this.form.valid) {
      console.log('fomrulario válido', this.form.value);
      if (this.action === 'create') {
        this.db.addFirestoreDocument('consertevents', this.form.value);
        alert('datos almacenados');
      }
      if (this.action === 'update') {
        this.db.updateFirestoreDocument('consertevents', this.id, this.form.value);
        alert('datos modificados');
      }
      if (this.action === 'delete') {
        this.db.deleteFirestoreDocument('consertevents', this.id);
        alert('datos eliminados');
      }
    }
    else {
      alert('datos inválidos')
    }
  }


}

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
      name: ['', [Validators.required]],
      edad: ['', []],
      locacion: ['', []],
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
      this.db.getDocumentById('pruebas', this.id)
        .subscribe((res: any) => {
          console.log('evento seleccionado', res);
          if(res){
            this.data = res;
            const { name, edad, locacion} = this.data;
            this.form.setValue({
              name: name,
              edad: edad,
              locacion: locacion,
            })
          }
        });
    }
  }

  transaction() {
    if (this.form.valid) {
      console.log('fomrulario válido', this.form.value);
      if (this.action === 'create') {
        this.db.addFirestoreDocument('pruebas', this.form.value);
        alert('datos almacenados');
      }
      if (this.action === 'update') {
        this.db.updateFirestoreDocument('pruebas', this.id, this.form.value);
        alert('datos modificados');
      }
      if (this.action === 'delete') {
        this.db.deleteFirestoreDocument('pruebas', this.id);
        alert('datos eliminados');
      }
    }
    else {
      alert('datos inválidos')
    }
  }


}

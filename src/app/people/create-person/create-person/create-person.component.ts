import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from '../../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss'],
})
export class CreatePersonComponent implements OnInit {
  //  crear un formulario reactivo para el registro de personas
  personForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mothersLastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  idPerson?: number;
  personExist: boolean = false;

  constructor(
    private personService: PersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idPerson = this.activatedRoute.snapshot.params['id'] || null;
    if (this.idPerson) {
      this.personService.getPerson(this.idPerson).subscribe((person) => {

        if(person){
        this.personForm.patchValue(person);
        this.personExist = true;
        }
       else {
        console.log('No existe la persona');
        this.router.navigate(['/people']);
       }

      });
    }
  }

  // metodo para registrar una persona

  createPerson() {
    if (!this.idPerson) {
      this.personService
        .createPerson(this.personForm.value)
        .subscribe((data) => {
          console.log(data);
        });
    } else {

      this.personService
        .updatePerson(this.idPerson, this.personForm.value)
        .subscribe((data) => {
          console.log(data);
        });
    }


  this.router.navigate(['/people']);
  }

}

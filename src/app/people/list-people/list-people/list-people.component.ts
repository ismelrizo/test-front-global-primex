import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../../models/person.model';
import { PersonService } from '../../../services/person.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.scss']
})
export class ListPeopleComponent implements OnInit {

  people: Person[] =  [];

  displayedColumns: string[] = [ 'name', 'lastName', 'mothersLastName','address','phone','actions'];
  dataSource!: MatTableDataSource<Person>;
  // private querySubscription!: Subscription;

  constructor(private personService: PersonService,private router: Router
    ) {



  }
  async ngOnInit() {

    await this.getAllPersons();
    // this.personService.getPeople().subscribe(
    //   (data: Person[]) => {
    //     this.people = data;
    //     this.dataSource = new MatTableDataSource(this.people);
    //   }
    // );

  }

  async getAllPersons() {
    this.people = await this.personService.getPeople();
    this.dataSource = new MatTableDataSource(this.people);
  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editElement(element: Person) {

    this.router.navigate(['/edit-person', element.id]);

  }
  deleteElement(element: Person) {
    this.personService.deletePerson(element.id).subscribe(
      (data: Person) => {
        console.log(data);
        this.people = this.people.filter(person => person.id !== element.id);
        this.dataSource = new MatTableDataSource(this.people);
      }
    );
  }

  createElement() {
    this.router.navigate(['/create-person']);
  }
}

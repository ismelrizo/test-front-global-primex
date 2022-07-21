import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from './models/person.model';
import { PersonService } from './services/person.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'primex-front';



  constructor(
    ) {
  }
  ngOnInit(): void {

  }


}

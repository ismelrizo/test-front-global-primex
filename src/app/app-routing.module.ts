import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonComponent } from './people/create-person/create-person/create-person.component';
import { ListPeopleComponent } from './people/list-people/list-people/list-people.component';


const routes: Routes = [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: ListPeopleComponent  },
  { path: 'create-person', component: CreatePersonComponent },
  { path: 'edit-person/:id', component: CreatePersonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

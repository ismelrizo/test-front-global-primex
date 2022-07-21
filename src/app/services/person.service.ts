import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, gql, QueryRef } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  private getPeopleQuery: QueryRef<any>;
  // private getPersonQuery: QueryRef<any>;


  constructor(private apollo: Apollo) {
    this.getPeopleQuery = this.apollo.watchQuery({
      query: gql`
        query {
          getAllPerson {
            id
            name
            lastName
            mothersLastName
            address
            phone
          }
        }
      `,
    });
  }

  async getPeople(): Promise<Person[]> {
    const { data } = await this.getPeopleQuery.refetch();
    return data.getAllPerson;
  }

  // getPeople(): Observable<Person[]> {
  //   return this.apollo
  //     .watchQuery<any>({
  //       query: gql`
  //         query {
  //           getAllPerson {
  //             id
  //             name
  //             lastName
  //             mothersLastName
  //             address
  //             phone
  //           }
  //         }
  //       `,
  //     })
  //     .valueChanges.pipe(map((result) => result.data.getAllPerson));
  // }



  getPerson(id: number): Observable<Person> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
            query {
              getSinglePerson(personId: ${id}) {
                id
                name
                lastName
                mothersLastName
                address
                phone
              }
            }
            `,
      })
      .valueChanges.pipe(map((result) => result.data.getSinglePerson));
  }

  createPerson(person: Person): Observable<Person> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation Mutation($input: CreateInput!) {
            create(input: $input) {
              id
              name
              lastName
              mothersLastName
              address
              phone
            }
          }
        `,
        variables: {
          input: {
            name: person.name,
            lastName: person.lastName,
            mothersLastName: person.mothersLastName,
            address: person.address,
            phone: person.phone,
          },
        },
      })
      .pipe(map((result) => result.data.create));
  }

  updatePerson(idPerson: number, person: Person): Observable<Person> {
    // convert to int
    const id = parseInt(idPerson.toString(), 10);

    return this.apollo
      .mutate<any>({
        mutation: gql`
              mutation Mutation($input: UpdateInput!) {
                update(input: $input) {
                  id
                  name
                  lastName
                  mothersLastName
                  address
                  phone
                }
              }
        `,
        variables: {
          input: {
            id: id,
            name: person.name,
            lastName: person.lastName,
            mothersLastName: person.mothersLastName,
            address: person.address,
            phone: person.phone,
          }
        },
      })
      .pipe(map((result) => result.data.update));


  }

  deletePerson(id: number): Observable<Person> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation Mutation($input: DeleteInput!) {
            delete(input: $input) {
              id
            }
          }
        `,
        variables: {
          input: {
            id: id,
          },
        },
      })
      .pipe(map((result) => result.data.delete));
  }
}

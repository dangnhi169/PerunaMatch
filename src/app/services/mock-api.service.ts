import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Listing } from '../listing';
import { Project } from '../../models/project';

export class MockApi implements InMemoryDbService {
    createDb(): any {
        //eturn {
          let projects: Project[] =[
              {
                  projectID: 0,
                  name: "Machine Learning with drone",
                  tag: [
                      "Larson",
                      "Machine Learning"
                  ],
                  posterID: 0
              },
              {
                  projectID: 1,
                  name: "Automatic Database Management",
                  tag: [
                      "data",
                      "database"
                  ],
                  posterID: 1
              },
              {
                  projectID: 2,
                  name: "Storage Systems Based HBA Distributed Meta Data Management for large Cluster.",
                  tag: [
                      "Nhi",
                      "Database"
                  ],
                  posterID: 1
              },
              {
                  projectID: 3,
                  name: "Automatic Linux Performance Setting",
                  tag: [
                      "Linux",
                      "setting"
                  ],
                  posterID: 1
              },
              {
                  projectID: 4,
                  name: "Containers and Docker",
                  tag: [
                      "Container",
                      "Docker"
                  ],
                  posterID: 0
              },
              {
                  projectID: 5,
                  name: "Platformer Game",
                  tag: [
                      "Java",
                      "Gaming"
                  ],
                  posterID: 1
              },
              {
                  projectID: 6,
                  name: "Software Requirement Checking",
                  tag: [
                      "Software",
                      "Requirement"
                  ],
                  posterID: 1
              },
              {
                  projectID: 7,
                  name: "Lan Audio(Voice) Chat ",
                  tag: [
                      "Chat"
                  ],
                  posterID: 2
              },
              {
                  projectID: 8,
                  name: "Trojan Horse Auto Generator",
                  tag: [
                      "Trojan",
                      "Security"
                  ],
                  posterID: 0
              }
          ]

      let listings: Listing[] = [
        {
          id:99,
          projectId: 0,
          title: "Highight Documents",
          description:"Come highlight documents",
          start: new Date(),
          end: new Date(),
          majors:['Computer Science','Math'],
          contactName:'Dr. Larson',
          contactEmail:'1234@gmail.com'

        },
        {
          id:99,
          projectId:1,

          title: "Breaking Bad",
          description:"Need Help in my 100% legal lab",
          start:new Date(),
          end: new Date(),
          majors:['Chemistry','Math'],
          contactName:'Dr. White',
          contactEmail:'12345@gmail.com'
        },
        {
          id:99,
          projectId: 0,
          title: "Assistant to the Regional Manager",
          description:"stapling papers",
          start: new Date(),
          end:new Date(),
          majors:['Geology'],
          contactName:'Micheal Scott',
          contactEmail:'1234@dundermifflin.com'

        },
        {
          id:99,
          projectId: 8,
          title: "Trojan Horse Maker",
          description:"make trojan horses",
          start: new Date(),
          end:new Date(),
          majors:['Computer Engineering'],
          contactName:'Mitnick',
          contactEmail:'1234@aol.com'

        }
      ]
      return { projects, listings};
    }

}

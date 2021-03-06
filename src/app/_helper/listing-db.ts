import { Listing } from '../listing';

export let listingDB: Listing[] =[
{
  id: 0,
  projectId:0,
  title: "Highight Documents",
  description:"Come highlight documents",
  start: new Date(),
  end:new Date(),
  majors:['Computer Science','Math'],
  contactName:'Dr. Larson',
  contactEmail:'1234@gmail.com'

},
{
  id:1,
  projectId:1,
  title: "Breaking Bad",
  description:"Need Help in my 100% legal lab",
  start:new Date(),
  end:new Date(),
  majors:['Chemistry','Math'],
  contactName:'Dr. White',
  contactEmail:'12345@gmail.com'
},
{
  id:2,
  projectId:0,
  title: "Assistant to the Regional Manager",
  description:"stapling papers",
  start: new Date(),
  end:new Date(),
  majors:['Geology'],
  contactName:'Micheal Scott',
  contactEmail:'1234@dundermifflin.com'

},
{
  id:3,
  projectId:8,
  title: "Trojan Horse Maker",
  description:"make trojan horses",
  start: new Date(),
  end:new Date(),
  majors:['Computer Engineering'],
  contactName:'Mitnick',
  contactEmail:'1234@aol.com'

}


]

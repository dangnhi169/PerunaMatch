import { Favorite } from '../favorite';

export let favoriteDB: Favorite[] = [
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
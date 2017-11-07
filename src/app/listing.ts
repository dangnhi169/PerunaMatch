export class Listing{
  public title:string
  public start:Date
  public end:Date
  public majors:string[]
  public skills:string[]
  public description:string


constructor(title: string, start: Date, end: Date, majors: string[],
  skills: string[], description:string) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.majors = majors;
    this.skills = skills;
    this.description = description;
  }
}

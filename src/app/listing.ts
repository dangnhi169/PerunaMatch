export class Listing{
  public title:string
  public start:Date
  public end:Date
  public majors:string[]
  public skills:string[]
  public description:string
  public contactName:string
  public contactEmail:string


constructor(title: string,description:string, start: Date, end: Date, majors: string[]
  , contactName: string, contactEmail: string) {
    this.title = title;
    this.description = description;
    this.start = start;
    this.end = end;
    this.majors = majors;
  //  this.skills = skills;
  //  this.description = description;
    this.contactName = contactName;
    this.contactEmail = contactEmail;
  }
}

import { Field } from '.';

export class Collection {
  name: string;
  fields: Field[];
  constructor(data: any) {
    this.name = data['name'];
    if (data.fields && data.fields.forEach) {
      this.fields = [];
      data.fields
        .forEach(field => this.fields.push(new Field(field)));
    }
  }
  toString() {
    let str = 'COLLECTION \'' + this.name.toUpperCase() + '\' {\n';
    this.fields.forEach((field, i) => {
      str += field.toString() + (this.fields.length > i ? ',\n': '' );
    });  
    str += '\n}\n';
    return str;
  }
}

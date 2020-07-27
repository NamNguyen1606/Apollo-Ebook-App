export default class ChildCollection {
  id: string = '';
  name: string = '';
  total: number = 0;
  parentID: string = '';
  constructor(id: string, name: string, total: number, parentId: string){
    this.id = id;
    this.name = name;
    this.total = total;
    this.parentID = parentId;
  }
}

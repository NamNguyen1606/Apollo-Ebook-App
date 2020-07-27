import ChildCollection from './childCollection';
export default class ParentCollection {
  id: string = '';
  name: string = '';
  children: ChildCollection[] = [];
  constructor(id: string, name: string, children?: ChildCollection[]) {
    this.id = id;
    this.name = name;
    this.children = children || [];
  }
}

import { Role } from './role'

export class User {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: string = '',
    public first_name: string = '',
    public last_name: string = '',

    public email: string = '',
    public role: Role = new Role()
  ) {}

  get name() {
    return `${this.first_name} ${this.last_name}`
  }
}

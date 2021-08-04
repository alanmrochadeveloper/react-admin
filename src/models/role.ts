import { Permission } from './permission'

export class Role {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: string = '',
    public name: string = '',
    public permissions: Permission[] = []
  ) {}
}

export class Product {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: string = '',
    public title: string = '',
    public description: string = '',

    public image: string = '',
    public price: number = 0
  ) {}
}

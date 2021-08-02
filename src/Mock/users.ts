/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IUser } from '../types/interfaces/IUser'

function createUserData(
  id: string,
  name: string,
  orders: string,
  products: string,
  accessLevel: string,
  first_name: string = '',
  last_name: string = '',
  email: string = ''
): IUser {
  return { id, name, orders, products, accessLevel }
}

export const mockUsers = [
  createUserData('id01', 'Alan Miguel Rocha', 'Orders01', 'Products01', 'AcessLevel01'),
  createUserData('id02', 'Nassr', 'Orders02', 'Products03', 'AcessLevel01'),
  createUserData('id03', 'Wesley Willian', 'Orders01', 'Products01', 'AcessLevel01'),
  createUserData('id04', 'Massim aagum', 'Orders01', 'Products01', 'AcessLevel01'),
  createUserData('id05', 'Digo Antunes', 'Orders01', 'Products01', 'AcessLevel01')
]

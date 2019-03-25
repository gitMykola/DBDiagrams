export const Structures = [
  {
    project: '507f191e810c19729de860ea',
    name: 'users',
    fields: [
      {
        fieldPath: 'users.id',
        fieldType: 'int',
        fieldOptions: {
          primaryKey: true,
          isRequired: true,
          defaultValue: null,
          ref: 'orders.user_id > users.id'
        }
      },
      {
        fieldPath: 'users.full_name',
        fieldType: 'varchar',
        fieldOptions: {
          primaryKey: false,
          isRequired: false,
          defaultValue: null,
          ref: null
        }
      },
      {
        fieldPath: 'users.email',
        fieldType: 'varchar',
        fieldOptions: {
          primaryKey: false,
          isRequired: true,
          defaultValue: null,
          ref: null
        }
      }
    ]
  },
  {
    project: '507f191e810c19729de860ea',
    name: 'orders',
    fields: [
      {
        fieldPath: 'orders.id',
        fieldType: 'int',
        fieldOptions: {
          primaryKey: true,
          isRequired: true,
          defaultValue: null,
          ref: 'orders.user_id > users.id'
        }
      },
      {
        fieldPath: 'orders.user_id',
        fieldType: 'int',
        fieldOptions: {
          primaryKey: false,
          isRequired: true,
          defaultValue: null,
          ref: null
        }
      },
      {
        fieldPath: 'orders.status',
        fieldType: 'varchar',
        fieldOptions: {
          primaryKey: false,
          isRequired: true,
          defaultValue: 'new order',
          ref: null
        }
      }
    ]
  }
]

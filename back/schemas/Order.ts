import { integer, relationship, text, virtual } from '@keystone-next/fields';
import { gql, list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';
import formatMoney from '../lib/formatMoney';

export const Order = list({
  access: {
    create: isSignedIn,
    read: rules.canOrder,
    update: () => false,
    delete: () => false,
  },
  fields: {
    label: virtual({
      graphQLReturnType: 'String',
      resolver: async (item, args, context) => {
        const data = await context.graphql.run({
          query: gql`
            query getUser($id: ID!) {
              User(where: { id: $id }) {
                name
              }
            }
          `,
          variables: {
            id: `${item.user}`,
          },
        });
        return `${data.User.name}-${Date.now()}`;
      },
    }),
    total: integer(),
    item: relationship({ ref: 'OrderItem.order', many: true }),
    user: relationship({ ref: 'User.order' }),
    charge: text(),
  },
});

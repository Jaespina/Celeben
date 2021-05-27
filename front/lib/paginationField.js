import gql from "graphql-tag";

export default function paginationField() {
  return {
    keyArgs: false, // custom Apollo Cache
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      const data = cache.readQuery({
        query: gql`
          query {
            _allProductsMeta {
              count
            }
          }
        `,
      });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      const items = existing.slice(skip, skip + first).filter((x) => x);
      //if there are items and there aren't enough to fill the last page, just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        return items;
      }

      return false;
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;

      const merged = existing ? existing.slice(0) : [];

      // eslint-disable-next-line no-plusplus
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}

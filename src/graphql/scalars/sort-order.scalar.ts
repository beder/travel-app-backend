import { GraphQLScalarType, Kind } from 'graphql';

function validate(sortOrder: unknown): string | never {
  if (
    typeof sortOrder !== 'string' ||
    ['asc', 'desc'].indexOf(sortOrder) === -1
  ) {
    throw new Error('invalid sort order');
  }
  return sortOrder;
}

export const SortOrderScalar = new GraphQLScalarType({
  name: 'SortOrder',
  description: 'Sort order',
  serialize: (value) => validate(value),
  parseValue: (value) => validate(value),
  parseLiteral: (ast) =>
    ast.kind === Kind.STRING ? validate(ast.value) : null,
});

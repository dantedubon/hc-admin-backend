// Types
// Domain entities
export type Banner = {
  id: string,
  name: string,
  description: string,
  image: any,
  isDeleted: boolean,
  createdAt: Date,
  updatedAt: Date,
  order: number,
};

// Commands
export type Command = {
  type: string,
};

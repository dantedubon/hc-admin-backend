export type City = {
  id: number,
  label: string,
};

export type Province = {
  id: number,
  label: string,
};

export type Sector = {
  id: number,
  label: string,
};

export type Command = {
  type: string,
};

export type GetCitiesCommand = {
  type: string,
  provinceId: number,
};

export type GetProvincesCommand = {
  type: string,
};

export type GetStatesCommand = {
  type: string,
};

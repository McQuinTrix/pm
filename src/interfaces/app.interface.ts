export interface IRightMenuList {
  head: string;
  link: string;
  tags: string[] | null;
  startDate: string,
  endDate: string,
  location: {
    city: string,
    coor: {
      x: string,
      y: string
    }
  };
}

import { IOpenSiteData } from "./components.interface";

export interface IProjectData {
  title: string;
  where: string;
  when: string;
  sub: string;
  exp: string[];
  site: IOpenSiteData;
  category: string[];
}

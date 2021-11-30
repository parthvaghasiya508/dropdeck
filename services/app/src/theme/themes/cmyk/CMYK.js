import Simple from "../simple/Simple";
import { getPalettes } from "./components/palettes";

export default class CMYK extends Simple {

  constructor() {
    super('cmyk', getPalettes(), "CMYK");
  }
}

import Image from "App/Models/Image";
import Repository from "./Repository";

export default class ImageRepository extends Repository<Image> {
  constructor(model: Image) {
    super(model);
  }
}

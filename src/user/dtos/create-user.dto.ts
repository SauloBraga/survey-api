export class CreateUserDTO {
  name: string;
  password: string;
  document: string;

  private constructor(name: string, password: string, document: string) {
    this.name = name;
    this.password = password;
    this.document = document;
  }

  static create(name: string, password: string, document: string) {
    return new CreateUserDTO(name, password, document);
  }
}

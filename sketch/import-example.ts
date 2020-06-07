export function log() {
  console.log("LOG FUNCTION");
}

export class logClass {
  public log() {
    console.log("LOG CLASS");
  }
}
class defaultClass {
  public log() {
    console.log("DEFAULT CLASS");
  }
}

export default defaultClass;

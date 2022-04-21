export class GlobalConstants {
  // todo configurable urls
  public static apiBaseUrl: string = "http://localhost:8888/api/rest/v1";
  public static apiContactsUrl: string = this.apiBaseUrl + "/contact";
  public static apiReminderUrl: string = this.apiBaseUrl + "/reminder";
}

export class ApiUtil {
  public static errorString(apiError: any) {
    let statusCode = apiError.status;
    let message = apiError.message;

    if (statusCode && message) {
      return `\nstatus: ${statusCode}\nmessage: ${message}`;
    }
    return apiError;
  }
}

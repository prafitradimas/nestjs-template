export interface EmailServiceInterface {
  /**
   * Send non-blocking email
   *
   * @param to email receiver
   * @param subject email subject
   * @param template email template to be rendered
   * @param params template parameters used by template engine to fill values
   *
   * @returns email client response
   *
   * @example
   * ```ts
   * await sendEmailAsync('john.doe@example.com', 'Test Email', 'test', {
   *     name: 'John Doe'
   * });
   * // or
   * await sendEmailAsync('john.doe@example.com', 'Test Email', 'test', {
   *     name: 'John Doe'
   * })
   * .then((result) => { // ... })
   * .catch((err) => { // ... });
   * ```
   */
  send(
    to: Readonly<string>,
    subject: Readonly<string>,
    template: Readonly<string>,
    params: Readonly<object>,
  ): Promise<any>;
}

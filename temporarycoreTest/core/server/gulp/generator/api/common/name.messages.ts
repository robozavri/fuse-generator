'use strict';

import * as mailer from '../../helpers/mailer';

export function sendClientMessage(adminEmail: any, payload: any) {
  const content = `
    <p>Name: ${payload.name} </p>
    <p>Email: ${payload.email}</p>
    <p>Phone Number: ${payload.phoneNumber}</p>
    <p>Message: ${payload.message}</p>
  `;

  const subject = `Client Message`;
  mailer.sendHtml({ email: adminEmail, subject, content });
}
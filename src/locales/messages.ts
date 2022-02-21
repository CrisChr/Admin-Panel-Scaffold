
export const registeredMessages: string[] = [];

try {
  const locales = require(`${process.cwd()}/src/locales/en-US/messages.json`);

  registeredMessages.push(...Object.keys(locales));
} catch {}

export const registerMessage = (message: string) => {
  registeredMessages.push(message);
};

export const messages = {
  'en-US': {},
  'zh-CN': {},
  'id-ID': {},
  'vi-VN': {},
};

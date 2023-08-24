const REGEXP = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/);

export const isDomainInvalid = (domain: string): boolean => {
  return !REGEXP.test(domain);
};
 // UTILS

 const REG_EX_PARTS = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g

export function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join('.')
  );
}


export function formatFileName(title) {
  return formatDate(new Date()) + ' ' + title.substring(0, 50).replace(/\W+/g, ' ') + '.txt'
}

export function toParts(str) {
  return str && str.match(REG_EX_PARTS) || []
}

export function toPascalCase(str) {
  return toParts(str).map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join('');
}

export function toTitleCase(str) {
  return toParts(str).map(x => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase()).join(' ');
}

export function toCamelCase(str) {
  str = toPascalCase(str)
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function toWords(str) {
  return toParts(str).join(' ')
}

export function toSnakeCase(str) {
  return toParts(str).join('_').toLowerCase()
}

export function toConstantCase(str) {
  return toParts(str).join('_').toUpperCase()
}

export function toKebabCase(str) {
  return toParts(str).join('-').toLowerCase()
}

export function toDotCase(str) {
  return toParts(str).join('.').toLowerCase()
}
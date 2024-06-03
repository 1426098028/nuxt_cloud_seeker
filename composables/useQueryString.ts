export const useQueryString = (obj, prefix = '') => {
    const queryStringParts = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}${key}` : key;
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
          queryStringParts.push(useQueryString(value, `${newKey}`));
        } else if (Array.isArray(value)) {
          value.forEach(val => { queryStringParts.push(`${newKey}=${encodeURIComponent(val)}`); });
        } else {
          value && queryStringParts.push(`${newKey}=${encodeURIComponent(value)}`);
        }
      }
    }
    return queryStringParts.filter(item => item !== '').join('&');
  }

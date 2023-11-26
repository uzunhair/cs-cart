const apiUrl = './filters.json';

const getResource = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`)
  }

  return await response.json();
}

export function getJsonWithDelay(url, delayInMilliseconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Ошибка при получении JSON. Status ${response.status}`)
          }
          return response.json();
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          console.error('Ошибка при получении JSON', error);
        });
    }, delayInMilliseconds);
  });
}

export async function fetchBio(person) {
  const delay = person === 'Bob' ? 2000 : 200;
  return new Promise(resolve => {
    console.log('---resolve', resolve);
    setTimeout(() => {
      resolve('This is ' + person + '’s bio.');
    }, delay);
  })
}

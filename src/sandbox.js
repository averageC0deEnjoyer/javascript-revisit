//from hackerrank basic

async function getTeams(year, k) {
  // write your code here
  // API endpoint template: https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=<YEAR>&page=<PAGE_NUMBER>
  const returnedResultArr = [];
  let promiseDataArr = [];
  let processedData = [];
  const arrTampung = [];
  const teamFrequency = {};
  //check total page
  const data = await fetch(
    `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=1`
  );
  const formattedData = await data.json();

  let total_pages = formattedData.total_pages;
  for (let i = 1; i <= total_pages; i++) {
    const data = fetch(
      `https://jsonmock.hackerrank.com/api/football_matches?competition=UEFA%20Champions%20League&year=${year}&page=${i}`
    );
    promiseDataArr.push(data);
  }

  return Promise.all(promiseDataArr)
    .then((res) => Promise.all(res.map((item) => item.json())))
    .then((res) => {
      processedData = res;
      processedData.forEach((item) => arrTampung.push(item.data));
    })
    .then(() => {
      arrTampung.forEach((item) =>
        item.forEach((obj) => {
          if (teamFrequency[obj.team1] === undefined) {
            teamFrequency[obj.team1] = 1;
          } else if (teamFrequency[obj.team1] !== undefined) {
            teamFrequency[obj.team1]++;
          }
          if (teamFrequency[obj.team2] === undefined) {
            teamFrequency[obj.team2] = 1;
          } else if (teamFrequency[obj.team2] !== undefined) {
            teamFrequency[obj.team2]++;
          }
        })
      );
      //   console.log(teamFrequency);
      Object.entries(teamFrequency).forEach(([key, value]) => {
        if (value >= k) {
          returnedResultArr.push(key);
        }
      });
      //   console.log(returnedResultArr);
      return returnedResultArr.sort();
    });
}

getTeams(2015, 13).then((res) => console.log(res));

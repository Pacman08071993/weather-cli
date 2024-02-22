const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args;

  console.log(rest);

  rest.forEach((elem, index, arr) => {
    if (elem.charAt(0) === "-") {
      if (arr.length - 1 === index) {
        res[elem.substring(1)] = true;
      } else if (arr[index + 1].charAt(1) !== "-") {
        res[elem.substring(1)] = arr[index + 1];
      } else {
        res[elem.substring(1)] = true;
      }
    }
  });
  return res;
};

export { getArgs };

export default function removeUnnecessaryWhiteSpace(input: string): string {
  return input
    .split("")
    .reduce((acc, cur) => {
      if (acc.length == 0 && cur !== "\n" && cur !== " ") {
        acc.push(cur);
      } else {
        switch (cur) {
          case " ": {
            if (acc[acc.length - 1] !== " " && acc[acc.length - 1] !== "\n") {
              acc.push(cur);
            }
            break;
          }
          case "\n": {
            if (acc[acc.length - 1] == " ") {
              acc[acc.length - 1] = cur;
            } else if (acc[acc.length - 1] !== cur) {
              acc.push(cur);
            }
            break;
          }
          default: {
            acc.push(cur);
          }
        }
      }
      return acc;
    }, [])
    .join("")
    .trim();
}

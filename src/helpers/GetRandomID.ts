export type PayloadType = {
  previous: number,
  max: number,
  doneStages: number[]
}

export const getRandomID = (payload: PayloadType) => {
  const {previous, max, doneStages} = payload;
  
  let previousNumber = previous;
  let randomNumber = Math.floor(Math.random() * (max)) + 1;

  while (randomNumber === previousNumber || doneStages.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * (max)) + 1;
  }

  previousNumber = randomNumber;
  return randomNumber;
};
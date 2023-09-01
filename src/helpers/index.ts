export type PayloadType = {
  id: number,
  possibleId: number[],
  forbiddenId: number[],
}

export const getRandomStageId = (payload: PayloadType): number | null => {
  const {id, possibleId, forbiddenId } = payload;

  const filteredIds = possibleId.filter(
    possible => possible !== id && !forbiddenId.includes(possible)
  );
  return filteredIds.length > 0 ? filteredIds[Math.floor(Math.random() * filteredIds.length)] : null;
}

export const calculateHints = (hints: number[]):number => {
  if (hints.length <= 3) {
    return 1;
  }
  return 3;
}
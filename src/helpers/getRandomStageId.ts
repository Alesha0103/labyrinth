export type PayloadType = {
  id: number,
  possibleId: number[],
  forbiddenId: number[],
}

export const getRandomStageId = (payload: PayloadType): number => {
  const {id, possibleId, forbiddenId } = payload;

  const filteredIds = possibleId.filter(
    possible => possible !== id && !forbiddenId.includes(possible)
  );
  return filteredIds.length > 0 ? filteredIds[Math.floor(Math.random() * filteredIds.length)] : 0;
}
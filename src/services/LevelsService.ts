import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILevels } from '../models/ILevels';

export const levelsAPI = createApi({
  reducerPath: "levelsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ['Levels'],
  endpoints: (build) => ({
    fetchAllLevels: build.query<ILevels, number>({
      query: (level: number = 1) => ({
        url: `/levels/${level}`,
      }),
    }),
  })
})
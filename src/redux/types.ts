import { store } from "./store";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export interface IResponsePageInfo {
	count: number;
	pages: number;
	next: string;
	prev: null;
};

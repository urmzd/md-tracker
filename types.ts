import { ErrorMessages, Errors } from './constants/Redux';
import RootReducer from './features';
import { Store } from './App';

export interface OverlaysContainer {
	[overlayName: string]: JSX.Element;
}
export type SymptomScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface LogTemplate {
	startDateTime: string;
	endDateTime?: string;
	headacheRating?: SymptomScale;
	numbnessRating?: SymptomScale;
	visionLossRating?: SymptomScale;
	confusionRating?: SymptomScale;
	nauseaRating?: SymptomScale;
	dizzinessRating?: SymptomScale;
	unsteadinessRating?: SymptomScale;
	notes?: string;
}

export type LogTemplateArray = Array<LogTemplate>;

export interface RejectedPayload {
	type: Errors;
	message: ErrorMessages;
	data?: any;
}

export type RootState = ReturnType<typeof RootReducer>;
export type AppDispatch = typeof Store.dispatch;

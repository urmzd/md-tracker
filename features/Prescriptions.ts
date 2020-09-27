import AsyncStorage from '@react-native-community/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Keys } from '../constants/Misc';
import { ErrorMessages, Errors, Statuses } from '../constants/Redux';
import Prescriptions from '../containers/views/Prescriptions';
import { RejectedPayload, RootState } from '../types';

export interface Prescription {
	name: string;
	dosage: number;
	dosageUnit: string;
	dates: Array<number>;
	times: Array<string>;
}

interface PrescriptionsSlice {
	container: Array<Prescription>;
	status: Statuses;
	error?: RejectedPayload;
}

const initialState: PrescriptionsSlice = {
	container: [],
	status: Statuses.PENDING,
};

type PrescriptionID = Pick<Prescription, 'name' | 'dosage'>;

export const fetchPrescriptions = createAsyncThunk<
	Array<Prescription>,
	undefined,
	{ rejectValue: RejectedPayload }
>(
	'prescriptions/fetchPrescriptions',
	async (undefined, { rejectWithValue }) => {
		try {
			const prescriptions = await AsyncStorage.getItem(
				Keys.PRESCRIPTIONS
			);
			if (prescriptions) {
				const parsedPrescriptions: Array<Prescription> = JSON.parse(
					prescriptions || '{}'
				);

				if (!parsedPrescriptions.length) {
					return rejectWithValue({
						type: Errors.EMPTY,
						message: ErrorMessages.EMPTY_PRESCRIPTIONS,
					});
				}

				return parsedPrescriptions;
			} else {
				return rejectWithValue({
					type: Errors.EMPTY,
					message: ErrorMessages.EMPTY_PRESCRIPTIONS,
				});
			}
		} catch (error) {
			return rejectWithValue({
				type: Errors.RETRIEVAL_ERROR,
				message: ErrorMessages.RETRIEVAL_ERROR,
			});
		}
	}
);

export const addPrescription = createAsyncThunk<
	Prescription,
	Prescription,
	{ rejectValue: RejectedPayload; state: RootState }
>(
	'prescriptions/addPrescription',
	async (payload: Prescription, { getState, rejectWithValue }) => {
		const state = getState();
		const allPrescriptions = state.prescriptions.container;
		const updatedPrescriptions = [...allPrescriptions, payload];
		const serializedPrescriptions = JSON.stringify(updatedPrescriptions);

		try {
			await AsyncStorage.setItem(
				Keys.PRESCRIPTIONS,
				serializedPrescriptions
			);

			return payload;
		} catch (error) {
			return rejectWithValue({
				type: Errors.STORING_ERROR,
				message: ErrorMessages.STORING_ERROR,
				data: payload,
			});
		}
	}
);
export const removePrescription = createAsyncThunk<
	number,
	PrescriptionID | number,
	{ rejectValue: RejectedPayload; state: RootState }
>(
	'prescriptions/removePrescription',
	async (payload: PrescriptionID | number, { getState, rejectWithValue }) => {
		const state = getState();
		const prescriptions = [...state.prescriptions.container];
		let removeIndex = 0;

		if (typeof payload !== 'number') {
			prescriptions.some((prescription: Prescription, index: number) => {
				if (
					prescription.dosage === payload.dosage &&
					prescription.name === payload.name
				) {
					removeIndex = index;
					return true;
				}

				return false;
			});
		} else {
			console.log(payload);
			removeIndex = payload;
		}

		prescriptions.splice(removeIndex, 1);

		try {
			const serializedPrescriptions = JSON.stringify(prescriptions);
			await AsyncStorage.setItem(
				Keys.PRESCRIPTIONS,
				serializedPrescriptions
			);

			return removeIndex;
		} catch (error) {
			return rejectWithValue({
				type: Errors.STORING_ERROR,
				message: ErrorMessages.STORING_ERROR,
				data: payload,
			});
		}
	}
);

export const prescriptions = createSlice({
	name: 'prescriptions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addPrescription.fulfilled, (state, action) => {
			const prescriptions = [...state.container];
			prescriptions.push(action.payload);

			state.container = prescriptions;
			state.status = Statuses.FULFILLED;
		});
		builder.addCase(addPrescription.rejected, (state, action) => {
			state.error = action.payload;
			state.status = Statuses.REJECTED;
		});
		builder.addCase(addPrescription.pending, (state) => {
			state.status = Statuses.PENDING;
		});
		builder.addCase(removePrescription.fulfilled, (state, action) => {
			const prescriptions = [...state.container];
			prescriptions.splice(action.payload, 1);

			state.container = prescriptions;
			state.status = Statuses.REJECTED;
		});
		builder.addCase(removePrescription.rejected, (state, action) => {
			state.error = action.payload;
			state.status = Statuses.REJECTED;
		});
		builder.addCase(removePrescription.pending, (state) => {
			state.status = Statuses.PENDING;
		});
		builder.addCase(fetchPrescriptions.fulfilled, (state, action) => {
			state.container = action.payload;
			state.status = Statuses.FULFILLED;
		});
		builder.addCase(fetchPrescriptions.rejected, (state, action) => {
			state.error = action.payload;
			state.status = Statuses.REJECTED;
		});
		builder.addCase(fetchPrescriptions.pending, (state) => {
			state.status = Statuses.PENDING;
		});
	},
});

export default prescriptions.reducer;

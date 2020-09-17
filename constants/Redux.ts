export enum Statuses {
	PENDING = 'pending',
	REJECTED = 'rejected',
	FULFILLED = 'fulfilled',
}

export enum Errors {
	EMPTY = 'empty',
	RETRIEVAL_ERROR = 'retrieval error',
	STORING_ERROR = 'storing error',
}

export enum ErrorMessages {
	EMPTY_LOG = "Wow... It looks like no logs exist! You can start a log using the 'Play' button on the home page!",
	EMPTY_PRESCRIPTIONS = "Oh Jeez... It looks like no prescriptions have been added... You can add one using the '+' Button!",
	RETRIEVAL_ERROR = "Oops... It seems like we couldn't get your data! Don't worry though, the data retrieval will be attempted again momentarily!",
	STORING_ERROR = "Hmm... It seems like the save failed! Don't worry though, the save will be attempted again momentarily!",
	INTERNAL_ERROR = 'Something went wrong... Please reset the app to fix it!',
}

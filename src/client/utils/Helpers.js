
import moment from 'moment';

export const prettifyDate = date =>{
	if( !date || date === " " ){
		return 'Invalid date';
	}
	const d = new Date(date)
	const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
	const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
	const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
	
	return `${mo} ${da}, ${ye}`;
};

/**
 * Note for moment:
 * The onChange event gives a moment object
 * To get the unix timestamp from it, call selectedDate.unix()
 * To convert a unix timestamp to moment object, call var parsed = moment.unix(timestamp), 
 * and print parsed.toDate(), you'll get your displayable date string
 */	

export const getTimestampFromMoment = date => date.unix();
export const getMomentFromTimestamp = timestamp => moment.unix(timestamp);


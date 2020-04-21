
import moment from 'moment';

/**
 * Note for moment:
 * The onChange event gives a moment object
 * To get the unix timestamp from it, call selectedDate.unix()
 * To convert a unix timestamp to moment object, call var parsed = moment.unix(timestamp), 
 * and print parsed.toDate(), you'll get your displayable date string
 */	

export const getTimestampFromMoment = date => date.unix();
export const getDateStringFromTimestamp = timestamp => getMomentFromTimestamp(timestamp).format('MMMM Do YYYY');
export const getMomentFromTimestamp = timestamp => moment.unix(timestamp);
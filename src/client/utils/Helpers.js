
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
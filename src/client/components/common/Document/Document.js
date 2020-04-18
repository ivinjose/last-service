import React from 'react';
import styles from './Document.css';

const Document = ({document, style}) => {
	return(
		<div className={styles['document']} style={style} key={document._id} >
			<div className={styles['date']}>Expires on: {document.renewalDate}</div>
			<table>
				<tbody>
					{
						document.vehicle &&
						<tr>
							<td className={styles['col']}>Vehicle</td>
							<td className={styles['col-details']}><span>{document.vehicle}</span></td>
						</tr>
					}			
					<tr>
						<td className={styles['col']}>Document</td>
						<td className={styles['col-details']}><span>{document.documentType}</span></td>
					</tr>
					<tr>
						<td className={styles['col']}>Reminder on</td>
						<td className={styles['col-details']}><span>{document.reminderDate}</span></td>
					</tr>
				</tbody>
			</table>
			{ document.comment && <div className={styles['comment']}>{document.comment}</div> }
		</div>
	);
};

const DocumentEmpty = () => {
	return(
		<div className={styles['document-empty']} >
			<div className={styles['date']}></div>
			<div className={styles['vehicle']}></div>
			<div className={styles['type']}></div>
			<div className={styles['reminder-date']}></div>
			<div className={styles['comment']}></div>
		</div>
	);
}

export default Document;
export { DocumentEmpty };
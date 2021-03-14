import React from 'react';
import styles from './OptionsMenu.css';

const OptionsMenu = ({options}) => {
    if( options.length == 0 ) return null;

	const [ isExpanded, expandOptions ] = React.useState(false);
	const onOptionsClick = () => expandOptions(!isExpanded);
    const onBackdropClick = () => expandOptions(false);

	return(
        <React.Fragment>
            {
                isExpanded &&
                <div className={styles['backdrop']} onClick={onBackdropClick}></div>
            }
            <div className={styles['options']} onClick={onOptionsClick}>
                <div className={styles['button']}>...</div>
                {
                    isExpanded &&
                    <ul className={styles['items']}>
                        {
                            options.map( option => {
                                return <li className={styles['item']} onClick={option.action}>{option.label}</li>
                            })
                        }
                        
                    </ul>
                }
            </div>
        </React.Fragment>
	);
}

export default OptionsMenu;
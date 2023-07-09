import PropTypes from 'prop-types';

import './footer.css';

const Footer = ({onChangeFilter, filter, deleteAllCompleted, countActive}) => {

    const buttonsData = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'},
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const clazz = filter === name ? 'selected' : '';
        return (
            <li key={name} >
                <button className={clazz} onClick={() => onChangeFilter(name)} >{label}</button>
            </li>
        )
    })

    return (
        <footer className='footer'>
            <span className="todo-count">{countActive} items left</span>
            <ul className="filters">
                { buttons }
            </ul>
            <button className="clear-completed" onClick={deleteAllCompleted}>Clear completed</button>
        </footer>
    )
}

Footer.propTypes = {
    onChangeFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    deleteAllCompleted: PropTypes.func,
    countActive: PropTypes.number.isRequired
}

export default Footer;
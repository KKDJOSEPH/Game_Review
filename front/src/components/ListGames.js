import React from 'react'
import PropTypes from 'prop-types'

function ListGames(props) {
    const {games} = props;
    const renderGames = () => {
        let res = [];
        let i = 0;
        for (let g of games) {
            res.push(<div key={"Game" + i}>{g.title}</div>);
            i += 1;
    }
        return res;
        //return games.map((g, i) => <div key={"Game" + i}>{g.title}</div>)
    };
    return (
        <div className="ListGames">
          {renderGames()}  
        </div>
    )
};

ListGames.propTypes = {
    games: PropTypes.array.isRequired,
}

export default ListGames;

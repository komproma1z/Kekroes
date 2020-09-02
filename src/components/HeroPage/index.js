import React from 'react';
import { connect } from 'react-redux'
import { styled } from "styletron-react";
import racesData from '../../data/races.json';
class HeroesPage extends React.PureComponent {
    render() {
        console.log(racesData);
        const { selectedHero } = this.props;
        if (!selectedHero) {
            return null;
        }
        return (
            <div style={{borderBottom: '2px solid black'}}>
                <br/>
                HP: {selectedHero.hp}<br/>
                Attack: {selectedHero.stats.attack}<br/>
                Defense: {selectedHero.stats.defense}<br/>
                Spell Power: {selectedHero.stats.spellPower}<br/>
                Knowledge: {selectedHero.stats.knowledge}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      selectedHero: state.heroesReducer.selectedHero,
    }
  }

export default connect(
    mapStateToProps,
    null
  )(HeroesPage)
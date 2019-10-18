import React from 'react';
import { connect } from 'react-redux'
import { selectHeroes } from '../../store/heroesStore/selectors';
import { addHero, selectHero } from '../../store/heroesStore';
import { styled } from "styletron-react";

const HeroesList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100px',
    borderBottom: '2px solid black',
});

class HeroesBar extends React.PureComponent {
    render() {
        const { heroes } = this.props;
        if (heroes.length < 1) {
            this.props.addHero({name: 'Bensalio', race: 'Ogre', hp: 70, stats: {attack: 9, defense: 7, spellPower: 3, knowledge: 2}})
            this.props.addHero({name: 'Linus', race: 'Orion', hp: 70, stats: {attack: 5, defense: 6, spellPower: 6, knowledge: 4}})
            this.props.addHero({name: 'Shoshuarde', race: 'Giblin', hp: 120, stats: {attack: 4, defense: 4, spellPower: 4, knowledge: 3}})
        }
        return (
            <>
                {/* <HeroesList>{heroes.map(hero => <span onClick={() => this.props.selectHero(hero)}>{hero.name}</span>)}</HeroesList> */}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
      heroes: selectHeroes(state),
    }
  }
  
  const mapDispatchToProps = {
      addHero,
      selectHero
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeroesBar)
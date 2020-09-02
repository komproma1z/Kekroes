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
        return (
            <>
                <HeroesList>{heroes.map(hero => <span onClick={() => this.props.selectHero(hero)}>{hero.name}</span>)}</HeroesList>
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
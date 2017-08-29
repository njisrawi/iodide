import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Mousetrap from 'mousetrap'

import actions from './actions.jsx'
import Cell from './cell.jsx'
import DeclaredProperties from './declared-properties.jsx'


Mousetrap.prototype.stopCallback  = function () {
     return false;
}
class Page extends React.Component {
  constructor(props) {
    super(props)

    Mousetrap.bind(['up'], ()=>{
      if (this.props.mode === 'command') {
        if (this.props.currentlySelected != undefined) {
          var selectedID = this.props.currentlySelected.id
          
          var order = this.props.cells
            .map((d,i)=>{return [i,d]})
            .filter((di)=>di[1].id == selectedID)[0][0]

          if (order > 0) {
            var nextID = this.props.cells[order-1].id
            this.props.actions.selectCell(nextID)
          }

        } else {
          if (this.props.cells.length) {
            this.props.actions.selectCell(0)
          }
        }
      }
    })

    Mousetrap.bind(['down'], ()=>{
      if (this.props.mode === 'command') {
        if (this.props.currentlySelected != undefined) {

          var selectedID = this.props.currentlySelected.id

          var order = this.props.cells
              .map((d,i)=>{return [i,d]})
              .filter((di)=>di[1].id == selectedID)[0][0]

          if (order < this.props.cells.length-1) {
            var nextID = this.props.cells[order+1].id
            this.props.actions.selectCell(nextID)
          }

        } else {
          if (this.props.cells.length) {
            this.props.actions.selectCell(0)
          }
        }
      }
    })

    Mousetrap.bind(['escape', 'esc'], (e)=>{
      if (this.props.mode !== 'command') this.props.actions.changeMode('command')  
    })

    Mousetrap.bind(['enter', 'return'], (e)=>{
      if (this.props.mode !== 'edit') this.props.actions.changeMode('edit')
    });


    Mousetrap.bind(['shift+del', 'shift+backspace'], ()=>{
      if (this.props.currentlySelected != undefined) {
        var selectedID = this.props.currentlySelected.id
        // if selectedID >
        var nextID;
        if (selectedID === this.props.cells.length-1) nextID = this.props.cells.length-2
        else nextID = selectedID+1

        this.props.actions.deleteCell(selectedID)
        this.props.actions.selectCell(nextID)
        // pick next item, if 
      }
    });




  }

  addCell() {
    this.props.actions.addCell('javascript');
  }



  render () {
    var cells = this.props.cells.map((cell)=> {
      return <Cell cell={cell} pageMode={this.props.mode} actions={this.props.actions} key={cell.id} id={cell.id} />
    });
    var declaredPropertiesPane;
    if (Object.keys(this.props.declaredProperties).length) {
      declaredPropertiesPane = <DeclaredProperties state={this.props.declaredProperties} />
    } else {
      declaredPropertiesPane = <div></div>
    }

    return (
        <div>

          <h1 className='page-title'>Javascript Notebook <span>{this.props.mode}</span></h1>
          <div className='controls'>
          	<button onClick={this.addCell.bind(this)}> + </button>
          </div>

          <div className='cells'>
          	{cells}
          </div>
            
          {declaredPropertiesPane}

        </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
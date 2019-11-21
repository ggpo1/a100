import React from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Star, Text, Rect } from 'react-konva';

import IMapProps from './Models/Map/IMapProps';
import IMapState from './Models/Map/IMapState';


export default class Map extends React.Component<IMapProps, IMapState> {
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 2,
        y: 2
      },
      shadowColor: 'grey',
      scaleX: 1.1,
      scaleY: 1.1
    });
  };


  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffset: null,
      shadowColor: 'white',
    });
  };

  handleMouseDownRect = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 2,
        y: 2
      },
      shadowColor: 'grey',
      scaleX: 1.1,
      scaleY: 1.1
    });
  }

  handleMouseMove = e => {
    if (this.state.isMouseDown) {
      const stage = e.target.getStage();
      console.log('mouse down');
    } else {
      console.log('mouse not down');
    }
  }

  handleMouseDown = e => {
    const stage = e.target.getStage();
    //stage.getPointerPosition().x
    //stage.getPointerPosition().y
    this.setState({
      ...this.state,
      ...{ isMouseDown: true, }
    })
    // 
    // stage.
  }

  handleMouseUp = e => {
    this.setState({
      ...this.state,
      ...{ isMouseDown: false, }
    })
  }

  handleWheel = e => {
    e.evt.preventDefault();

    const scaleBy = 1.04;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: (newScale * -1), y: (newScale * -1) });

    this.setState({
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale, 
        // (newScale * -1),
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        // (newScale * -1),
    });
  };


  constructor(props: IMapProps) {
    super(props);
    this.state = {
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      isMouseDown: false
    }
  }

  render() {
    return (
      <Stage
        style={{
          cursor: 'pointer'
        }}
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={this.handleWheel}
        draggable
        onMouseMove={this.handleMouseMove}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        scaleX={this.state.stageScale}
        scaleY={this.state.stageScale}
        x={this.state.stageX}
        y={this.state.stageY}>
        <Layer>
          {/* <Text text="Try to drag a star" /> */}
          {/* {[...Array(1)].map((_, i) => ( */}

          <Rect
            x={100}
            y={100}
            width={149}
            height={49}
            fill="#E2E6EA"
            draggable
            strokeWidth={1} // border width
            stroke="#3E454D"
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
          />
          {/* ))} */}
        </Layer>
      </Stage>
    );
  }

}

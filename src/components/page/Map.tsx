import React from 'react';
import Konva from 'konva';
import { render } from 'react-dom';
import { Stage, Layer, Star, Text, Rect } from 'react-konva';

import IMapProps from '../../model/Components/Map/IMapProps';
import IMapState from '../../model/Components/Map/IMapState';


export default class Map extends React.Component<IMapProps, IMapState> {
  handleDragStart = e => {
    e.target.setAttrs({

      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      // easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };
  constructor(props: IMapProps) {
    super(props);
  }

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {/* <Text text="Try to drag a star" /> */}
          {/* {[...Array(1)].map((_, i) => ( */}
            
            <Rect
              x={100}
              y={100}
              width={150}
              height={50}
              style={{
                border: '1px solid black'
              }}
              fill="#3E454D"
              draggable
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            />
            <Rect
              x={103}
              y={103}
              width={144}
              style={{
                border: '1px solid black'
              }}
              height={44}
              fill="#E2E6EA"
              draggable
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            />
          {/* ))} */}
        </Layer>
      </Stage>
    );
  }

}

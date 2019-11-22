import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect } from 'react-konva';

import IMapProps from './Models/Components/Map/IMapProps';
import IMapState from './Models/Components/Map/IMapState';
import Stillage from './Components/Stillage';
import LayerType from './Models/Enums/LayerType';
import './Css/Map.css';


export default class Map extends React.Component<IMapProps, IMapState> {

  constructor(props: IMapProps) {
    super(props);
    this.state = {
      selectedLayer: -1,
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      isMouseDown: false,
      source: this.props.source,
    }
  }



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
      // console.log('mouse down');
    } else {
      // console.log('mouse not down');
    }
  }

  handleMouseDown = e => {
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

    const scaleBy = 1.025;
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




  render() {
    const { source, selectedLayer } = this.state;
    let layersTitles: Array<JSX.Element> = [];
    let objects: Array<JSX.Element> = [];
    let stillages: Array<JSX.Element> = [];
    let signatures: Array<JSX.Element> = [];
    let layers: Array<JSX.Element> = [];

    let height = window.innerHeight - (window.innerHeight * (4 / 100));

    // TODO: layers render
    layersTitles.push(
      <div key={"layerTitle_" + -1} className="layer-title" onClick={() => {
        this.setState({ ...this.state, ...{ selectedLayer: -1 } })
      }}>
        Все слои
      </div>
    );
    for (let i = 0; i < source.length; i++) {
      layersTitles.push(
        <div onClick={() => {
          this.setState({ ...this.state, ...{ selectedLayer: i } })
        }} key={"layerTitle_" + i} className="layer-title">{source[i].title}</div>
      );
    }

    if (selectedLayer === -1) {
      let layernum = 0;
      source.forEach(element => {
        if (element.objects !== undefined) {

        }
        if (element.stillages !== undefined) {
          for (let i = 0; i < element.stillages!.length; i++) {
            stillages.push(
              <Stillage key={"stillage_" + layernum + "_" + i} source={element.stillages![i]} />
            );
          }
        }
        if (element.signatures !== undefined) {

        }
        layernum++;
      });
    } else {
      if (source[selectedLayer] !== undefined) {
        if (source[selectedLayer].type === LayerType.STILLAGES) {
          for (let i = 0; i < source[selectedLayer].stillages!.length; i++) {
            stillages.push(
              <Stillage key={"stillage_" + selectedLayer + "_" + i} source={source[selectedLayer].stillages![i]} />
            );
          }
        } else if (source[selectedLayer].type === LayerType.SIGNATURES) {

        } else if (source[selectedLayer].type === LayerType.ABSTRACTS) {

        }
      }
    }

    return (
      <div className="map-wrapper">
        <div className="stage-wrapper">
          <Stage
            draggable
            style={{ cursor: 'pointer' }}
            width={window.innerWidth}
            height={height}
            onWheel={this.handleWheel}
            onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            scaleX={this.state.stageScale}
            scaleY={this.state.stageScale}
            x={this.state.stageX}
            y={this.state.stageY}>
            <Layer>
              {stillages}
            </Layer>
          </Stage>
        </div>
        <div style={{ background: '#E0E0E0' }} className="layers-selector-wrapper">
          {layersTitles}
        </div>
      </div>
    );
  }

}

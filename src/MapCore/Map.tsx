import React from 'react';
import Konva from 'konva';
import { Stage, Layer, Rect } from 'react-konva';

import IMapProps from './Models/Components/Map/IMapProps';
import IMapState from './Models/Components/Map/IMapState';
import Stillage from './Components/Stillage';
import LayerType from './Models/Enums/LayerType';
import './Css/Map.css';
import Wall from './Components/Wall';
import ComponentsMenuBar from './Components/Page/ComponentsMenuBar';
import Orientation from './Models/Enums/Orientation';
import SignaturePosition from './Models/Enums/SignaturePosition';
import StillageSize from './Models/Enums/StillageSize/StillageSize';
import DefectColors from './Models/Enums/Colors/DefectColors';
import AppState from './Data/AppState';


export default class Map extends React.Component<IMapProps, IMapState> {

  constructor(props: IMapProps) {
    super(props);
    this.state = {
      selectedUnit: 0,
      selectedLayer: -1,
      stageScale: 1,
      stageX: 0,
      stageY: 0,
      isMouseDown: false,
      source: this.props.source,
      isOnlyRed: true,
    }
    this.filtersOnChangeAction = this.filtersOnChangeAction.bind(this);
  }

  public filtersOnChangeAction(checkName) {
    switch (checkName) {
      case 'onlyRed':
        this.setState({ ...this.state, ...{ isOnlyRed: !this.state.isOnlyRed } });
        break;

      default:
        break;
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
    console.log("dragged")
    // if (this.state.isMouseDown) {
    //   // console.log('mouse down');
    // } else {
    //   // console.log('mouse not down');
    // }
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
    const { source, selectedLayer, selectedUnit } = this.state;
    let unitsTitles: Array<JSX.Element> = [];
    let layersTitles: Array<JSX.Element> = [];
    let objects: Array<JSX.Element> = [];
    let stillages: Array<JSX.Element> = [];
    let signatures: Array<JSX.Element> = [];
    let layers: Array<JSX.Element> = [];
    let walls: Array<JSX.Element> = [];

    // calculating height for map stage
    let height = window.innerHeight;


    for (let i = 0; i < source.length; i++) {
      unitsTitles.push(
        <div onClick={() => {
          this.setState({ ...this.state, ...{ selectedUnit: i, selectedLayer: -1 } });
        }} className="unit-title">
          <span style={{ fontWeight: selectedUnit === i ? 'bold' : 'normal' }}>{source[i].title}</span>
        </div>
      );
    }

    layersTitles.push(
      <div key={"layerTitle_" + selectedUnit + "_" + -1} style={{ fontWeight: selectedLayer === -1 ? 'bold' : 'normal' }} className="layer-title" onClick={() => {
        this.setState({ ...this.state, ...{ selectedLayer: -1 } })
      }}>
        Все слои
      </div>
    );
    for (let i = 0; i < source[selectedUnit].layers.length; i++) {
      layersTitles.push(
        <div style={{ fontWeight: selectedLayer === i ? 'bold' : 'normal' }} onClick={() => {
          this.setState({ ...this.state, ...{ selectedLayer: i } })
        }} key={"layerTitle_" + selectedUnit + "_" + i} className="layer-title">{source[selectedUnit].layers[i].title}</div>
      );
    }

    if (selectedLayer === -1) {
      let layernum = 0;
      source[selectedUnit].layers.forEach(element => {
        if (element.objects !== undefined) {

        }
        if (element.stillages !== undefined) {
          for (let i = 0; i < element.stillages!.length; i++) {
            stillages.push(
              <Stillage key={"stillage_" + selectedUnit + "_" + layernum + "_" + i} source={element.stillages![i]} />
            );
          }
        }
        if (element.walls !== undefined) {
          for (let i = 0; i < element.walls!.length; i++) {
            walls.push(
              <Wall
                key={"wall_" + selectedUnit + "_" + layernum + "_" + i}
                source={element.walls[i]}
              />
            );
          }
        }
        layernum++;
      });
    } else {
      if (source[selectedUnit].layers[selectedLayer] !== undefined) {
        if (source[selectedUnit].layers[selectedLayer].type === LayerType.STILLAGES) {
          for (let i = 0; i < source[selectedUnit].layers[selectedLayer].stillages!.length; i++) {
            stillages.push(
              <Stillage key={"stillage_" + selectedUnit + "_" + selectedLayer + "_" + i} source={source[selectedUnit].layers[selectedLayer].stillages![i]} />
            );
          }
        } else if (source[selectedUnit].layers[selectedLayer].type === LayerType.WALLS) {
          for (let i = 0; i < source[selectedUnit].layers[selectedLayer].walls!.length; i++) {
            walls.push(
              <Wall
                key={"wall_" + selectedUnit + "_" + selectedLayer + "_" + i}
                source={source[selectedUnit].layers[selectedLayer].walls![i]}
              />
            );
          }
        } else if (source[selectedUnit].layers[selectedLayer].type === LayerType.ABSTRACTS) {

        }
      }
    }

    let smallPlaceSignatures = [
      {
        place: 1,
        title: '1',
      },
      {
        place: 2,
        title: '2',
      },
    ];

    let bigPlaceSignatures = [
      {
        place: 1,
        title: '1',
      },
      {
        place: 2,
        title: '2',
      },
      {
        place: 3,
        title: '3',
      },
    ];

    return (
      <div className="map-wrapper"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();

          console.log('dragging');
        }} >
        <div className="stage-wrapper" onDrop={(e) => {
          const { source } = this.state;
          let _selectedLayer;
          if (selectedLayer === -1) {
            if (source[selectedUnit].layers[0].stillages !== undefined) {
              _selectedLayer = 0;
            }
          } else {
            _selectedLayer = selectedLayer;
          }
          source[selectedUnit].layers[_selectedLayer].stillages!.push(
            {
              title: '2.1.1',
              x: e.clientX,
              y: e.clientY,
              orientation: AppState.State.dragItemProps.stillageOrientation,
              signature: {
                title: '1',
                position: AppState.State.dragItemProps.stillageCaption,
              },
              size: AppState.State.dragItemProps.stillageSize,
              placeSignatures: AppState.State.dragItemProps.stillageSize === StillageSize.NORMAL ? bigPlaceSignatures : smallPlaceSignatures,
              viks: []
            },
          );
          this.setState({ ...this.state, ...source });
        }}>
          <Stage
            draggable
            style={{ cursor: 'pointer' }}
            width={window.innerWidth}
            height={height}
            onWheel={this.handleWheel}
            onDragEnd={this.handleMouseMove}

            // onDra={() => { alert('dropped') }}
            // onMouseMove={this.handleMouseMove}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            scaleX={this.state.stageScale}
            scaleY={this.state.stageScale}
            x={this.state.stageX}
            y={this.state.stageY}>
            <Layer>
              {stillages}
              {walls}
            </Layer>
          </Stage>
        </div>
        <div style={{ background: '#E0E0E0' }} className="layers-selector-wrapper">
          {layersTitles}
        </div>
        <div style={{ background: '#E0E0E0' }} className="units-selector">
          <div style={{ background: '' }} className="unit-header-title">
            <span style={{ height: '50%' }}>Выбор блока</span>
          </div>
          <div style={{ background: '' }} className="unit-content">
            {unitsTitles}
          </div>
        </div>
        <div className="filters-selector" style={{ background: '#E0E0E0' }}>
          <div style={{ background: '' }} className="filter-header-title">
            <span style={{ height: '50%' }}>Фильтры</span>
          </div>
          <div style={{ background: '' }} className="filter-content">
            <div className="input-checkbox">
              <div style={{}}><input onChange={() => this.filtersOnChangeAction('onlyRed')} style={{ height: '50%' }} type="checkbox" name="option2" value="a2" /></div>
              <div style={{ height: '100%', paddingLeft: '2%', display: 'flex' }}>
                только опасные
              </div>
            </div>
            <div className="input-checkbox">
              <div style={{}}><input onChange={() => this.filtersOnChangeAction('onlyRed')} style={{ height: '50%' }} type="checkbox" name="option2" value="a2" /></div>
              <div style={{ height: '100%', paddingLeft: '2%', display: 'flex' }}>
                убрать повреждения
              </div>
            </div>
          </div>
        </div>
        <ComponentsMenuBar />
      </div>
    );
  }

}

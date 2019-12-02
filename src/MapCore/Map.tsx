import React from 'react';
import {Layer, Stage} from 'react-konva';

import IMapProps from './Models/Components/Map/IMapProps';
import IMapState from './Models/Components/Map/IMapState';
import Stillage from './Components/Stillage';
import LayerType from './Models/Enums/LayerType';
import './Css/Map.css';
import Wall from './Components/Wall';
import AppState from './Data/AppState';
import Orientation from "./Models/Enums/Orientation";
import Emit from "./Data/Emit";
import ElementsPanel from "./Components/Page/Panels/ElementsPanel";
import ElementSource from "./Data/ElementsSource";
import StillageWorker from "./Services/StillageWorker";
import ElementItem from "./Models/ArrayItems/ElementItem";
import MapObject from "./Components/MapObject";


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
      cursorCoords: {
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
      },
      isDrawing: false,
    };
    // Биндинг
    this.filtersOnChangeAction = this.filtersOnChangeAction.bind(this);
    this.ElementOnDrop = this.ElementOnDrop.bind(this);
    this.MapWrapperOnMouseMove = this.MapWrapperOnMouseMove.bind(this);
    this.deleteWall = this.deleteWall.bind(this);

    Emit.Emitter.addListener('deleteWall', this.deleteWall);

  }

  public deleteWall() {
    alert('DELETING')
  }

  public MapWrapperOnMouseMove(e) {
    if (this.state.isDrawing) {
      this.setState(
          {
            ...this.state,
            ...{
              cursorCoords: {
                startX: this.state.cursorCoords.startX,
                startY: this.state.cursorCoords.startY,
                x: e.clientX,
                y: e.clientY,
              }
            }
          }
      );
    }
  }

  public ElementOnDrop(e) {
      const { source, selectedUnit, selectedLayer } = this.state;
      let selected: ElementItem = AppState.State.selectedEl;
      let stillageWorker = new StillageWorker();
      if (selected !== undefined) {
          if (selectedLayer !== -1) {
              if (selected.type === LayerType.STILLAGES) {
                  if (source[selectedUnit].layers[selectedLayer].stillages === undefined) {
                      source[selectedUnit].layers[selectedLayer].stillages = [];
                  }
                  source[selectedUnit].layers[selectedLayer].stillages!.push(
                      stillageWorker.getStillageSourceItem({x: e.clientX, y: e.clientY}, selected.stillageType!)
                  );
              } else if (selected.type === LayerType.ABSTRACTS) {
                  if (source[selectedUnit].layers[selectedLayer].objects === undefined) {
                      source[selectedUnit].layers[selectedLayer].objects = [];
                  }
                  source[selectedUnit].layers[selectedLayer].objects!.push(
                      {
                          x: e.clientX,
                          y: e.clientY,
                          photo: selected.photo,
                      }
                  );

              } else if (selected.type === LayerType.WALLS) {
                  alert('Чтобы отрисовать стену, кликните на элемент стены, зажмите правую кнопку мыши на карте и потяните.');
              }
          } else {
              alert('Выберите слой')
          }
          this.setState({...this.state, ...source});
      }
  };



  public filtersOnChangeAction(checkName) {
    // switch (checkName) {
    //   case 'onlyRed':
    //     this.setState({ ...this.state, ...{ isOnlyRed: !this.state.isOnlyRed } });
    //     break;
    //
    //   default:
    //     break;
    // }
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
  };

  handleMouseMove = e => {
    console.log("dragged")
    // if (this.state.isMouseDown) {
    //   // console.log('mouse down');
    // } else {
    //   // console.log('mouse not down');
    // }
  };

  handleMouseDown = e => {
    //stage.getPointerPosition().x
    //stage.getPointerPosition().y
    this.setState({
      ...this.state,
      ...{ isMouseDown: true, }
    })
    // 
    // stage.
  };

  handleMouseUp = e => {
    this.setState({
      ...this.state,
      ...{ isMouseDown: false, }
    })
  };

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


    let height = window.innerHeight;


    for (let i = 0; i < source.length; i++) {
      unitsTitles.push(
        <div onClick={() => {
          this.setState({ ...this.state, ...{ selectedUnit: i, selectedLayer: -1 } });
        }} className="unit-title">
          <span style={{
              fontWeight: selectedUnit === i ? 'bold' : 'normal',
              color: selectedUnit === i ? '#2f00ff' : 'black'
          }}>{source[i].title}</span>
        </div>
      );
    }

    layersTitles.push(
      <div key={"layerTitle_" + selectedUnit + "_" + -1} style={{
          fontWeight: selectedLayer === -1 ? 'bold' : 'normal',
          color: selectedLayer === -1 ? '#2f00ff' : 'black'
      }} className="layer-title" onClick={() => {
        this.setState({ ...this.state, ...{ selectedLayer: -1 } })
      }}>
        Все слои
      </div>
    );
    for (let i = 0; i < source[selectedUnit].layers.length; i++) {
      layersTitles.push(
        <div style={{
            fontWeight: selectedLayer === i ? 'bold' : 'normal',
            color: selectedLayer === i ? '#2f00ff' : 'black'
        }} onClick={() => {
          this.setState({ ...this.state, ...{ selectedLayer: i } })
        }} key={"layerTitle_" + selectedUnit + "_" + i} className="layer-title">{source[selectedUnit].layers[i].title}</div>
      );
    }

    if (selectedLayer === -1) {
      let layerNum = 0;
      source[selectedUnit].layers.forEach(element => {
        if (element.objects !== undefined) {
            for (let i = 0; i < element.objects!.length; i++) {
                objects.push(
                    <MapObject key={"objects_" + selectedUnit + "_" + layerNum + "_" + i} source={element.objects![i]} />
                );
            }
        }
        if (element.stillages !== undefined) {
          for (let i = 0; i < element.stillages!.length; i++) {
            stillages.push(
              <Stillage key={"stillage_" + selectedUnit + "_" + layerNum + "_" + i} source={element.stillages![i]} />
            );
          }
        }
        if (element.walls !== undefined) {
          for (let i = 0; i < element.walls!.length; i++) {
            walls.push(
              <Wall
                key={"wall_" + selectedUnit + "_" + layerNum + "_" + i}
                source={element.walls[i]}
              />
            );
          }
        }
        layerNum++;
      });
    } else {
      if (source[selectedUnit].layers[selectedLayer] !== undefined) {
          if (source[selectedUnit].layers[selectedLayer].stillages !== undefined) {
              for (let i = 0; i < source[selectedUnit].layers[selectedLayer].stillages!.length; i++) {
                  stillages.push(
                      <Stillage key={"stillage_" + selectedUnit + "_" + selectedLayer + "_" + i}
                                source={source[selectedUnit].layers[selectedLayer].stillages![i]}/>
                  );
              }
          }
          if (source[selectedUnit].layers[selectedLayer].walls !== undefined) {
              for (let i = 0; i < source[selectedUnit].layers[selectedLayer].walls!.length; i++) {
                  walls.push(
                      <Wall
                          key={"wall_" + selectedUnit + "_" + selectedLayer + "_" + i}
                          source={source[selectedUnit].layers[selectedLayer].walls![i]}
                      />
                  );
              }
          }
          if (source[selectedUnit].layers[selectedLayer].objects !== undefined) {
              for (let i = 0; i < source[selectedUnit].layers[selectedLayer].objects!.length; i++) {
                  walls.push(
                      <MapObject
                          key={"object_" + selectedUnit + "_" + selectedLayer + "_" + i}
                          source={ source[selectedUnit].layers[selectedLayer].objects![i] }
                      />
                  );
              }
          }
      }
    }



    let main, blocks, filters, elements, elementsPanel;

    // elementsPanel = ;

    blocks = (
        <div style={{ background: '#E0E0E0' }} className="units-selector">
          <div style={{ background: '' }} className="unit-header-title">
            <span style={{ height: '50%' }}>Выбор блока</span>
          </div>
          <div style={{ background: '' }} className="unit-content">
            {unitsTitles}
          </div>
        </div>
    );
    filters = (
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
    );
    // elements = <ComponentsMenuBar />;

    elementsPanel = <ElementsPanel source={ElementSource} />;

    main = (<div className="map-wrapper"
                 onDragOver={(e) => {
                   e.preventDefault();
                   e.stopPropagation();
                 }}

    >

      <div className="stage-wrapper" onDrop={(e) => { this.ElementOnDrop(e) }}
           onMouseMove={(e) => { this.MapWrapperOnMouseMove(e) }}
           id={"stageWrapper"}
      >
        <Stage
            draggable={!this.state.isDrawing}
            style={{ cursor: 'pointer' }}
            width={window.innerWidth}
            height={height}
            onWheel={this.handleWheel}

            scaleX={this.state.stageScale}
            scaleY={this.state.stageScale}
            x={this.state.stageX}
            y={this.state.stageY}>
          <Layer>
            {walls}
            {stillages}
            {objects}
          </Layer>
        </Stage>
      </div>
        {elementsPanel}

      <div className={"right-bars-wrapper"}>

        {blocks}
        {filters}
      </div>
      <div style={{ background: '#E0E0E0' }} className="layers-selector-wrapper">
        {layersTitles}
      </div>

    </div>);

    // let components = [];

    return main;
  }

}

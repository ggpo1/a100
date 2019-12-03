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
import WallItem from "./Models/ArrayItems/WallIem";
import DefectBrowsePanel from "./Components/Page/Panels/DefectBrowsePanel";


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
      cncFlag: false,
      isDefectBrowsePanel: true,
      layersSelected: [],
    };
    // Биндинг
    this.filtersOnChangeAction = this.filtersOnChangeAction.bind(this);
    this.ElementOnDrop = this.ElementOnDrop.bind(this);
    this.MapWrapperOnMouseMove = this.MapWrapperOnMouseMove.bind(this);
    this.deleteWall = this.deleteWall.bind(this);
    this.cncFlagChange = this.cncFlagChange.bind(this);
    this.addElement = this.addElement.bind(this);
    this.selectLayerToList = this.selectLayerToList.bind(this);
    this.StageOnMouseDownHandler = this.StageOnMouseDownHandler.bind(this);
    this.StageOnMouseUpHandler = this.StageOnMouseUpHandler.bind(this);
    this.StageOnMouseMoveHandler = this.StageOnMouseMoveHandler.bind(this);
    this.defectBrowsePanelWorker = this.defectBrowsePanelWorker.bind(this);

    Emit.Emitter.addListener('deleteWall', this.deleteWall);

    Emit.Emitter.addListener('defectBrowsePanelWorkerHandle', this.defectBrowsePanelWorker);
    // Событие для изменения cncFlag
    Emit.Emitter.addListener('cncFlagChange', this.cncFlagChange)

  }

  public defectBrowsePanelWorker(value: boolean) {
    this.setState({
        ...this.state,
        ...{isDefectBrowsePanel: value}
    });
  }

  private StageOnMouseMoveHandler(e) {
    const { source, selectedUnit, selectedLayer, layersSelected, cursorCoords, isDrawing } = this.state;
    if (this.state.cncFlag) {
      if (isDrawing) {
        if (selectedLayer !== -1 && source[selectedUnit].layers[selectedLayer].type === LayerType.WALLS) {
          if (AppState.State.selectedEl.orientation === Orientation.HORIZONTAL) {
            source[selectedUnit].layers[selectedLayer].walls!.push({
              key: 'wall_for_move',
              startX: cursorCoords.startX,
              startY: cursorCoords.startY,
              length: Math.abs(e.evt.clientX + 25) - Math.abs(cursorCoords.startX),
              orientation: AppState.State.selectedEl.orientation
            });
          } else {
            source[selectedUnit].layers[selectedLayer].walls!.push({
              key: 'wall_for_move',
              startX: cursorCoords.startX,
              startY: cursorCoords.startY,
              length: Math.abs(e.evt.clientY + 25) - Math.abs(cursorCoords.startY),
              orientation: AppState.State.selectedEl.orientation
            });
          }
        }
        this.setState({
          ...this.state,
          ...{isDrawing: true},
          ...{
            cursorCoords: {
              startX: this.state.cursorCoords.startX,
              startY: this.state.cursorCoords.startY,
              x: e.evt.clientX,
              y: e.evt.clientY,
            }
          }
        });
        this.setState({
          ...this.state,
          ...source,
        });
      }
    }
  }

  private StageOnMouseDownHandler(e) {
    if (this.state.cncFlag) {
      let selected: ElementItem = AppState.State.selectedEl;
      if (selected !== undefined) {
        this.setState({
          ...this.state,
          ...{isDrawing: true},
          ...{
            cursorCoords: {
              startX: e.evt.clientX,
              startY: e.evt.clientY,
              x: 0,
              y: 0,
            }
          }
        });
      }
    }
  }

  private StageOnMouseUpHandler(e) {
    const { source, selectedUnit, selectedLayer, layersSelected, cursorCoords } = this.state;

    if (this.state.cncFlag) {
      this.setState({
        ...this.state,
        ...{
          cncFlag: false,
          isDrawing: false,
        },
        ...{
          cursorCoords: {
            startX: this.state.cursorCoords.startX,
            startY: this.state.cursorCoords.startY,
            x: e.evt.clientX,
            y: e.evt.clientY,
          }
        }
      });
      console.log(this.state.cursorCoords);
      if (selectedLayer !== -1 && source[selectedUnit].layers[selectedLayer].type === LayerType.WALLS) {
          let count = 0;
          let badEls: WallItem[] = [];
          for (let k = 0; k < source[selectedUnit].layers[selectedLayer].walls!.length; k++) {
            if (source[selectedUnit].layers[selectedLayer].walls![k].key === 'wall_for_move') {
              badEls.push(source[selectedUnit].layers[selectedLayer].walls![k]);
              count++;
            }
          }

          for (let k = 0; k < badEls.length; k++) {
            let index = source[selectedUnit].layers[selectedLayer].walls!.indexOf(badEls[k]);
            source[selectedUnit].layers[selectedLayer].walls!.splice(index, 1);
          }

          if (AppState.State.selectedEl.orientation === Orientation.HORIZONTAL) {
            source[selectedUnit].layers[selectedLayer].walls!.push({
              startX: cursorCoords.startX,
              startY: cursorCoords.startY,
              length: Math.abs(cursorCoords.x) - Math.abs(cursorCoords.startX),
              orientation: AppState.State.selectedEl.orientation
            });

          } else {
            source[selectedUnit].layers[selectedLayer].walls!.push({
              startX: cursorCoords.startX,
              startY: cursorCoords.startY,
              length: Math.abs(cursorCoords.y) - Math.abs(cursorCoords.startY),
              orientation: AppState.State.selectedEl.orientation
            });
          }
          console.log(count);
          console.log(badEls);


      } else {
        alert('Выберите слой со стенами!');
      }
      console.log(this.state.source);
    }
  }

  public selectLayerToList(i) {
      const { source, layersSelected } = this.state;
      if (layersSelected.includes(i)) {
        let index = layersSelected.indexOf(i);
        layersSelected.splice(index, 1);
      } else {
          layersSelected.push(i);
      }
      if (source.length + 1 === layersSelected.length) {
        this.setState({
          ...this.state,
          ...{
            layersSelected,
            selectedLayer: -1,
          },
        });
      } else {
        this.setState({
          ...this.state,
          ...{
            layersSelected,
            selectedLayer: layersSelected.length === 0 ? -1 : i,
          },
        });
      }
  }

  // need
  public deleteWall() {
    alert('DELETING')
  }

  // cnc flag changing (need)
  public cncFlagChange() {
    this.setState({
      ...this.state,
      ...{ cncFlag: !this.state.cncFlag }
    });
  }

  public addElement(clientX: number, clientY: number) {
    const { source, selectedUnit, selectedLayer, cncFlag } = this.state;
    let selected: ElementItem = AppState.State.selectedEl;
    let stillageWorker = new StillageWorker();
    if (selected !== undefined) {
      if (selectedLayer !== -1) {
        if (selected.type === LayerType.STILLAGES) {
          if (source[selectedUnit].layers[selectedLayer].stillages === undefined) {
            source[selectedUnit].layers[selectedLayer].stillages = [];
          }
          source[selectedUnit].layers[selectedLayer].stillages!.push(
            stillageWorker.getStillageSourceItem({ x: clientX, y: clientY }, selected.stillageType!)
          );
        } else if (selected.type === LayerType.ABSTRACTS) {
          if (source[selectedUnit].layers[selectedLayer].objects === undefined) {
            source[selectedUnit].layers[selectedLayer].objects = [];
          }
          source[selectedUnit].layers[selectedLayer].objects!.push(
            {
              x: clientX,
              y: clientY,
              photo: selected.photo,
            }
          );

        } else if (selected.type === LayerType.WALLS) {
          alert('Чтобы отрисовать стену, кликните на элемент стены, зажмите левую кнопку мыши на карте и потяните.');
        }
      } else {
        alert('Выберите слой');
      }
      this.setState({ ...this.state, ...source, ...{ cncFlag: !this.state.cncFlag } });
    }
  }

  public stageOnClickHandler(e) {
    if (this.state.cncFlag) {
      this.addElement(e.clientX, e.clientY);
    }
  }


  // saving cur pos (need)
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
    this.addElement(e.clientX, e.clientY);
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
    const { source, selectedLayer, selectedUnit, layersSelected, isDefectBrowsePanel } = this.state;

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
        this.setState({ ...this.state, ...{ layersSelected, selectedLayer: -1 } })
      }}>
        Все слои
      </div>
    );
    for (let i = 0; i < source[selectedUnit].layers.length; i++) {
      layersTitles.push(
        <div style={{
          fontWeight: layersSelected.includes(i, 0) ? 'bold' : 'normal',
          color: layersSelected.includes(i, 0) ? '#2f00ff' : 'black'
        }} onClick={() => {
            this.selectLayerToList(i)
        }} key={"layerTitle_" + selectedUnit + "_" + i} className="layer-title">
          <input
            key={"layerTitle_checkbox_" + selectedUnit + "_" + i}
            onChange={() => { console.log(i) }}
            style={{ outline: 'none', marginRight: 5 }}
            checked={ layersSelected.includes(i, 0) }
            type={'checkbox'} />
          {source[selectedUnit].layers[i].title}</div>
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
        if (this.state.layersSelected.length !== 0) {
            layersSelected.forEach(el => {
                if (source[selectedUnit].layers[el] !== undefined) {
                  if (source[selectedUnit].layers[el].stillages !== undefined) {
                    for (let i = 0; i < source[selectedUnit].layers[el].stillages!.length; i++) {
                      stillages.push(
                        <Stillage key={"stillage_" + selectedUnit + "_" + el + "_" + i}
                          source={source[selectedUnit].layers[el].stillages![i]} />
                      );
                    }
                  }
                  if (source[selectedUnit].layers[el].walls !== undefined) {
                    for (let i = 0; i < source[selectedUnit].layers[el].walls!.length; i++) {
                      walls.push(
                        <Wall
                          key={"wall_" + selectedUnit + "_" + el + "_" + i}
                          source={source[selectedUnit].layers[el].walls![i]}
                        />
                      );
                    }
                  }
                  if (source[selectedUnit].layers[el].objects !== undefined) {
                    for (let i = 0; i < source[selectedUnit].layers[el].objects!.length; i++) {
                      walls.push(
                        <MapObject
                          key={"object_" + selectedUnit + "_" + el + "_" + i}
                          source={source[selectedUnit].layers[el].objects![i]}
                        />
                      );
                    }
                  }
                }
            });
        }

    }



    let main, blocks, filters, elements, elementsPanel, defectBrowsePanel;

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

    if (isDefectBrowsePanel) {
      defectBrowsePanel = <DefectBrowsePanel />;
    }

    let check = false;
    if (AppState.State.selectedEl !== undefined) {
      if (AppState.State.selectedEl.type !== undefined && AppState.State.selectedEl.type === LayerType.WALLS) {
        check = true;
      }
    }

    main = (<div className="map-wrapper"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}

    >

      <div className="stage-wrapper"
        // events
        onDrop={(e) => { this.ElementOnDrop(e) }}
        onClick={(e) => { this.stageOnClickHandler(e) }}
        onMouseMove={(e) => { this.MapWrapperOnMouseMove(e) }}
        //
        id={"stageWrapper"}
      >
        <Stage
          draggable={!this.state.isDrawing}

          onMouseMove={check ? (e) => { this.StageOnMouseMoveHandler(e) } : () => {  } }
          onMouseDown={check ? (e) => { this.StageOnMouseDownHandler(e) } : () => {  } }
          onMouseUp={check ? (e) => { this.StageOnMouseUpHandler(e) } : () => {  } }

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
      {defectBrowsePanel}
    </div>);

    // let components = [];

    return main;
  }
}

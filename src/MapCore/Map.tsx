import React from 'react';
import {Layer, Stage} from 'react-konva';

import IMapProps from './Models/Components/Map/IMapProps';
import IMapState from './Models/Components/Map/IMapState';
import Stillage from './Components/Stillage';
import LayerType from './Models/Enums/LayerType';
import Wall from './Components/Wall';
import AppState from './Data/AppState';
import Orientation from "./Models/Enums/Orientation";
import Emit from "./Data/Emit";
import ElementsPanel from "./Components/Page/Panels/ElementsPanel";
import ElementSource from "./Data/ElementsSource";
import StillageService from "./Services/StillageService";
import ElementItem from "./Models/ArrayItems/ElementItem";
import MapObject from "./Components/MapObject";
import WallItem from "./Models/ArrayItems/WallIem";
import DefectBrowsePanel from "./Components/Page/Panels/DefectBrowsePanel";
import MapSourceLayer from "./Models/MapSourceLayer";
import MapIconsType from "./Models/Enums/MapIconsType";

import './Css/Map.css';
import './Css/LayerPanel.css';
import WallService from "./Services/WallService";
import ObjectService from "./Services/ObjectService";
import LayerService from "./Services/LayerService";


export default class Map extends React.PureComponent<IMapProps, IMapState> {

  public stillageService!: StillageService;
  public objectService!: ObjectService;
  public layerService!: LayerService;
  public wallService!: WallService;

  constructor(props: IMapProps) {
    super(props);

    this.stillageService = new StillageService();
    this.objectService = new ObjectService();
    this.layerService = new LayerService();
    this.wallService = new WallService();



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
      isDefectBrowsePanel: false,
      layersSelected: [],
      isAddLayerModal: false,
      moveStageParams: {
        x: 0,
        y: 0,
      },
      upDownCoords: {
        up: {
          x: 0,
          y: 0,
        },
        down: {
          x: 0,
          y: 0,
        }
      },

      // resizing
      isIncreaseResizingLength: false,
      resizingWallIndex: 0,
      isStart: false,
      isWallResizingNow: false,
      selectedWallToResize: undefined,
      resizeCursorCoordinates: {
        startX: 0, startY: 0,
        actionEndX: 0, actionEndY: 0,
      }
    };

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
    this.addLayerModalWorker = this.addLayerModalWorker.bind(this);
    this.checkWallLayer = this.checkWallLayer.bind(this);
    this.stageDragEnd = this.stageDragEnd.bind(this);
    this.wallLabelButtonInteractionWayUp = this.wallLabelButtonInteractionWayUp.bind(this);
    this.wallLabelButtonInteractionWayDown = this.wallLabelButtonInteractionWayDown.bind(this);

    // Событие для удаления стены
    Emit.Emitter.addListener('deleteWall', this.deleteWall);
    // Событие для открытия/закрытия окна просмотра повреждений
    Emit.Emitter.addListener('defectBrowsePanelWorkerHandle', this.defectBrowsePanelWorker);
    // Событие для изменения cncFlag
    Emit.Emitter.addListener('cncFlagChange', this.cncFlagChange);
    // Событие для проверки слоя для отрисовки при нажтии на элемент в панели элемента
    Emit.Emitter.addListener('checkWallLayer', this.checkWallLayer);
    // Событие зажатия левой кноки или пальца для дорисовки стены с помощью ползунка
    Emit.Emitter.addListener('wallLabelButtonInteractionWayUp', this.wallLabelButtonInteractionWayUp);
    // Событие отпускания левой кноки или пальца для дорисовки стены с помощью ползунка
    Emit.Emitter.addListener('wallLabelButtonInteractionWayDown', this.wallLabelButtonInteractionWayDown);

  }

  // saving cur pos and wall resizing move rendering
  public MapWrapperOnMouseMove(e) {


    const { source, selectedUnit, layersSelected, selectedWallToResize, resizingWallIndex, isStart } = this.state;
    let { selectedLayer } = this.state;
    // move_resizing
    if (this.state.isWallResizingNow) {
      const clearLength = 25;

      Emit.Emitter.emit('wallMouseDbl', false);

      let _wall = source[selectedUnit].layers[selectedLayer].walls![resizingWallIndex];

      _wall = this.wallService.resizeWall(e, _wall, isStart, this.state.moveStageParams);

      source[selectedUnit].layers[selectedLayer].walls![resizingWallIndex] = _wall;

      this.setState({source});

    }
    if (this.state.isDrawing) {
      this.setState({
        cursorCoords: {
          startX: this.state.cursorCoords.startX,
          startY: this.state.cursorCoords.startY,
          x: e.clientX,
          y: e.clientY,
        }
      });
    }
  }

  // Событие отпускания левой кноки или пальца для дорисовки стены с помощью ползунка
  private wallLabelButtonInteractionWayUp(e) {
    const { source, isStart, selectedUnit, layersSelected, isWallResizingNow, selectedWallToResize } = this.state;
    let { selectedLayer } = this.state;
    let count = 0;
    let badEls: WallItem[] = [];
    if (isWallResizingNow && selectedWallToResize) {
      let layerFlag = this.layerService.getLayerIndex(layersSelected, source[selectedUnit].layers, LayerType.WALLS);
      if (!layerFlag.selected.is) {
        layersSelected.push(layerFlag.created.index);
        selectedLayer = layerFlag.created.index;
      }
      let found = this.wallService.getWallIndexByID(source[selectedUnit].layers[selectedLayer].walls!, selectedWallToResize.id);
      let _wall: WallItem = found.item;
      _wall = this.wallService.resizeWall(e, _wall, isStart, this.state.moveStageParams);
      source[selectedUnit].layers[selectedLayer].walls![found.index] = _wall;

      source[selectedUnit].layers[selectedLayer].walls = this.layerService.deleteBadWalls(
          source[selectedUnit].layers[selectedLayer].walls!
      );

      this.setState({resizingWallIndex: found.index, source, isWallResizingNow: false, isDrawing: false, layersSelected: layersSelected, selectedLayer: selectedLayer});
      Emit.Emitter.emit('wallMouseDbl', false);
    }
  }

  // Событие зажатия левой кноки или пальца для дорисовки стены с помощью ползунка
  private wallLabelButtonInteractionWayDown(e, wallSource: WallItem, isStart: boolean) {
    Emit.Emitter.emit('wallMouseDbl', false);
    const { source, layersSelected, selectedUnit } = this.state; let selectedLayer = -1;
    let layerFlag = this.layerService.getLayerIndex(layersSelected, source[selectedUnit].layers, LayerType.WALLS);
    if (!layerFlag.selected.is) {
      layersSelected.push(layerFlag.created.index);
    }
    selectedLayer = layerFlag.created.index;
    this.setState({layersSelected, selectedLayer});
    console.error(selectedLayer);
    let found = this.wallService.getWallIndexByID(source[selectedUnit].layers[selectedLayer].walls!, wallSource.id);
    this.setState({resizingWallIndex: found.index, isStart, selectedWallToResize: wallSource, isWallResizingNow: true, isDrawing: true});
  }



  private stageDragEnd(x: number, y: number) {
    console.log(this.state.source);
    this.setState({
      moveStageParams: {
        x: x,
        y: y,
      },
    });
  }

  private addLayerModalWorker(modalMode: boolean) {
    console.log(modalMode);
    this.setState({ isAddLayerModal: modalMode });
  }

  public defectBrowsePanelWorker(value: boolean) {
    console.log(value);
    this.setState({
        isDefectBrowsePanel: value
    });
  }

  private checkWallLayer() {
    const { source, selectedUnit, layersSelected } = this.state;

    let index = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
    let _source = source[selectedUnit];

    if (index === -1) {
      _source.layers.push(
          this.layerService.getLayerSourceItem(source[selectedUnit], LayerType.WALLS)
      );
    }

    index = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
    layersSelected.push(index);
    this.setState({layersSelected, selectedLayer: index});
  }

  private StageOnMouseMoveHandler(e) {
    const { source, selectedUnit, selectedLayer, isDrawing } = this.state;
    const clearLength = 25;

    if (this.state.cncFlag) {
      if (isDrawing) {
        if (selectedLayer !== -1 && source[selectedUnit].layers[selectedLayer].type === LayerType.WALLS) {
          if (AppState.State.selectedEl.orientation === Orientation.HORIZONTAL) {
            source[selectedUnit].layers[selectedLayer].walls!.push(
                this.wallService.getWallSourceItem(
                    source[selectedUnit].layers[selectedLayer],
                    (e.evt.clientX - this.state.moveStageParams.x),
                    (this.state.cursorCoords.startY - this.state.moveStageParams.y),
                    clearLength,
                    AppState.State.selectedEl.orientation
                )
            );
          } else {
            source[selectedUnit].layers[selectedLayer].walls!.push(
                this.wallService.getWallSourceItem(
                    source[selectedUnit].layers[selectedLayer],
                    (this.state.cursorCoords.startX - this.state.moveStageParams.x),
                    (e.evt.clientY - this.state.moveStageParams.y),
                    clearLength,
                    AppState.State.selectedEl.orientation
                )
            );
          }
        }
      }
    }
  }

  private StageOnMouseDownHandler(e) {
    if (this.state.cncFlag) {
      let selected: ElementItem = AppState.State.selectedEl;
      if (selected !== undefined) {
        this.setState({
          isDrawing: true,
            cursorCoords: {
              startX: e.evt.clientX,
              startY: e.evt.clientY,
              x: 0,
              y: 0,
            },
          upDownCoords: {
            up: this.state.upDownCoords.up,
            down: {
              x: e.evt.clientX,
              y: e.evt.clientY,
            },
          }
        });
      }
    }
  }

  private StageOnMouseUpHandler(e) {
    if (this.state.isWallResizingNow) {
      this.setState({isWallResizingNow: false, isDrawing: false})
    }
    if (this.state.cncFlag) {
      this.setState({
          cncFlag: false,
          isDrawing: false,
          cursorCoords: {
            startX: this.state.cursorCoords.startX,
            startY: this.state.cursorCoords.startY,
            x: e.evt.clientX,
            y: e.evt.clientY,
          },
          upDownCoords: {
            up: {
              x: e.evt.clientX,
              y: e.evt.clientY,
            },
            down: this.state.upDownCoords.down,
          }
      });
      const { source, selectedUnit, selectedLayer } = this.state;
      if (selectedLayer !== -1 && source[selectedUnit].layers[selectedLayer].type === LayerType.WALLS) {
          let count = 0;
          let badEls: WallItem[] = [];
          let wall;
          if (source[selectedUnit].layers[selectedLayer].walls !== undefined) {
            const _length = source[selectedUnit].layers[selectedLayer].walls!.length;
            wall = source[selectedUnit].layers[selectedLayer].walls![_length - 1];
            wall = this.wallService.getWallSourceItem(
                source[selectedUnit].layers[selectedLayer],
                wall.startX,
                wall.startY,
                wall.length,
                wall.orientation,
            );
            wall.key = source[selectedUnit].layers[selectedLayer].key + '_wall_' + wall.id;
          }


          wall.id = this.wallService.getMaxID(source[selectedUnit].layers[selectedLayer].walls!);
          wall.key = source[selectedUnit].layers[selectedLayer].key + '_wall_' + wall.id;
          source[selectedUnit].layers[selectedLayer].walls![source[selectedUnit].layers[selectedLayer].walls!.length - 1] = wall;
          source[selectedUnit].layers[selectedLayer].walls = this.layerService.deleteBadWalls(
              source[selectedUnit].layers[selectedLayer].walls!
          );
          // простановка новой длины отрисовывающейся стены, потому что маленькие стены равны по 25

          let _walls = source[selectedUnit].layers[selectedLayer].walls;
          _walls![_walls!.length - 1] = this.wallService.setSourceWallParams(
              _walls![_walls!.length - 1],
              this.state.cursorCoords,
              this.state.upDownCoords,
              this.state.moveStageParams
          );

          // костыльное обновление state
          /* Без этого не работает */
          const _layers = this.state.layersSelected;
          this.setState({
            layersSelected: []
          });
          this.setState({
            layersSelected: _layers
          });
          /* _____________________ */
          console.log(this.state.source);
      }
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
            layersSelected,
            selectedLayer: -1,
        });
      } else {
        this.setState({
            layersSelected,
            selectedLayer: layersSelected.length === 0 ? -1 : i,
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
      cncFlag: !this.state.cncFlag
    });
  }



  public addElement(clientX: number, clientY: number) {
    const { source, selectedUnit, selectedLayer, layersSelected, cncFlag } = this.state;
    let selected: ElementItem = AppState.State.selectedEl;


    if (selected !== undefined) {
      let _layerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, selected.type!);
      let layer: MapSourceLayer;
      if (_layerIndex === -1) {
        source[selectedUnit].layers.push(
            this.layerService.getLayerSourceItem(source[selectedUnit], selected.type!)
        );
        _layerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, selected.type!);
      }

      layer = source[selectedUnit].layers[_layerIndex];

      if (layer.mapIconsType === MapIconsType.DRAWING) {
        if (layer.type === LayerType.STILLAGES) {
          if (layer.stillages === undefined) {
            source[selectedUnit].layers[selectedLayer].stillages = [];
          }
          layer.stillages!.push(
              this.stillageService.getStillageSourceItem(
                  source[selectedUnit].layers[_layerIndex],
                  { x: (clientX - this.state.moveStageParams.x), y: (clientY - this.state.moveStageParams.y) },
                  selected.stillageType!
              )
          );
        }
      } else {
        if (layer.type === LayerType.LIGHTING) {
          layer.objects!.push(
              this.objectService.getObjectSourceItem(
                  source[selectedUnit].layers[_layerIndex],
                  {x: (clientX - this.state.moveStageParams.x), y: (clientY - this.state.moveStageParams.y)},
                  selected.photo
              )
          );
        }
      }
      source[selectedUnit].layers[_layerIndex] = layer;
      layersSelected.push(_layerIndex);
      this.forceUpdate(() => this.setState({ source, selectedLayer: _layerIndex }));
    }
  }

  public stageOnClickHandler(e) {
    if (this.state.cncFlag) {
      let selected: ElementItem = AppState.State.selectedEl;
      if (selected != undefined) {

      } else {
        this.addElement(e.clientX, e.clientY);
      }
    }
  }

  public ElementOnDrop(e) {
    this.addElement(e.clientX, e.clientY);
  };

  public filtersOnChangeAction(checkName) {

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
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    });
  };




  render() {
    const { source, selectedLayer, selectedUnit, layersSelected, isDefectBrowsePanel, isWallResizingNow } = this.state;

    let unitsTitles: Array<JSX.Element> = [];
    let layersTitles: Array<JSX.Element> = [];
    let objects: Array<JSX.Element> = [];
    let stillages: Array<JSX.Element> = [];
    let signatures: Array<JSX.Element> = [];
    let layers: Array<JSX.Element> = [];
    let walls: Array<JSX.Element> = [];



    let height = window.innerHeight;

    // вывод списка блоков
    for (let i = 0; i < source.length; i++) {
      unitsTitles.push(
        <div
            key={source[i].key + '_unitNameDiv_' + i}
            onClick={() => {
              this.setState({ ...this.state, ...{ selectedUnit: i, selectedLayer: -1, layersSelected: [] } });
            }} className="unit-title">
          <span
            key={source[i].key + '_unitNameDivSpan_' + i}
            style={{
              fontWeight: selectedUnit === i ? 'bold' : 'normal',
              color: selectedUnit === i ? '#2f00ff' : 'black'
          }}>{source[i].title}</span>
        </div>
      );
    }
    layersTitles = [];
    /* добавления слоя для отображения всех слоев */
    layersTitles.push(
      <div key={source[selectedUnit].key + '_layerNameDiv_-1'} style={{
        fontWeight: selectedLayer === -1 ? 'bold' : 'normal',
        color: selectedLayer === -1 ? '#2f00ff' : 'black'
      }} className="layer-title" onClick={() => {
        this.setState({ layersSelected, selectedLayer: -1 })
      }}>
        все слои
      </div>
    );
    /* добавление заголовков слоев */
    for (let i = 0; i < source[selectedUnit].layers.length; i++) {
      layersTitles.push(
        <div key={source[selectedUnit].layers[i].key + '_layerNameDiv_' + i} style={{
          fontWeight: layersSelected.includes(i, 0) ? 'bold' : 'normal',
          color: layersSelected.includes(i, 0) ? '#2f00ff' : 'black'
        }} onClick={() => {
            this.selectLayerToList(i);
        }} className="layer-title">
          <input
            key={source[selectedUnit].layers[i].key + '_layerNameDivInput_' + i}
            onChange={() => { console.log(i) }}
            style={{ outline: 'none', marginRight: 5 }}
            checked={ layersSelected.includes(i, 0) }
            type={'checkbox'} />
          {source[selectedUnit].layers[i].title}</div>
      );
    }

    console.log('------------------------SHAPES RENDERING------------------------');
    if (selectedLayer === -1) {
      let layerNum = 0;
      source[selectedUnit].layers.forEach(element => {
        if (element.objects !== undefined) {
          for (let i = 0; i < element.objects!.length; i++) {
            objects.push(
              <MapObject
                  key={element.objects[i].key}
                  source={element.objects![i]}
              />
            );
          }
        }
        if (element.stillages !== undefined) {
          for (let i = 0; i < element.stillages!.length; i++) {
            stillages.push(
              <Stillage
                  key={element.stillages[i].key}
                  source={element.stillages![i]}
              />
            );
          }
        }
        if (element.walls !== undefined) {
          for (let i = 0; i < element.walls!.length; i++) {
            walls.push(
              <Wall
                key={element.walls[i].key}
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
                        <Stillage
                            key={source[selectedUnit].layers[el].stillages![i].key}
                            source={source[selectedUnit].layers[el].stillages![i]}
                        />
                      );
                    }
                  }
                  if (source[selectedUnit].layers[el].walls !== undefined) {
                    for (let i = 0; i < source[selectedUnit].layers[el].walls!.length; i++) {
                      let element = source[selectedUnit].layers[el].walls![i];
                      walls.push(
                        <Wall
                          key={element.key}
                          source={source[selectedUnit].layers[el].walls![i]}
                        />
                      );
                    }
                  }
                  if (source[selectedUnit].layers[el].objects !== undefined) {
                    for (let i = 0; i < source[selectedUnit].layers[el].objects!.length; i++) {
                      walls.push(
                        <MapObject
                          key={source[selectedUnit].layers[el].objects![i].key}
                          source={source[selectedUnit].layers[el].objects![i]}
                        />
                      );
                    }
                  }
                }
            });
        }

    }



    let main, blocks, filters, elementsPanel, defectBrowsePanel, addLayerSubModal;

    blocks = (
      <div style={{ background: '#E0E0E0' }} className="units-selector">
        <div style={{ background: '' }} className="unit-header-title">
          <span style={{ height: '50%' }}>выбор блока</span>
        </div>
        <div style={{ background: '' }} className="unit-content">
          {unitsTitles}
        </div>
      </div>
    );
    filters = (
      <div className="filters-selector" style={{ background: '#E0E0E0' }}>
        <div style={{ background: '' }} className="filter-header-title">
          <span style={{ height: '50%' }}>фильтры</span>
        </div>
        <div style={{ background: '' }} className="filter-content">
          <div className="input-checkbox">
            <div style={{}}><input onChange={() => this.filtersOnChangeAction('onlyRed')} style={{ height: '50%' }} type="checkbox" name="option2" value="a2" /></div>
            <div style={{ height: '100%', fontSize: '0.9vw', paddingLeft: '2%', display: 'flex' }}>
              только опасные
            </div>
          </div>
          <div className="input-checkbox">
            <div style={{}}><input onChange={() => this.filtersOnChangeAction('onlyRed')} style={{ height: '50%' }} type="checkbox" name="option2" value="a2" /></div>
            <div style={{ height: '100%', fontSize: '0.9vw', paddingLeft: '2%', display: 'flex' }}>
              убрать повреждения
            </div>
          </div>
        </div>
      </div>
    );

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

    /* очистка списка стен от дублей с одинаковыми key */
    let keys: string[] = [];
    walls.forEach((el) => {
      if (keys.indexOf(el.key!.toString()) === -1) {
        keys.push(el.key!.toString());
      }
    });
    walls = walls.filter((item, index) => {
      return index === keys.indexOf(item.key!.toString());
    });


    main = (<div className="map-wrapper"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}

    >

      <div className="stage-wrapper"
        onDrop={(e) => { this.ElementOnDrop(e) }}
        onClick={(e) => { this.stageOnClickHandler(e) }}
        onMouseMove={(e) => { this.MapWrapperOnMouseMove(e) }}
        onTouchMove={(e) => { this.MapWrapperOnMouseMove(e) }}
           onMouseUp={(e) => { this.wallLabelButtonInteractionWayUp(e) }}
        id={"stageWrapper"}
      >
        <Stage
          draggable={!this.state.isDrawing}

          onTouchMove={check ? (e) => { this.StageOnMouseMoveHandler(e) } : () => {  } }
          onTouchStart={check ? (e) => { this.StageOnMouseDownHandler(e) } : () => {  } }
          onTouchEnd={check ? (e) => { this.StageOnMouseUpHandler(e) } : () => {  } }

          onDragEnd={e => {this.stageDragEnd(e.target.x(), e.target.y())}}

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
    return [main];
  }
}

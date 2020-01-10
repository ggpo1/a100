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
import Vectors from "./Models/Enums/Vectors";
import {prependListener} from "cluster";


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
      isShapeMoveEnable: false,
      isShapeMovingNow: false,
      selectedShapeForMove: {},

      isWallUnderChild: false,
      wallLayerIndex: -1,
      wallIndex: -1,
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
    this.stageDragEnd = this.stageDragEnd.bind(this);
    this.wallLabelButtonInteractionWayUp = this.wallLabelButtonInteractionWayUp.bind(this);
    this.wallLabelButtonInteractionWayDown = this.wallLabelButtonInteractionWayDown.bind(this);
    this.setIsShapeMoveEnable = this.setIsShapeMoveEnable.bind(this);
    this.moveShapeByStep = this.moveShapeByStep.bind(this);
    this.setIsShapeMovingNow = this.setIsShapeMovingNow.bind(this);
    this.mapShapeClick = this.mapShapeClick.bind(this);

    // Событие для удаления стены
    Emit.Emitter.addListener('deleteWall', this.deleteWall);
    // Событие для открытия/закрытия окна просмотра повреждений
    Emit.Emitter.addListener('defectBrowsePanelWorkerHandle', this.defectBrowsePanelWorker);
    // Событие для изменения cncFlag
    Emit.Emitter.addListener('cncFlagChange', this.cncFlagChange);
    // Событие зажатия левой кноки или пальца для дорисовки стены с помощью ползунка
    Emit.Emitter.addListener('wallLabelButtonInteractionWayUp', this.wallLabelButtonInteractionWayUp);
    // Событие отпускания левой кноки или пальца для дорисовки стены с помощью ползунка
    Emit.Emitter.addListener('wallLabelButtonInteractionWayDown', this.wallLabelButtonInteractionWayDown);
    //
    Emit.Emitter.addListener('setIsShapeMoving', this.setIsShapeMoveEnable);
    //
    Emit.Emitter.addListener('moveShapeByStep', this.moveShapeByStep);
    //
    Emit.Emitter.addListener('setIsShapeMovingNow', this.setIsShapeMovingNow);
    //
    Emit.Emitter.addListener('mapShapeClickEmit', this.mapShapeClick)
  }

  public mapShapeClick(which: number, e: any, id: number, shapeType: LayerType) {

    console.error(which, e, id, shapeType);
  }

  // перемещение фигур с помощью стрелочек
  public moveShapeByStep(shapeSource, type: LayerType, vector: Vectors) {
    const { source, selectedUnit, selectedLayer } = this.state;
    const step = 1;
    if (type === LayerType.STILLAGES) {
      let stillageLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.STILLAGES);
      let searchedObj = this.stillageService.stillageSearchByID(source[selectedUnit].layers[stillageLayerIndex].stillages!, shapeSource.id);
      let stillage = source[selectedUnit].layers[stillageLayerIndex].stillages![searchedObj.index];
      if (vector === Vectors.TOP) {
        stillage.y -= step;
      } else if (vector === Vectors.BOTTOM) {
        stillage.y += step;
      } else if (vector === Vectors.LEFT) {
        stillage.x -= step;
      } else if (vector === Vectors.RIGHT) {
        stillage.x += step;
      }
      source[selectedUnit].layers[stillageLayerIndex].stillages![searchedObj.index] = stillage;

      Emit.Emitter.emit('stillageSignatureForceUpdate', stillage.key, stillage.x, stillage.y);
      Emit.Emitter.emit('placeSignaturesForceUpdate', stillage.key, stillage.x, stillage.y);
      Emit.Emitter.emit('defectsForceUpdate', stillage.key, stillage.x, stillage.y);

      this.forceUpdate(() => this.setState({source}));
    }

  }

  public setIsShapeMoveEnable(value) {
    this.setState({isShapeMoveEnable: value});
  }

  public setIsShapeMovingNow(value, shape) {
    if (shape !== undefined) {
      this.setState({isShapeMovingNow: value, selectedShapeForMove: shape});
    } else {
      this.setState({isShapeMovingNow: value});
    }
  }

  // saving cur pos and wall resizing move rendering
  public MapWrapperOnMouseMove(e) {
    const { source, selectedUnit, layersSelected, selectedWallToResize, wallLayerIndex, resizingWallIndex, isStart } = this.state;
    let { selectedLayer } = this.state;
    // перемещение фигуры
    if (this.state.isShapeMovingNow) {
      if (this.state.selectedShapeForMove !== undefined) {
        if (this.state.selectedShapeForMove!.type === LayerType.STILLAGES) {
          let stillageLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.STILLAGES);
          let searchedObj = this.stillageService.stillageSearchByID(source[selectedUnit].layers[stillageLayerIndex].stillages!, this.state.selectedShapeForMove.shape.id);
          let stillage = source[selectedUnit].layers[stillageLayerIndex].stillages![searchedObj.index];
          // TODO: add scaling
          stillage.x = e.clientX - this.state.moveStageParams.x;
          stillage.y = e.clientY - this.state.moveStageParams.y;
          source[selectedUnit].layers[stillageLayerIndex].stillages![searchedObj.index] = stillage;
          Emit.Emitter.emit('stillageSignatureForceUpdate', stillage.key, stillage.x, stillage.y);
          Emit.Emitter.emit('placeSignaturesForceUpdate', stillage.key, stillage.x, stillage.y);
          Emit.Emitter.emit('defectsForceUpdate', stillage.key, stillage.x, stillage.y);
          this.forceUpdate(() => this.setState({source}));
        } else if (this.state.selectedShapeForMove!.type === LayerType.LIGHTING) {
          let lightingLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.LIGHTING);
          let searchedObj = this.objectService.searchByID(source[selectedUnit].layers[lightingLayerIndex].objects!, this.state.selectedShapeForMove.shape.id);
          let light = source[selectedUnit].layers[lightingLayerIndex].objects![searchedObj.index];
          // TODO: add scaling
          light.x = e.clientX - this.state.moveStageParams.x;
          light.y = e.clientY - this.state.moveStageParams.y;
          source[selectedUnit].layers[lightingLayerIndex].objects![searchedObj.index] = light;
          this.forceUpdate(() => this.setState({source}))
        } else if (this.state.selectedShapeForMove!.type === LayerType.WALLS) {
          let wallsLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
          let searchedObj = this.wallService.getWallIndexByID(source[selectedUnit].layers[wallsLayerIndex].walls!, this.state.selectedShapeForMove.shape.id);
          let wall = source[selectedUnit].layers[wallsLayerIndex].walls![searchedObj.index];
          // TODO: add scaling
          wall.startX = e.clientX - this.state.moveStageParams.x;
          wall.startY = e.clientY - this.state.moveStageParams.y;
          source[selectedUnit].layers[wallsLayerIndex].walls![searchedObj.index] = wall;
          this.forceUpdate(() => this.setState({source}));
        }
      }
    }


    // move_resizing
    if (this.state.isWallResizingNow) {

      Emit.Emitter.emit('wallMouseDbl', false);

      let _wall = source[selectedUnit].layers[wallLayerIndex].walls![resizingWallIndex];

      _wall = this.wallService.resizeWall(e, _wall, isStart, this.state.moveStageParams);

      source[selectedUnit].layers[wallLayerIndex].walls![resizingWallIndex] = _wall;

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
  // PAGE MOUSE UP
  private wallLabelButtonInteractionWayUp(e) {
    const { source, isStart, selectedUnit, layersSelected, isWallResizingNow, selectedWallToResize, wallLayerIndex } = this.state;
    let { selectedLayer } = this.state;
    this.setState({isShapeMovingNow: false});
    if (isWallResizingNow && selectedWallToResize) {
      let found = this.wallService.getWallIndexByID(source[selectedUnit].layers[wallLayerIndex].walls!, selectedWallToResize.id);
      let _wall: WallItem = found.item;
      _wall = this.wallService.resizeWall(e, _wall, isStart, this.state.moveStageParams);
      source[selectedUnit].layers[wallLayerIndex].walls![found.index] = _wall;

      source[selectedUnit].layers[wallLayerIndex].walls = this.layerService.deleteBadWalls(
          source[selectedUnit].layers[wallLayerIndex].walls!
      );

      this.setState({resizingWallIndex: found.index, source, isWallResizingNow: false, isDrawing: false, layersSelected: layersSelected});
      Emit.Emitter.emit('wallMouseDbl', false);
    }
  }

  // Событие зажатия левой кноки или пальца для дорисовки стены с помощью ползунка
  private wallLabelButtonInteractionWayDown(e, wallSource: WallItem, isStart: boolean) {
    Emit.Emitter.emit('wallMouseDbl', false);
    const { source, layersSelected, selectedUnit } = this.state; let selectedLayer = -1;
    let layerFlag = this.layerService.getLayerIndex(layersSelected, source[selectedUnit].layers, LayerType.WALLS);


    let _index = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
    let _source = source[selectedUnit];

    if (_index === -1) {
      _source.layers.push(
          this.layerService.getLayerSourceItem(source[selectedUnit], LayerType.WALLS)
      );
    }

    _index = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
    if (selectedLayer === -1) {
      this.setState({ wallLayerIndex: _index, selectedLayer: -1 });
    } else {
      layersSelected.push(_index);
      this.setState({layersSelected, selectedLayer: _index, wallLayerIndex: _index});
    }

    // if (!layerFlag.selected.is) {
    //   layersSelected.push(layerFlag.created.index);
    // }
    // selectedLayer = layerFlag.created.index;
    // this.setState({layersSelected, selectedLayer});
    // console.error(selectedLayer);
    let found = this.wallService.getWallIndexByID(source[selectedUnit].layers[_index].walls!, wallSource.id);
    this.setState({resizingWallIndex: found.index, isStart, selectedWallToResize: wallSource, isWallResizingNow: true, isDrawing: true});
  }



  private stageDragEnd(x: number, y: number) {
    this.setState({
      moveStageParams: {
        x: x,
        y: y,
      },
    });
  }

  private addLayerModalWorker(modalMode: boolean) {
    this.setState({ isAddLayerModal: modalMode });
  }

  public defectBrowsePanelWorker(value: boolean) {
    this.setState({
        isDefectBrowsePanel: value
    });
  }


  private StageOnMouseMoveHandler(e) {
    const { source, selectedUnit, selectedLayer, isDrawing, wallIndex, moveStageParams, cursorCoords, wallLayerIndex } = this.state;

    if (this.state.cncFlag) {
      if (isDrawing) {
        let _wall = source[selectedUnit].layers[wallLayerIndex].walls![wallIndex];
        if (_wall.orientation === Orientation.HORIZONTAL) {
          if (_wall.startX < (e.evt.clientX - moveStageParams.x)) {
            let _length = Math.abs(_wall.startX - (e.evt.clientX - moveStageParams.x));
            _wall.length += _length - _wall.length;
          } else if (_wall.startX > (e.evt.clientX - moveStageParams.x)) {
            _wall.startX = (e.evt.clientX - moveStageParams.x);
            _wall.length = Math.abs(_wall.startX - cursorCoords.startX);
          }
        } else {
          if (_wall.startY < (e.evt.clientY - moveStageParams.y)) {
            let _length = Math.abs(_wall.startY - (e.evt.clientY - moveStageParams.y));
            _wall.length += _length - _wall.length;
          } else if (_wall.startY > (e.evt.clientY - moveStageParams.y)) {
            _wall.startY = (e.evt.clientY - moveStageParams.y);
            _wall.length = Math.abs(_wall.startY - cursorCoords.startY);
          }
        }
      }
    }
  }

  private StageOnMouseDownHandler(e) {
    const { source, selectedUnit, selectedLayer, layersSelected } = this.state;
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
        // wall layer checking
        let index = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
        let _source = source[selectedUnit];

        if (index === -1) {
          _source.layers.push(
              this.layerService.getLayerSourceItem(source[selectedUnit], LayerType.WALLS)
          );
        }

        index = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
        if (selectedLayer === -1) {
          this.setState({ wallLayerIndex: index, selectedLayer: -1 });
        } else {
          layersSelected.push(index);
          this.setState({layersSelected, selectedLayer: index, wallLayerIndex: index});
        }

        let clientX = e.evt.clientX - this.state.moveStageParams.x;
        let clientY = e.evt.clientY - this.state.moveStageParams.y;

        if (this.layerService.hasUnderChild(source[selectedUnit].layers!, selected.type!, clientX, clientY, selected)) return;
        // addWall
        // adding new wall for resizing in the future moving

        if (source[selectedUnit].layers[index].type === LayerType.WALLS) {

            source[selectedUnit].layers[index].walls!.push(
                this.wallService.getWallSourceItem(
                    source[selectedUnit].layers[index],
                    clientX,
                    clientY,
                    25,
                    AppState.State.selectedEl.orientation
                )
            );

          let walls = source[selectedUnit].layers[index].walls!;
          let wallIndex = this.wallService.getWallIndexByID(walls, walls[walls.length - 1].id).index;
          source[selectedUnit].layers[index].walls = walls;
          this.setState({wallIndex, source});
        }
      }
    }
  }

  private StageOnMouseUpHandler(e) {
    if (this.state.isWallResizingNow) {
      this.setState({isWallResizingNow: false, isDrawing: false})
    }
    if (this.state.cncFlag) {
      this.setState({
          // cncFlag: false,
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
    alert('DELETING');
  }

  // cnc flag changing (need)
  public cncFlagChange() {
    if (this.state.cncFlag) {
      Emit.Emitter.emit('borderCleanAction');
    }
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
          if (this.layerService.hasUnderChild(source[selectedUnit].layers!, selected.type!, (clientX - this.state.moveStageParams.x), (clientY - this.state.moveStageParams.y), selected)) return;
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
      if (selectedLayer !== -1) {
        layersSelected.push(_layerIndex);
        source[selectedUnit].layers[_layerIndex] = layer;
        this.forceUpdate(() => this.setState({ source, selectedLayer: _layerIndex }));
      } else {
        source[selectedUnit].layers[_layerIndex] = layer;
        this.forceUpdate(() => this.setState({ source, selectedLayer: -1 }));
      }



    }
  }

  public stageOnClickHandler(e) {
    // cnc element adding
    if (this.state.cncFlag) {
      let selected: ElementItem = AppState.State.selectedEl;
      if (selected !== undefined) {
        this.addElement(e.clientX, e.clientY);
        // Emit.Emitter.emit('borderCleanAction');
        // this.setState({cncFlag: false});
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
          draggable={!this.state.isDrawing && !this.state.isShapeMovingNow}

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

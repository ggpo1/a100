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
import Text from "./Components/Text";
import WallItem from "./Models/ArrayItems/WallIem";
import DefectBrowsePanel from "./Components/Page/Panels/DefectBrowsePanel";
import MapSourceLayer from "./Models/MapSourceLayer";
import MapIconsType from "./Models/Enums/MapIconsType";
import sort from 'fast-sort';

import './Css/Map.css';
import './Css/LayerPanel.css';
import WallService from "./Services/WallService";
import ObjectService from "./Services/ObjectService";
import LayerService from "./Services/LayerService";
import Vectors from "./Models/Enums/Vectors";
import StillageItem from "./Models/ArrayItems/StillageItem";
import Position from "./Models/Enums/Position";
import StillageSize from "./Models/Enums/StillageSize/StillageSize";
import MapSource from "../A100/data/MapSource";
import VikItem from "./Models/ArrayItems/VikItem";
import LogType from "../A100/model/enums/LogType";
import LogHandler from "../LogHandler/LogHandler";

export default class Map extends React.PureComponent<IMapProps, IMapState> {

  public stillageService!: StillageService;
  public objectService!: ObjectService;
  public layerService!: LayerService;
  public wallService!: WallService;

  public animates: Array<any> = [];

  constructor(props: IMapProps) {
    super(props);

    this.stillageService = new StillageService();
    this.objectService = new ObjectService();
    this.layerService = new LayerService();
    this.wallService = new WallService();



    this.state = {
      dragNum: 0,
      stageScales: {
        x: 1,
        y: 1
      },
      lazyLoading: true,
      parentKey: this.props.parentKey,

      isAddCircleAdding: false,
      isToggledToAdd: false,
      lastAddedItemType: undefined,
      lastAddedItem: undefined,
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
    this.deleteShape = this.deleteShape.bind(this);
    this.setAddCirclesVisibility = this.setAddCirclesVisibility.bind(this);
    this.addSameShape = this.addSameShape.bind(this);
    this.mapSetState = this.mapSetState.bind(this);

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
    // События для переключения флага
    Emit.Emitter.addListener('setIsShapeMoving', this.setIsShapeMoveEnable);
    // Событие передвижения фигуры с шагом
    Emit.Emitter.addListener('moveShapeByStep', this.moveShapeByStep);
    //
    Emit.Emitter.addListener('setIsShapeMovingNow', this.setIsShapeMovingNow);
    // Событие для проверки, что было кликнуто
    Emit.Emitter.addListener('mapShapeClickEmit', this.mapShapeClick);
    // Событие удаления фигуры из state
    Emit.Emitter.addListener('deleteShapeFromLayer', this.deleteShape);
    // Событие управления кнопками добавления иден тичных фигур
    Emit.Emitter.addListener('setAddCirclesVisibility', this.setAddCirclesVisibility);
    // Событие для добаления идентичной фигуры при нажатии на кнопку плюса
    Emit.Emitter.addListener('addSameShape', this.addSameShape);
    //
    Emit.Emitter.addListener('mapSetState', this.mapSetState);

    Emit.Emitter.addListener('setSelectedVik', (vik: VikItem, stillage: StillageItem) => this.setState({ selectedVik: vik, selectedStillage: stillage }));

    Emit.Emitter.addListener('setSelectedUnit', this.setMapUnit);
  }

  public animationIDs: Array<string> = ['units-block', 'filters-block', 'elements-panel', 'layers-block'];

  componentDidMount(): void {
    const {lazyLoading} = this.state;
    try {
      // if (lazyLoading) {
      //   this.animationIDs.forEach(el => {
      //     this.animates.push(document.getElementById(el)!.animate([
      //       {opacity: '0.8'},
      //       {opacity: '0.4'},
      //       {opacity: '0.8'}
      //     ], {
      //       duration: 2000,
      //       iterations: Infinity
      //     }));
      //   });
      // }
    } catch (e) {
      LogHandler.handle('Map', LogType.ERROR, 'lazy loading error!');
    }
  }

  componentDidUpdate(prevProps: Readonly<IMapProps>, prevState: Readonly<IMapState>, snapshot?: any): void {
    document.getElementById('units-block')!.style.opacity = '0.8';
  }

  public addSameShape(type: LayerType, prevShape: any, position: Position) {
    this.setState({ isAddCircleAdding: true });
    const { source, selectedUnit } = this.state;
    let toMin = position === Position.TOP || position === Position.LEFT;
    let layerIndex;
    if (type !== undefined && prevShape !== undefined) {
      if (type === LayerType.STILLAGES) {
        layerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, type);
        let prevStillage: StillageItem = prevShape;
        let nextStillage: StillageItem;
        let _layer = source[selectedUnit].layers[layerIndex];
        let _id = 0; let _key = '';
        sort(_layer.stillages!).asc(e => e.id);
        if (_layer.stillages!.length !== 0) {
          _id = _layer.stillages![_layer.stillages!.length - 1].id;
        }
        _id++;
        _key = _layer.key + '_stillage_' + _id.toString();

        let places = prevStillage.placeSignatures;
        if (prevStillage.size === StillageSize.NORMAL) {
          if (!toMin) {
            places = [
              {
                place: 1,
                title: (parseInt(places![2].title) + 1).toString()
              },
              {
                place: 2,
                title: (parseInt(places![2].title) + 2).toString()
              },
              {
                place: 3,
                title: (parseInt(places![2].title) + 3).toString()
              }
            ];
          } else {
            if (parseInt(places![0].title) > 3) {
              places = [
                {
                  place: 1,
                  title: (parseInt(places![0].title) - 3).toString()
                },
                {
                  place: 2,
                  title: (parseInt(places![0].title) - 2).toString()
                },
                {
                  place: 3,
                  title: (parseInt(places![0].title) - 1).toString()
                }
              ];
            } else {
              places = prevStillage.placeSignatures;
            }
          }
        }
        nextStillage = {
          id: _id,
          key: _key,
          x: prevStillage.orientation === Orientation.HORIZONTAL ? 0 : prevStillage.x,
          y: prevStillage.orientation === Orientation.VERTICAL ? 0 : prevStillage.y,
          orientation: prevStillage.orientation,
          signature: prevStillage.signature,
          size: prevStillage.size,
          placeSignatures: places,
          viks: [],
          pmCount: -1
        };

        // TODO: Add small stillage checks
        if (position === Position.RIGHT)
          nextStillage!.x = prevStillage.x + 80;
        else if (position === Position.LEFT)
          nextStillage!.x = prevStillage.x - 80;
        else if (position === Position.BOTTOM)
          nextStillage!.y = prevStillage.y + 80;
        else if (position === Position.TOP)
          nextStillage!.y = prevStillage.y - 80;

        source[selectedUnit].layers[layerIndex].stillages!.push(nextStillage);
        // this.setAddCirclesVisibility();
        console.log(nextStillage);
        this.forceUpdate(() => this.setState({ source }));
        // Изменение видимости кнопок плюс у добавленного стеллажа
        Emit.Emitter.emit('forceSetIsAddingChange', true);
      }
    }
  }

  public setAddCirclesVisibility() {
    Emit.Emitter.emit('stillageIsAddingChange');
  }

  public deleteShape(type: LayerType, id) {
    const { source, selectedUnit } = this.state;
    let layerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, type);
    if (type === LayerType.STILLAGES) {
      let obj = this.stillageService.stillageSearchByID(source[selectedUnit].layers[layerIndex].stillages!, id);
      source[selectedUnit].layers[layerIndex].stillages!.splice(obj.index, 1);
    } else if (type === LayerType.LIGHTING) {
      let obj = this.objectService.searchByID(source[selectedUnit].layers[layerIndex].objects!, id);
      source[selectedUnit].layers[layerIndex].objects!.splice(obj.index, 1);
    } else if (type === LayerType.WALLS) {
      let obj = this.wallService.getWallIndexByID(source[selectedUnit].layers[layerIndex].walls!, id);
      source[selectedUnit].layers[layerIndex].walls!.splice(obj.index, 1);
    }
    this.forceUpdate(() => this.setState({ source }));
  }

  public mapShapeClick(which: number, e: any, id: number, shapeType: LayerType) {

  }

  // перемещение фигур с помощью стрелочек
  public moveShapeByStep(shapeSource, type: LayerType, vector: Vectors) {
    const { source, selectedUnit } = this.state;
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

      this.forceUpdate(() => this.setState({ source }));
    }

  }

  public setIsShapeMoveEnable(value) {
    this.setState({ isShapeMoveEnable: value });
  }

  public setIsShapeMovingNow(value, shape) {
    if (shape !== undefined) {
      this.setState({ isShapeMovingNow: value, selectedShapeForMove: shape });
    } else {
      this.setState({ isShapeMovingNow: value });
    }
  }

  // saving cur pos and wall resizing move rendering
  public MapWrapperOnMouseMove(e) {
    const { source, selectedUnit, layersSelected, selectedWallToResize, wallLayerIndex, resizingWallIndex, isStart, stageScale, stageScales } = this.state;
    let { selectedLayer } = this.state;
    // TODO: rows and columns checks
    // TODO: small stillages checks
    // перемещение фигуры
    if (this.state.isShapeMovingNow) {
      if (this.state.selectedShapeForMove !== undefined) {
        if (this.state.selectedShapeForMove!.type === LayerType.STILLAGES) {
          let stillageLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.STILLAGES);
          let searchedObj = this.stillageService.stillageSearchByID(source[selectedUnit].layers[stillageLayerIndex].stillages!, this.state.selectedShapeForMove.shape.id);
          let stillage = source[selectedUnit].layers[stillageLayerIndex].stillages![searchedObj.index];
          // rows and columns checks for auto completes
          let stillagesList = source[selectedUnit].layers[stillageLayerIndex].stillages;
          for (let i = 0; i < stillagesList!.length; i++) {
            const el = stillagesList![i];
            if (stillage.key !== el.key) {
              // TODO: add scaling
              let x0 = el.x;
              let y0 = el.y;
              let x = e.clientX - this.state.moveStageParams.x;
              let y = e.clientY - this.state.moveStageParams.y;
              let fSide = 75;
              let sSide = 25;
              // stillages auto rows and cols titles by row
              // TODO: turn on
              /*
              if (el.orientation === stillage.orientation) {
                if (stillage.orientation === Orientation.HORIZONTAL) {
                  if (x > x0) {
                    if (x > x0 && (x <= (x0 + 80 + 75)) && (y > (y0 - 10) && y <= y0 + 35)) {
                      stillage.signature = el.signature;
                      stillage.placeSignatures = this.stillageService.getStillagePlaceSignatures(stillage.size, el.placeSignatures![2].title, false);
                      Emit.Emitter.emit('placeSignatureForceUpdate', stillage.key, stillage.placeSignatures);
                    }
                  } else if (x < x0) {
                    if ((x > (x0 - 100) && x < x0) && (y > (y0 - 10) && y <= (y0 + 35))) {
                      stillage.signature = el.signature;
                      stillage.placeSignatures = this.stillageService.getStillagePlaceSignatures(stillage.size, el.placeSignatures![0].title, true);
                      Emit.Emitter.emit('placeSignatureForceUpdate', stillage.key, stillage.placeSignatures);
                    }
                  }
                  Emit.Emitter.emit('signaturesForceUpdate', stillage.key, stillage.signature);
                } else if (stillage.orientation === Orientation.VERTICAL) {
                  if (y > y0) {
                    if (y > y0 && (y <= (y0 + 80 + 75)) && (x > (x0 - 10) && x <= x0 + 35)) {
                      stillage.signature = el.signature;
                      stillage.placeSignatures = this.stillageService.getStillagePlaceSignatures(stillage.size, el.placeSignatures![2].title, false);
                      Emit.Emitter.emit('placeSignatureForceUpdate', stillage.key, stillage.placeSignatures);
                    }
                  } else if (y < y0) {
                    if ((y > (y0 - 100) && y < y0) && (x > (x0 - 10) && x <= (x0 + 35))) {
                      stillage.signature = el.signature;
                      stillage.placeSignatures = this.stillageService.getStillagePlaceSignatures(stillage.size, el.placeSignatures![0].title, true);
                      Emit.Emitter.emit('placeSignatureForceUpdate', stillage.key, stillage.placeSignatures);
                    }
                  }
                  Emit.Emitter.emit('signaturesForceUpdate', stillage.key, stillage.signature);
                }
              }
              */
            }
          }
          // TODO: add scaling
          stillage.x = (e.clientX - this.state.moveStageParams.x);
          stillage.y = (e.clientY - this.state.moveStageParams.y);
          source[selectedUnit].layers[stillageLayerIndex].stillages![searchedObj.index] = stillage;
          Emit.Emitter.emit('stillageSignatureForceUpdate', stillage.key, stillage.x, stillage.y);
          Emit.Emitter.emit('placeSignaturesForceUpdate', stillage.key, stillage.x, stillage.y);
          Emit.Emitter.emit('defectsForceUpdate', stillage.key, stillage.x, stillage.y);
          this.forceUpdate(() => this.setState({ source }));
        } else if (this.state.selectedShapeForMove!.type === LayerType.LIGHTING) {
          let lightingLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.LIGHTING);
          let searchedObj = this.objectService.searchByID(source[selectedUnit].layers[lightingLayerIndex].objects!, this.state.selectedShapeForMove.shape.id);
          let light = source[selectedUnit].layers[lightingLayerIndex].objects![searchedObj.index];
          // TODO: add scaling
          light.x = e.clientX - this.state.moveStageParams.x;
          light.y = e.clientY - this.state.moveStageParams.y;
          source[selectedUnit].layers[lightingLayerIndex].objects![searchedObj.index] = light;
          this.forceUpdate(() => this.setState({ source }))
        } else if (this.state.selectedShapeForMove!.type === LayerType.WALLS) {
          let wallsLayerIndex = this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers, LayerType.WALLS);
          let searchedObj = this.wallService.getWallIndexByID(source[selectedUnit].layers[wallsLayerIndex].walls!, this.state.selectedShapeForMove.shape.id);
          let wall = source[selectedUnit].layers[wallsLayerIndex].walls![searchedObj.index];
          // TODO: add scaling
          wall.startX = e.clientX - this.state.moveStageParams.x;
          wall.startY = e.clientY - this.state.moveStageParams.y;
          source[selectedUnit].layers[wallsLayerIndex].walls![searchedObj.index] = wall;
          this.forceUpdate(() => this.setState({ source }));
        }
      }
    }


    // move_resizing
    if (this.state.isWallResizingNow) {

      Emit.Emitter.emit('wallMouseDbl', false);

      let _wall = source[selectedUnit].layers[wallLayerIndex].walls![resizingWallIndex];

      _wall = this.wallService.resizeWall(e, _wall, isStart, this.state.moveStageParams);

      source[selectedUnit].layers[wallLayerIndex].walls![resizingWallIndex] = _wall;

      this.setState({ source });

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
    this.setState({ isShapeMovingNow: false });
    if (isWallResizingNow && selectedWallToResize) {
      let found = this.wallService.getWallIndexByID(source[selectedUnit].layers[wallLayerIndex].walls!, selectedWallToResize.id);
      let _wall: WallItem = found.item;
      _wall = this.wallService.resizeWall(e, _wall, isStart, this.state.moveStageParams);
      source[selectedUnit].layers[wallLayerIndex].walls![found.index] = _wall;

      source[selectedUnit].layers[wallLayerIndex].walls = this.layerService.deleteBadWalls(
        source[selectedUnit].layers[wallLayerIndex].walls!
      );

      this.setState({ resizingWallIndex: found.index, source, isWallResizingNow: false, isDrawing: false, layersSelected: layersSelected });
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
      this.setState({ layersSelected, selectedLayer: _index, wallLayerIndex: _index });
    }
    let found = this.wallService.getWallIndexByID(source[selectedUnit].layers[_index].walls!, wallSource.id);
    this.setState({ resizingWallIndex: found.index, isStart, selectedWallToResize: wallSource, isWallResizingNow: true, isDrawing: true });
  }



  private stageDragEnd(x: number, y: number) {
    // console.log('move: ' + Math.abs(x) + ':' + Math.abs(y));
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
          this.setState({ layersSelected, selectedLayer: index, wallLayerIndex: index });
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
          this.setState({ wallIndex, source });
        }
      }
    }
  }

  private StageOnMouseUpHandler(e) {
    if (this.state.isWallResizingNow) {
      this.setState({ isWallResizingNow: false, isDrawing: false })
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
              { x: (clientX - this.state.moveStageParams.x), y: (clientY - this.state.moveStageParams.y) },
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
      // Изменение видимости кнопок плюс у добавленного стеллажа
      this.forceUpdate(() => Emit.Emitter.emit('forceSetIsAddingChange', true));
    }
  }

  public stageOnClickHandler(e) {
    if (this.state.isAddCircleAdding) {
      this.setState({ isAddCircleAdding: false });
      return;
    }
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
    let stillagesLayer = this.layerService.getLayerIndexByTypeBinary(this.state.source[this.state.selectedUnit].layers, LayerType.STILLAGES);
    let scaleBy = 1.025;
    // console.log(this.state.source[this.state.selectedUnit].layers[stillagesLayer].stillages!.length);
    // let stillagesCount = this.state.source[this.state.selectedUnit].layers[stillagesLayer].stillages!.length;
    // if (stillagesCount >= 100) scaleBy = 0.90;
    // if (stillagesCount >= 200 && stillagesCount < 300) scaleBy = 1.1;
    // if (stillagesCount >= 300) scaleBy = 1.1;




    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: (newScale * -1), y: (newScale * -1) });

    this.setState({
      stageScales: {
        x: (newScale * -1),
        y: (newScale * -1)
      },
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    });
  };

  setMapUnit = (selectedUnit: number) => {
    this.setState({selectedUnit: selectedUnit, selectedLayer: -1, layersSelected: []});
  };

  public mapSetState() {
    try {
      // this.animate.finish();
      this.animates.forEach(el => el.cancel());
      console.log('_______________');
      console.log('set state emit');
      console.log(MapSource.data);
      console.log('_______________');
      this.setState({source: MapSource.data, lazyLoading: false});
    } catch (e) {
      console.error('[Component: Map] - invalid data!');
      this.setState({lazyLoading: false});
    }
  }

  render() {
    if (this.state.source === undefined || this.state.source.length === 0) {

    } else {
      const {source, selectedLayer, selectedUnit, layersSelected, isDefectBrowsePanel, isWallResizingNow, lazyLoading} = this.state;
      let unitsTitles: Array<JSX.Element> = [];
      let layersTitles: Array<JSX.Element> = [];
      let objects: Array<JSX.Element> = [];
      let texts: Array<JSX.Element> = [];
      let stillages: Array<JSX.Element> = [];
      let signatures: Array<JSX.Element> = [];
      let layers: Array<JSX.Element> = [];
      let walls: Array<JSX.Element> = [];

      let width = window.innerWidth;
      let height = window.innerHeight;

      // вывод списка блоков
      for (let i = 0; i < source.length; i++) {
        unitsTitles.push(
            <div
                key={source[i].key + '_unitNameDiv_' + i}
                onClick={() => {
                  // this.setState({selectedUnit: i, selectedLayer: -1, layersSelected: []});
                  Emit.Emitter.emit('GetMapByParams', source[i].title, source[i].key, i);
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
            this.setState({layersSelected, selectedLayer: -1})
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
                  onChange={() => {
                    console.log(i)
                  }}
                  style={{outline: 'none', marginRight: 5}}
                  checked={layersSelected.includes(i, 0)}
                  type={'checkbox'}/>
              {source[selectedUnit].layers[i].title}</div>
        );
      }

      let absStageCoords = { x: Math.abs(this.state.moveStageParams.x), y: Math.abs(this.state.moveStageParams.y) };
      let isInChunk: boolean = false;

      if (selectedLayer === -1) {
        let layerNum = 0;
        source[selectedUnit].layers.forEach(element => {
          isInChunk = false;
          if (element.texts !== undefined) {
            element.texts.forEach(textElement => {
              isInChunk = (textElement.x > absStageCoords.x - 500 && textElement.x < (absStageCoords.x + width + 500)) &&
                  (textElement.y > absStageCoords.y - 500 && textElement.y < (absStageCoords.y + height + 500));
              if (isInChunk) {
                texts.push(
                    <Text key={textElement.key} source={textElement}/>
                );
              }
            });
          }
          isInChunk = false;
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
          isInChunk = false;
          if (element.stillages !== undefined) {
            let _mapStillages = source[selectedUnit].layers[this.layerService.getLayerIndexByTypeBinary(source[selectedUnit].layers!, LayerType.STILLAGES)].stillages;
            for (let i = 0; i < element.stillages!.length; i++) {
              isInChunk = (element.stillages[i].x > absStageCoords.x - 500 && element.stillages[i].x < (absStageCoords.x + width + 500)) &&
                  (element.stillages[i].y > absStageCoords.y - 500 && element.stillages[i].y < (absStageCoords.y + height + 500));
              if (isInChunk) {
                stillages.push(
                    <Stillage
                        key={element.stillages[i].key}
                        source={element.stillages![i]}
                        mapStillages={_mapStillages!}
                    />
                );
              }
            }
          }
          isInChunk = false;
          if (element.walls !== undefined) {
            for (let i = 0; i < element.walls!.length; i++) {
              isInChunk = (element.walls[i].startX > absStageCoords.x - 500 && element.walls[i].startX < (absStageCoords.x + width + 500)) &&
                  (element.walls[i].startX > absStageCoords.y - 500 && element.walls[i].startY < (absStageCoords.y + height + 500));
              if (isInChunk) {
                walls.push(
                    <Wall
                        key={element.walls[i].key}
                        source={element.walls[i]}
                    />
                );
              }
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
                          mapStillages={source[selectedUnit].layers[el].stillages!}
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
              if (source[selectedUnit].layers[el].texts !== undefined) {
                source[selectedUnit].layers[el].texts!.forEach(textEl => texts.push(<Text key={textEl.key} source={textEl} />));
              }
            }
          });
        }

      }


      let main, blocks, filters, elementsPanel, defectBrowsePanel, addLayerSubModal;

      blocks = (
          <div id={'units-block'} style={{background: '#E0E0E0'}} className="units-selector">
            <div style={{background: ''}} className="unit-header-title">
              <span style={{height: '50%'}}>выбор блока</span>
            </div>
            <div style={{background: ''}} className="unit-content">
              {unitsTitles}
            </div>
          </div>
      );

      filters = (
          <div id={'filters-block'} className="filters-selector" style={{background: '#E0E0E0'}}>
            <div style={{background: ''}} className="filter-header-title">
              <span style={{height: '50%'}}>фильтры</span>
            </div>
            <div style={{background: ''}} className="filter-content">
              <div className="input-checkbox">
                <div style={{}}><input onChange={() => this.filtersOnChangeAction('onlyRed')} style={{height: '50%'}}
                                       type="checkbox" name="option2" value="a2"/></div>
                <div style={{height: '100%', fontSize: '0.9vw', paddingLeft: '2%', display: 'flex'}}>
                  только опасные
                </div>
              </div>
              <div className="input-checkbox">
                <div style={{}}><input onChange={() => this.filtersOnChangeAction('onlyRed')} style={{height: '50%'}}
                                       type="checkbox" name="option2" value="a2"/></div>
                <div style={{height: '100%', fontSize: '0.9vw', paddingLeft: '2%', display: 'flex'}}>
                  убрать повреждения
                </div>
              </div>
            </div>
          </div>
      );

      elementsPanel = <ElementsPanel source={ElementSource}/>;

      if (isDefectBrowsePanel) {
        defectBrowsePanel = <DefectBrowsePanel parentSource={this.state.selectedStillage!} source={this.state.selectedVik} />;
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

      main = (
          <div
              key={this.state.parentKey + '_mapWrapper_div'}
              className="map-wrapper"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}

          >

            <div className="stage-wrapper"
                 key={this.state.parentKey + '_stageWrapper_div'}
                 onDrop={(e) => {
                   this.ElementOnDrop(e)
                 }}
                 onClick={(e) => {
                   this.stageOnClickHandler(e)
                 }}
                 onMouseMove={(e) => {
                   this.MapWrapperOnMouseMove(e)
                 }}
                 onTouchMove={(e) => {
                   this.MapWrapperOnMouseMove(e)
                 }}
                 onMouseUp={(e) => {
                   this.wallLabelButtonInteractionWayUp(e)
                 }}
                 id={"stageWrapper"}
            >
              <Stage
                  key={this.state.parentKey + '_mapStage_stage'}
                  draggable={!this.state.isDrawing && !this.state.isShapeMovingNow}


                  // onDragMove={(e) => {
                  //   // console.log(this.state.dragNum);
                  //   if (this.state.dragNum === 50) {
                  //     this.setState({
                  //       moveStageParams: {
                  //         x: e.target.x(),
                  //         y: e.target.y()
                  //       },
                  //       dragNum: 0
                  //     });
                  //   } else {
                  //     this.setState({
                  //       dragNum: this.state.dragNum + 1
                  //     });
                  //   }
                  // }}

                  onTouchMove={check ? (e) => {
                    this.StageOnMouseMoveHandler(e)
                  } : () => {
                  }}
                  onTouchStart={check ? (e) => {
                    this.StageOnMouseDownHandler(e)
                  } : () => {
                  }}
                  onTouchEnd={check ? (e) => {
                    this.StageOnMouseUpHandler(e)
                  } : () => {
                  }}

                  onDragEnd={e => {
                    this.stageDragEnd(e.target.x(), e.target.y())
                  }}

                  onMouseMove={check ? (e) => {
                    this.StageOnMouseMoveHandler(e)
                  } : () => {
                  }}
                  onMouseDown={check ? (e) => {
                    this.StageOnMouseDownHandler(e)
                  } : () => {
                  }}
                  onMouseUp={check ? (e) => {
                    this.StageOnMouseUpHandler(e)
                  } : () => {
                  }}

                  style={{cursor: 'pointer'}}
                  width={width}
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
                  {texts}
                </Layer>
              </Stage>
            </div>
            {elementsPanel}

            <div key={this.state.parentKey + '_rightBarsWrapper_div'} className={"right-bars-wrapper"}>
              {blocks}
              {filters}
            </div>
            <div id={'layers-block'} key={this.state.parentKey + '_layersSelectorWrapper_div'} style={{background: '#E0E0E0'}}
                 className="layers-selector-wrapper">
              {layersTitles}
            </div>
            {defectBrowsePanel}
          </div>);
      return [main];
    }
  }
}

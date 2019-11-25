import DefectColors from '../Colors/DefectColors';
import DefectRadius from './DefectRadius';
import DefectRadiusReducerType from './DefectRadiusReducerType';

export default class DefectRadiusReducer {
    public GetRadius(color: DefectColors): DefectRadiusReducerType {
        if (color === DefectColors.GREEN)
            return {
                radius: DefectRadius.GREEN,
                centeringValue: (DefectRadius.RED - DefectRadius.GREEN)
            }
        else if (color === DefectColors.YELLOW)
            return {
                radius: DefectRadius.YELLOW,
                centeringValue: (DefectRadius.RED - DefectRadius.YELLOW)
            }
        else if (color === DefectColors.RED)
            return {
                radius: DefectRadius.RED,
                centeringValue: (DefectRadius.RED - DefectRadius.RED)
            }
        return {
            radius: 0,
            centeringValue: 0,
        }
    }
}
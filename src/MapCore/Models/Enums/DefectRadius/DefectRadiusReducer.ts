import DefectColors from '../Colors/DefectColors';
import DefectRadius from './DefectRadius';
import DefectRadiusReducerType from './DefectRadiusReducerType';

export default class DefectRadiusReducer {
    public GetRadius(color: DefectColors): DefectRadiusReducerType {
        if (color === DefectColors.GREEN)
            return {
                radius: DefectRadius.GREEN,
                centeringValue: (12.5 - DefectRadius.GREEN)
            }
        else if (color === DefectColors.YELLOW)
            return {
                radius: DefectRadius.YELLOW,
                centeringValue: (12.5 - DefectRadius.YELLOW)
            }
        else if (color === DefectColors.RED)
            return {
                radius: DefectRadius.RED,
                centeringValue: (12.5 - DefectRadius.RED)
            }
        return {
            radius: 0,
            centeringValue: 0,
        }
    }
}
import COLORS from '../constants/colors';
const colorPicker = index => {
    return COLORS[index % COLORS.length];
};

export default colorPicker;

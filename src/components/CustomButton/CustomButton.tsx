import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  TouchableNativeFeedback,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {primaryColor, white} from '../../styles/colors';
import {Styles, fontFamilyRegular} from '../../styles/globalStyles';

const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    style,
    disable,
}: {
    title: string,
    onPress: () => void,
    variant?: string,
    loading?: boolean,
    style?: ViewStyle,
    disable?: boolean,
}) => {
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale, variant);

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryBtn;
      case 'secondary':
        return styles.secondaryBtn;
      case 'danger':
        return styles.dangerBtn;
      default:
        return styles.primaryBtn;
    }
  };

  const renderButtonContent = () => {
    if (loading) {
      return <ActivityIndicator color="white" />;
    } else {
      return <Text style={styles.btnText}>{title}</Text>;
    }
  };

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disable}>
      <View style={[Styles.btn, getButtonStyle(), style]}>
        {renderButtonContent()}
      </View>
    </TouchableNativeFeedback>
  );
};

interface Styles {
    primaryBtn: ViewStyle;
    secondaryBtn: ViewStyle;
    dangerBtn: ViewStyle;
    btnText: TextStyle;
}

const makeStyles = (fontScale: number, variant: string): Styles =>
    StyleSheet.create<Styles>({
        primaryBtn: {
            backgroundColor: primaryColor,
        },
        secondaryBtn: {
            backgroundColor: white,
            borderWidth: 1,
            borderColor: primaryColor,
        },
        dangerBtn: {
            backgroundColor: '#FF3B30',
        },
        btnText: {
            color: variant === 'primary' ? white : primaryColor,
            fontSize: 16 / fontScale,
            fontWeight: '400',
            fontFamily: fontFamilyRegular,
        },
    });

export default CustomButton;

import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {fontFamilyBold} from '../../styles/globalStyles';
import {primaryColor} from '../../styles/colors';

const CustomHeader = ({title}: {title: string}) => {
    const {fontScale} = useWindowDimensions();
    const styles = makeStyles(fontScale);
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </View>
    );
};

export default CustomHeader;

const makeStyles = (fontScale: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      padding: 20,
    },
    mainContainer: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerText: {
      fontFamily: fontFamilyBold,
      color: primaryColor,
      fontSize: 26 / fontScale,
    },
  });

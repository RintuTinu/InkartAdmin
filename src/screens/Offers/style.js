import { StyleSheet } from "react-native";
import colors from "../../commom/colors";

const style = (width, height) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    main: {
      flex: 1,
    },
    circleView: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      width: width,
      marginBottom: height * 0.015,
    },
    circle: {
      // width: width * 0.07,
      // height: width * 0.07,
      // borderRadius: 50,
      // backgroundColor: colors.white,
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white,
    },
    circleTwo: {
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: colors.white,
    },
    centerView: {
      // width: width * 0.63,
      // height: height * 0.14,
      // backgroundColor: colors.secondaryGreen,
      // padding: 20,
      width: '64%',
      height: 100,
      backgroundColor: colors.secondaryGreen,
      padding: 20
    },
    centerViewTwo: {
      width: '28%',
      height: 100,
      // width: width * 0.28,
      // height: height * 0.14,
      backgroundColor: colors.secondaryGreen,
      paddingRight: 15,
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    contentStyle: {
      alignSelf: "center",
      marginVertical: height * 0.015,
    },
    offView: {
      marginRight: -height * 0.02,
      zIndex: 99,
    },
  });

export default style;

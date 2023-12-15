import { StyleSheet } from "react-native";
import colors from "../../commom/colors";


const style = (width, height) =>
  StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.white
      },
      flatView: {
        backgroundColor: colors.secondaryGreen,
        borderRadius: 15,
        padding: 10,
        overflow: "hidden",
        marginTop: 15,
        marginHorizontal: 15
      },
      innerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        paddingBottom: 15,
      },
      orderId: {
        fontFamily: "Lato-Bold",
        fontSize: 16,
        color: colors.black,
      },
      orderDate: {
        fontFamily: "Lato-Regular",
        fontSize: 14,
        color: colors.primaryGreen,
      },
      address: {
        fontFamily: "Lato-Regular",
        fontSize: 14,
        color: colors.black,
      },
      price: {
        fontFamily: "Lato-Regular",
        fontSize: 14,
        color: colors.primaryGreen,
      },
      map: {
        width: 90,
        height: 90,
        borderRadius: 15,
        overflow: "hidden",
        resizeMode: "cover",
      },
      bottomView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      bottomText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: colors.black
      }
  });

export default style;

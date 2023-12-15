import React, {useState, useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from "../Login";
import Home from "../Home";
import { DimensionContextProvider } from "../../context";
import { Provider, useSelector } from "react-redux";
import { store } from "../../store/store";
import Splash from "../Splash";
import CustomDrawer from "../../components/CustomDrawer";
import CustomeTabBar from "../../components/CustomTabBar";
import Products from "../Products";
import Orders from "../Orders";
import Profile from "../Profile";
import Users from "../Users";
import OrderDetails from "../OrderDetails";
import ProductDetails from "../ProductDetails";
import colors from "../../commom/colors";
import CreateProduct from "../CreateProduct";
import Banner from "../Banner";
import Offers from "../Offers";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const AppNavigator = () => {

const [loading, setLoading] = useState(true);
const isLoggedIn = useSelector(state => state.isLoggedIn);

useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }, 3000);
}, [isLoggedIn]);

    return (
      <DimensionContextProvider>
        <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
          {loading ? (
          <Stack.Screen name="Splash" component={Splash} /> 
          ) : (
            <>
            {isLoggedIn ? (
            <Stack.Screen name="SideBar" component={SideBar} /> 
            ) : (
              <Stack.Screen name="Login" component={Login} />
         )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      </DimensionContextProvider>
    );
};

const Drawer = createDrawerNavigator();

const SideBar = () => {
  return (
      <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Footer" component={Footer} />
      </Drawer.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Footer = () => {
  return (
      <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomeTabBar {...props} />}
      initialRouteName="StackNav">
        <Tab.Screen name="StackNav" component={StackNav} />
        
      </Tab.Navigator>
  );
};

const StackNavigator = createNativeStackNavigator();

const StackNav = () => {
  return (
    <StackNavigator.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.white,
      },
      headerTitleStyle: {
        fontFamily: 'Lato-Bold',
        fontSize: 22,
    },
    headerTintColor: colors.black_level_3,
    }}>
    <StackNavigator.Screen name="Home" component={Home} />
        <StackNavigator.Screen name="Products" component={Products} />
        <StackNavigator.Screen name="Orders" component={Orders} />
        <StackNavigator.Screen name="Profile" component={Profile} />
        <StackNavigator.Screen name="Users" component={Users} />
        <StackNavigator.Screen name="OrderDetails" component={OrderDetails} />
        <StackNavigator.Screen name="ProductDetails" component={ProductDetails} />
        <StackNavigator.Screen name="CreateProduct" component={CreateProduct} />
        <StackNavigator.Screen name="Banner" component={Banner} />
        <StackNavigator.Screen name="Offers" component={Offers} />
        </StackNavigator.Navigator>
  );
};

export default App;

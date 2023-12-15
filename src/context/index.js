import { useWindowDimensions, Dimensions as dim,Dimensions,} from "react-native";
  import { useContext, createContext, useState, useEffect } from "react";
  
  export const DimensionContext = createContext();
  export const useDimensionContext = () => useContext(DimensionContext);
  
  export const DimensionContextProvider = ({ children }) => {
    const dimensions = useWindowDimensions();
    const initHeight = dim.get("window").height;
    const initWidth = dim.get("window").width;
  
    const [windowWidth, setWindowWidth] = useState(initWidth);
    const [windowHeight, setWindowHeight] = useState(initHeight);
    const [isPortrait, setIsPortrait] = useState(false);
  
    const checkIsPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };
  
    useEffect(() => {
      setIsPortrait(checkIsPortrait());
      Dimensions.addEventListener("change", () => {});
    }, []);
  
    useEffect(() => {
      setItem();
    }, [dimensions]);
  
    const setItem = () => {
      const { height, width } = dimensions;
      setWindowHeight(height);
      setWindowWidth(width);
    };
  
    return (
      <DimensionContext.Provider
        value={{
          windowHeight,
          windowWidth,
          isPortrait,
        }}
      >
        {children}
      </DimensionContext.Provider>
    );
  };
  
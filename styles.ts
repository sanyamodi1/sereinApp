import { Dimensions } from "react-native";
const { width: screenWidth, height: screenHeight }: { width: number; height: number } = Dimensions.get('window');

// Define scale function with proper typing
const scale = (size: number): number => (screenWidth / 375) * size;
export default scale;
